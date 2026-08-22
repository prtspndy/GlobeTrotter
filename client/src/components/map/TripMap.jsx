import React, { useState } from 'react';

/**
 * Lightweight, high-performance interactive route map component for GlobeTrotter itineraries.
 * Displays city stop markers, connecting route paths, lat/lon coordinates, and interactive popups.
 */
export default function TripMap({ stops = [], routeInfo = null }) {
  const [selectedStop, setSelectedStop] = useState(null);

  if (!stops || stops.length === 0) {
    return (
      <div className="w-full h-64 bg-surface-container-low border border-outline-variant rounded-sm flex items-center justify-center text-xs text-secondary">
        <span className="flex items-center gap-2">
          <span className="material-symbols-outlined">map</span>
          No route stops added to map yet.
        </span>
      </div>
    );
  }

  // Calculate coordinates bounds for SVG canvas normalization
  const lats = stops.map((s) => s.lat || 41.9028);
  const lons = stops.map((s) => s.lon || 12.4964);

  const minLat = Math.min(...lats) - 3;
  const maxLat = Math.max(...lats) + 3;
  const minLon = Math.min(...lons) - 5;
  const maxLon = Math.max(...lons) + 5;

  // Map coordinates to 800x400 SVG viewbox
  const mapCoords = (lat, lon) => {
    const x = ((lon - minLon) / (maxLon - minLon || 1)) * 700 + 50;
    const y = 350 - ((lat - minLat) / (maxLat - minLat || 1)) * 300;
    return { x, y };
  };

  const points = stops.map((stop) => {
    const { x, y } = mapCoords(stop.lat || 41.9028, stop.lon || 12.4964);
    return { ...stop, x, y };
  });

  const pathString = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div className="bg-surface border border-outline-variant rounded-sm p-6 shadow-paper space-y-4">
      
      {/* Map Header */}
      <div className="flex justify-between items-center border-b border-outline-variant pb-3">
        <div className="flex items-center gap-2 font-label-caps text-xs text-primary uppercase tracking-widest font-semibold">
          <span className="material-symbols-outlined text-base">map</span>
          <span>Interactive Route Map ({stops.length} Cities)</span>
        </div>
        {routeInfo && (
          <span className="text-xs font-mono font-bold text-on-surface bg-surface-container border border-outline-variant px-3 py-1 rounded-sm">
            Total Transit: {routeInfo.distanceKm} km ({routeInfo.timeHours} hrs)
          </span>
        )}
      </div>

      {/* SVG Map Canvas */}
      <div className="relative w-full h-80 bg-[#f4f1ea] border border-outline-variant rounded-sm overflow-hidden shadow-inner flex items-center justify-center">
        
        {/* Map Grid Pattern background */}
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e0dbd1" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Dotted Connecting Route Path */}
          {points.length > 1 && (
            <path
              d={pathString}
              fill="none"
              stroke="#a93100"
              strokeWidth="2.5"
              strokeDasharray="6,6"
              className="animate-pulse"
            />
          )}

          {/* Interactive Stop Markers */}
          {points.map((stop, idx) => (
            <g key={stop.id || idx} className="cursor-pointer group" onClick={() => setSelectedStop(stop)}>
              {/* Pulsing ring */}
              <circle cx={stop.x} cy={stop.y} r="14" fill="#a93100" fillOpacity="0.15" />
              {/* Outer Marker */}
              <circle cx={stop.x} cy={stop.y} r="8" fill="#a93100" stroke="#ffffff" strokeWidth="2" />
              {/* Stop Number text */}
              <text
                x={stop.x}
                y={stop.y + 3}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="9"
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                {idx + 1}
              </text>
              {/* City Label below */}
              <text
                x={stop.x}
                y={stop.y + 22}
                textAnchor="middle"
                fill="#1b1c1c"
                fontSize="11"
                fontWeight="bold"
                fontFamily="Playfair Display, serif"
              >
                {stop.cityName}
              </text>
            </g>
          ))}
        </svg>

        {/* Selected Stop Details Card Popup */}
        {selectedStop && (
          <div className="absolute top-4 right-4 bg-surface/95 backdrop-blur border border-outline-variant p-4 rounded-sm shadow-paper max-w-xs space-y-2 text-xs">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-primary block">
                  Stop Node Details
                </span>
                <h4 className="font-serif text-base font-bold text-on-surface">
                  {selectedStop.cityName}, {selectedStop.country}
                </h4>
              </div>
              <button onClick={() => setSelectedStop(null)} className="text-secondary hover:text-on-surface">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            <p className="text-[11px] text-secondary font-mono">
              Coordinates: {selectedStop.lat?.toFixed(2)}°, {selectedStop.lon?.toFixed(2)}°
            </p>

            <div className="pt-2 border-t border-outline-variant flex justify-between text-[11px]">
              <span className="text-secondary">Scheduled Activities:</span>
              <span className="font-bold text-on-surface">{selectedStop.activities?.length || 0}</span>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
