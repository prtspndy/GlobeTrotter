import React, { useState } from 'react';
import { X, Copy, Check, Share2, Send, Mail, Link as LinkIcon, Sparkles } from 'lucide-react';

export default function ShareTripModal({ isOpen, onClose, trip }) {
  const [copiedText, setCopiedText] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !trip) return null;

  const publicLink = `${window.location.origin}/globe/trip/${trip.shareId || trip.id}`;

  // Format cities list
  const citiesList = trip.stops?.map(s => s.cityName).join(', ') || 'Multi-City Tour';

  // Format all activities/tourist places list
  const activitiesList = [];
  trip.stops?.forEach(stop => {
    stop.activities?.forEach(act => {
      activitiesList.push(`• ${stop.cityName}: ${act.name || act.title} (${act.time || '10:00 AM'})`);
    });
  });

  // Generate full text message of the trip plan
  const fullTripMessage = 
`✈️ GLOBETROTTER TRAVEL PLAN ✈️
━━━━━━━━━━━━━━━━━━━━━━━
📌 Trip: ${trip.title}
🗓️ Dates: ${trip.startDate || 'TBD'} to ${trip.endDate || 'TBD'}
📍 Destination Cities: ${citiesList}
💰 Total Budget: ₹${trip.totalBudget?.toLocaleString() || 2000}

🗺️ ITINERARY & TOURIST PLACES (JOVALAYAK STHAL):
${activitiesList.length > 0 ? activitiesList.join('\n') : '• Custom sightseeing and city discovery'}

📝 Description:
${trip.description || 'Broadsheet travel plan created on GlobeTrotter.'}

🔗 View & Clone Full Interactive Trip Online:
${publicLink}
━━━━━━━━━━━━━━━━━━━━━━━
Crafted with GlobeTrotter Editorial Horizon`;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(fullTripMessage);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const encodedMsg = encodeURIComponent(fullTripMessage);
    window.open(`https://api.whatsapp.com/send?text=${encodedMsg}`, '_blank');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Travel Plan: ${trip.title}`);
    const body = encodeURIComponent(fullTripMessage);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: trip.title,
          text: fullTripMessage,
          url: publicLink
        });
      } catch (err) {
        console.log('Share canceled', err);
      }
    } else {
      handleCopyMessage();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface border border-outline-variant p-6 rounded-2xl shadow-paper max-w-lg w-full space-y-5 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-outline-variant pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-xl text-primary">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-on-surface">Share Complete Trip Plan</h3>
              <p className="text-[11px] text-secondary">Share formatted trip message or web link anywhere</p>
            </div>
          </div>
          <button onClick={onClose} className="text-secondary hover:text-on-surface p-1 rounded-lg hover:bg-surface-container-low cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Preview Box */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider flex justify-between items-center">
            <span>Generated Trip Message</span>
            <span className="text-[10px] text-primary font-mono">Ready to Send</span>
          </label>
          <div className="p-4 bg-surface-container-low border border-outline-variant rounded-xl font-mono text-xs text-on-surface leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap select-all">
            {fullTripMessage}
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={handleCopyMessage}
            className="p-3 bg-primary text-white font-semibold text-xs rounded-xl hover:bg-primary-container transition flex flex-col items-center justify-center gap-1 cursor-pointer shadow-sm"
          >
            {copiedText ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copiedText ? 'Copied!' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handleWhatsAppShare}
            className="p-3 bg-emerald-600 text-white font-semibold text-xs rounded-xl hover:bg-emerald-700 transition flex flex-col items-center justify-center gap-1 cursor-pointer shadow-sm"
          >
            <Send className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleEmailShare}
            className="p-3 bg-indigo-600 text-white font-semibold text-xs rounded-xl hover:bg-indigo-700 transition flex flex-col items-center justify-center gap-1 cursor-pointer shadow-sm"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="p-3 bg-surface-container-low border border-outline-variant text-on-surface font-semibold text-xs rounded-xl hover:border-primary transition flex flex-col items-center justify-center gap-1 cursor-pointer"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <LinkIcon className="w-4 h-4 text-primary" />}
            <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
          </button>
        </div>

        {navigator.share && (
          <button
            onClick={handleNativeShare}
            className="w-full py-2.5 bg-surface-container border border-outline-variant text-on-surface font-semibold text-xs rounded-xl hover:border-primary transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span>More Sharing Options (System App Share)</span>
          </button>
        )}

      </div>
    </div>
  );
}
