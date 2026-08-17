import React, { useState } from 'react';
import { RefreshCw, Droplet, Footprints, Flame, Route, TrendingUp, Plus } from 'lucide-react';

export default function DashboardWidgets({ unitSystem }) {
  // Setup calendar state
  const [selectedDay, setSelectedDay] = useState(13);
  const calendarDays = [
    { day: 'M', date: 8 },
    { day: 'T', date: 9 },
    { day: 'W', date: 10 },
    { day: 'T', date: 11 },
    { day: 'F', date: 12 },
    { day: 'S', date: 13 },
    { day: 'S', date: 14 },
  ];

  // Simulated log values for different days to showcase interactivity
  const [logs, setLogs] = useState({
    8: { water: 1200, steps: 4800, cals: 310, dist: 3.5, floors: 2 },
    9: { water: 1500, steps: 7200, cals: 450, dist: 5.4, floors: 5 },
    10: { water: 800, steps: 3500, cals: 220, dist: 2.6, floors: 1 },
    11: { water: 2000, steps: 9100, cals: 580, dist: 6.8, floors: 7 },
    12: { water: 1000, steps: 5200, cals: 340, dist: 3.9, floors: 3 },
    13: { water: 1700, steps: 6568, cals: 423, dist: 5.0, floors: 4 }, // Matches screenshot exactly
    14: { water: 500, steps: 2100, cals: 150, dist: 1.6, floors: 1 },
  });

  const activeLog = logs[selectedDay] || { water: 0, steps: 0, cals: 0, dist: 0, floors: 0 };

  const updateLog = (key, increment) => {
    setLogs((prev) => {
      const dayLogs = { ...prev[selectedDay] };
      
      // Calculate updated value
      let newValue = dayLogs[key] + increment;
      if (key === 'dist') {
        newValue = parseFloat((dayLogs[key] + increment).toFixed(1));
      }
      
      // Specific bounds
      if (newValue < 0) newValue = 0;

      return {
        ...prev,
        [selectedDay]: {
          ...dayLogs,
          [key]: newValue
        }
      };
    });
  };

  // Convert distance based on unitSystem
  const renderDistance = (kmVal) => {
    if (unitSystem === 'Imperial') {
      const miles = (kmVal * 0.621371).toFixed(1);
      return `${miles} miles`;
    }
    return `${kmVal} km`;
  };

  return (
    <div className="widgets-wrapper animate-slide">
      {/* Calendar Header Strip */}
      <div className="calendar-header-card">
        <div className="calendar-title-row">
          <h3 className="calendar-date-title">Sat, {selectedDay} Sep</h3>
          <button className="today-reset-btn" onClick={() => setSelectedDay(13)}>
            <RefreshCw size={14} />
            <span>Today</span>
          </button>
        </div>
        
        <div className="calendar-strip">
          {calendarDays.map((d) => (
            <button
              key={d.date}
              className={`calendar-day-btn ${selectedDay === d.date ? 'active' : ''}`}
              onClick={() => setSelectedDay(d.date)}
            >
              <span className="cal-day-label">{d.day}</span>
              <span className="cal-date-label">{d.date}</span>
              {d.date === 13 && <span className="today-dot"></span>}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Widgets List */}
      <div className="activity-widgets-container">
        <h3 className="section-title-sm">Activity Progression</h3>
        
        <div className="widgets-grid">
          
          {/* Water widget */}
          <div className="widget-card">
            <div className="widget-visual water-visual">
              <Droplet size={32} className="widget-icon" />
              <div className="water-level" style={{ height: `${Math.min((activeLog.water / 3000) * 100, 100)}%` }} />
            </div>
            <div className="widget-info">
              <span className="widget-label">Water Intake</span>
              <h4 className="widget-value">{activeLog.water.toLocaleString()} ml</h4>
              <span className="widget-target">Target: 3,000 ml</span>
            </div>
            <button className="widget-add-btn" onClick={() => updateLog('water', 250)} title="Add 250ml">
              <Plus size={18} />
            </button>
          </div>

          {/* Steps Widget */}
          <div className="widget-card">
            <div className="widget-visual steps-visual">
              <Footprints size={32} className="widget-icon" />
            </div>
            <div className="widget-info">
              <span className="widget-label">Steps Walked</span>
              <h4 className="widget-value">{activeLog.steps.toLocaleString()}</h4>
              <span className="widget-target">Target: 10,000 steps</span>
            </div>
            <button className="widget-add-btn" onClick={() => updateLog('steps', 500)} title="Add 500 steps">
              <Plus size={18} />
            </button>
          </div>

          {/* Energy Widget */}
          <div className="widget-card">
            <div className="widget-visual energy-visual">
              <Flame size={32} className="widget-icon" />
            </div>
            <div className="widget-info">
              <span className="widget-label">Move Energy</span>
              <h4 className="widget-value">{activeLog.cals} cals</h4>
              <span className="widget-target">Target: 600 cals</span>
            </div>
            <button className="widget-add-btn animate-pulse" onClick={() => updateLog('cals', 35)} title="Burn 35 cals">
              <Plus size={18} />
            </button>
          </div>

          {/* Distance Widget */}
          <div className="widget-card">
            <div className="widget-visual distance-visual">
              <Route size={32} className="widget-icon" />
            </div>
            <div className="widget-info">
              <span className="widget-label">Distance Travelled</span>
              <h4 className="widget-value">{renderDistance(activeLog.dist)}</h4>
              <span className="widget-target">Target: 8.0 km</span>
            </div>
            <button className="widget-add-btn" onClick={() => updateLog('dist', 0.5)} title="Add 0.5km">
              <Plus size={18} />
            </button>
          </div>

          {/* Flights Widget */}
          <div className="widget-card">
            <div className="widget-visual flights-visual">
              <TrendingUp size={32} className="widget-icon" />
            </div>
            <div className="widget-info">
              <span className="widget-label">Flights Climbed</span>
              <h4 className="widget-value">{activeLog.floors} floors</h4>
              <span className="widget-target">Target: 10 floors</span>
            </div>
            <button className="widget-add-btn" onClick={() => updateLog('floors', 1)} title="Add 1 floor">
              <Plus size={18} />
            </button>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .widgets-wrapper {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Calendar Header Styling */
        .calendar-header-card {
          background-color: var(--bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 24px;
        }

        .calendar-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .calendar-date-title {
          font-size: 1.2rem;
          font-weight: 700;
        }

        .today-reset-btn {
          background: transparent;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-pill);
          color: var(--color-accent);
          padding: 6px 14px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .today-reset-btn:hover {
          background-color: var(--bg-active);
          border-color: var(--color-accent);
        }

        .calendar-strip {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
        }

        .calendar-day-btn {
          background: var(--bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 12px 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }

        .calendar-day-btn:hover {
          border-color: rgba(255, 175, 0, 0.4);
          background-color: rgba(255, 175, 0, 0.03);
        }

        .calendar-day-btn.active {
          border-color: var(--color-accent);
          background-color: var(--bg-primary);
          box-shadow: 0 0 12px rgba(255, 175, 0, 0.15);
        }

        .cal-day-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .calendar-day-btn.active .cal-day-label {
          color: var(--color-accent);
        }

        .cal-date-label {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .today-dot {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--color-accent);
        }

        /* Widgets Container styling */
        .section-title-sm {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .widgets-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .widget-card {
          background-color: var(--bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 20px;
          position: relative;
          transition: all 0.25s ease;
        }

        .widget-card:hover {
          border-color: rgba(255, 255, 255, 0.1);
        }

        .widget-visual {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background-color: var(--bg-secondary);
          flex-shrink: 0;
        }

        .widget-icon {
          color: rgba(255, 255, 255, 0.9);
          z-index: 2;
        }

        /* Gradient backgrounds for visuals */
        .water-visual { background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); }
        .steps-visual { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); }
        .energy-visual { background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%); }
        .distance-visual { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
        .flights-visual { background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); }

        .water-level {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background: rgba(255, 255, 255, 0.25);
          transition: height 0.5s ease-out;
          z-index: 1;
        }

        .widget-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .widget-label {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .widget-value {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
          margin: 2px 0;
        }

        .widget-target {
          font-size: 0.75rem;
          color: rgba(181, 183, 192, 0.6);
        }

        .widget-add-btn {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-pill);
          background-color: var(--bg-secondary);
          border: 1px solid var(--color-border);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .widget-add-btn:hover {
          background-color: var(--color-accent);
          color: #000000;
          border-color: var(--color-accent);
          transform: scale(1.08);
        }

        .widget-add-btn:active {
          transform: scale(0.95);
        }
      `}} />
    </div>
  );
}
