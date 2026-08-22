import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assuming Prisma client instance

/**
 * GET /api/trips
 * Fetches all trips for the authenticated user with stops and expenses.
 */
export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id') || 'user-1'; // Session user fallback

    const trips = await prisma.trip.findMany({
      where: { userId },
      include: {
        stops: {
          orderBy: { order: 'asc' },
          include: {
            activities: {
              orderBy: { order: 'asc' }
            }
          }
        },
        expenses: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, data: trips });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch trips' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/trips
 * Creates a new trip with initial stops.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, coverImage, startDate, endDate, totalBudget, visibility } = body;
    const userId = req.headers.get('x-user-id') || 'user-1';

    if (!title || !startDate || !endDate) {
      return NextResponse.json(
        { success: false, error: 'Title, start date, and end date are required.' },
        { status: 400 }
      );
    }

    const trip = await prisma.trip.create({
      data: {
        userId,
        title,
        description,
        coverImage: coverImage || 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalBudget: parseFloat(totalBudget) || 0,
        visibility: visibility || 'PRIVATE',
        shareId: `trip-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
      },
      include: {
        stops: { include: { activities: true } },
        expenses: true
      }
    });

    return NextResponse.json({ success: true, data: trip }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create trip' },
      { status: 500 }
    );
  }
}
