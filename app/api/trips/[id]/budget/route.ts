import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ExpenseCategory, BudgetBreakdown } from '@/types/trip';

/**
 * GET /api/trips/[id]/budget
 * Calculates comprehensive budget analytics for a given trip ID.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tripId = params.id;

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        expenses: true,
        stops: {
          include: { activities: true }
        }
      }
    });

    if (!trip) {
      return NextResponse.json(
        { success: false, error: 'Trip not found' },
        { status: 404 }
      );
    }

    // Calculate total days
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const tripDays = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

    // Sum explicitly logged expenses
    const loggedExpensesTotal = trip.expenses.reduce((sum, e) => sum + e.amount, 0);

    // Sum scheduled activity costs across all stops
    const activityCostsTotal = trip.stops.reduce((sum, stop) => {
      return sum + stop.activities.reduce((aSum, act) => aSum + act.cost, 0);
    }, 0);

    const totalSpent = loggedExpensesTotal + activityCostsTotal;
    const remainingBudget = trip.totalBudget - totalSpent;
    const dailyAverage = totalSpent / tripDays;
    const isOverBudget = totalSpent > trip.totalBudget;

    // Group expenses by Category
    const categoryTotals: Record<ExpenseCategory, number> = {
      TRANSPORTATION: 0,
      ACCOMMODATION: 0,
      ACTIVITIES: activityCostsTotal,
      MEALS: 0,
      OTHER: 0
    };

    trip.expenses.forEach((expense) => {
      const cat = expense.category as ExpenseCategory;
      categoryTotals[cat] = (categoryTotals[cat] || 0) + expense.amount;
    });

    const byCategory = (Object.keys(categoryTotals) as ExpenseCategory[]).map((cat) => ({
      category: cat,
      amount: categoryTotals[cat],
      percentage: totalSpent > 0 ? Number(((categoryTotals[cat] / totalSpent) * 100).toFixed(1)) : 0
    }));

    const breakdown: BudgetBreakdown = {
      totalBudget: trip.totalBudget,
      totalSpent,
      remainingBudget,
      dailyAverage: Number(dailyAverage.toFixed(2)),
      tripDays,
      byCategory,
      isOverBudget
    };

    return NextResponse.json({ success: true, data: breakdown });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to calculate budget' },
      { status: 500 }
    );
  }
}
