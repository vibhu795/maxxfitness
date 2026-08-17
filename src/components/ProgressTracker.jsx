import React, { useState } from 'react';
import { Camera, Plus, BarChart, Calendar, ChevronRight, Activity, TrendingDown } from 'lucide-react';

export default function ProgressTracker({ unitSystem }) {
  const [activeTab, setActiveTab] = useState('progress'); // progress vs trends
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [checkInPhotos, setCheckInPhotos] = useState({
    before: null,
    after: null
  });

  const [measurements, setMeasurements] = useState({
    weight: 78.5,
    waist: 32.5,
    chest: 40.2
  });

  const [tempMeasurements, setTempMeasurements] = useState({ ...measurements });
  const [isLogged, setIsLogged] = useState(false);

  const handleSaveMeasurements = (e) => {
    e.preventDefault();
    setMeasurements({ ...tempMeasurements });
    setIsLogged(true);
    setTimeout(() => setIsLogged(false), 3000);
  };

  const handleUploadDemo = (type) => {
    const demoPics = {
      before: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=400',
      after: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400'
    };

    setCheckInPhotos((prev) => ({
      ...prev,
      [type]: demoPics[type]
    }));
    setShowCheckInModal(false);
  };

  // Convert based on units
  const renderWeight = (kg) => {
    if (unitSystem === 'Imperial') {
      const lbs = Math.round(kg * 2.20462);
      return `${lbs} lbs`;
    }
    return `${kg} kg`;
  };

  const renderLength = (inches) => {
    if (unitSystem === 'Imperial') {
      return `${inches} in`;
    }
    const cm = (inches * 2.54).toFixed(1);
    return `${cm} cm`;
  };

  return (
    <div className="progress-page-wrapper animate-fade">
      {/* Page Header Tab Switcher */}
      <div className="progress-header">
        <h2 className="progress-title">Your Progress</h2>
        
        <div className="tab-container">
          <button
            className={`tab-btn ${activeTab === 'progress' ? 'active' : ''}`}
            onClick={() => setActiveTab('progress')}
          >
            Progress
          </button>
          <button
            className={`tab-btn ${activeTab === 'trends' ? 'active' : ''}`}
            onClick={() => setActiveTab('trends')}
          >
            Trends
          </button>
        </div>
      </div>

      {activeTab === 'progress' ? (
        <div className="tab-content-area animate-slide">
          
          {/* Check-ins Card */}
          <div className="tracker-section-card">
            <div className="card-section-header">
              <h3 className="card-section-title">Check-ins</h3>
              <ChevronRight size={20} className="icon-yellow" />
            </div>

            <button className="btn btn-secondary w-full btn-checkin" onClick={() => setShowCheckInModal(true)}>
              Check in Now
            </button>

            {/* Before / After Photo Comparison */}
            <div className="photos-comparison-grid">
              <div className="photo-slot">
                {checkInPhotos.before ? (
                  <img src={checkInPhotos.before} alt="Before Checkin" className="uploaded-progress-img" />
                ) : (
                  <div className="photo-slot-placeholder">
                    {/* SVG silhouette body outline from app screenshot */}
                    <svg className="silhouette-svg" viewBox="0 0 100 200" width="80" height="150" fill="none" stroke="#303030" strokeWidth="1">
                      <path d="M50,15 C45,15 42,20 42,25 C42,30 45,35 50,35 C55,35 58,30 58,25 C58,20 55,15 50,15 Z" />
                      <path d="M50,35 C35,35 30,55 30,85 L30,120 L38,120 L38,190 L48,190 L48,125 L52,125 L52,190 L62,190 L62,120 L70,120 L70,85 C70,55 65,35 50,35 Z" />
                    </svg>
                    <span className="photo-slot-label">Before</span>
                  </div>
                )}
              </div>

              <div className="photo-slot">
                {checkInPhotos.after ? (
                  <img src={checkInPhotos.after} alt="After Checkin" className="uploaded-progress-img" />
                ) : (
                  <div className="photo-slot-placeholder border-dashed">
                    <svg className="silhouette-svg" viewBox="0 0 100 200" width="80" height="150" fill="none" stroke="#303030" strokeWidth="1">
                      <path d="M50,15 C45,15 42,20 42,25 C42,30 45,35 50,35 C55,35 58,30 58,25 C58,20 55,15 50,15 Z" />
                      <path d="M50,35 C35,35 30,55 30,85 L30,120 L38,120 L38,190 L48,190 L48,125 L52,125 L52,190 L62,190 L62,120 L70,120 L70,85 C70,55 65,35 50,35 Z" />
                    </svg>
                    <span className="photo-slot-label">After</span>
                  </div>
                )}
              </div>
            </div>
            
            <p className="photo-disclaimer-text">
              Check-in photos will show up here for before and after comparison. Upload weekly to track visual composition changes.
            </p>
          </div>

          {/* Measurements Card */}
          <div className="tracker-section-card">
            <div className="card-section-header">
              <h3 className="card-section-title">Log Body Measurements</h3>
              <Activity size={20} className="icon-yellow" />
            </div>

            <form onSubmit={handleSaveMeasurements} className="measurements-form">
              <div className="inputs-grid">
                <div className="input-group">
                  <label className="input-label">Weight ({unitSystem === 'Imperial' ? 'lbs' : 'kg'})</label>
                  <input
                    type="number"
                    step="0.1"
                    className="input-premium"
                    value={tempMeasurements.weight}
                    onChange={(e) => setTempMeasurements({ ...tempMeasurements, weight: parseFloat(e.target.value) || 0 })}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Waist ({unitSystem === 'Imperial' ? 'inches' : 'cm'})</label>
                  <input
                    type="number"
                    step="0.1"
                    className="input-premium"
                    value={tempMeasurements.waist}
                    onChange={(e) => setTempMeasurements({ ...tempMeasurements, waist: parseFloat(e.target.value) || 0 })}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Chest ({unitSystem === 'Imperial' ? 'inches' : 'cm'})</label>
                  <input
                    type="number"
                    step="0.1"
                    className="input-premium"
                    value={tempMeasurements.chest}
                    onChange={(e) => setTempMeasurements({ ...tempMeasurements, chest: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-full mt-4">
                Save Measurements
              </button>

              {isLogged && (
                <div className="logged-toast animate-fade">
                  <span>✓ Measurements logged successfully!</span>
                </div>
              )}
            </form>

            <div className="current-stats-box">
              <h4 className="box-title">Current Stats</h4>
              <div className="stats-row">
                <div className="stat-pill">
                  <span className="stat-label">Weight</span>
                  <span className="stat-value">{renderWeight(measurements.weight)}</span>
                </div>
                <div className="stat-pill">
                  <span className="stat-label">Waist</span>
                  <span className="stat-value">{renderLength(measurements.waist)}</span>
                </div>
                <div className="stat-pill">
                  <span className="stat-label">Chest</span>
                  <span className="stat-value">{renderLength(measurements.chest)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* Trends graphs */
        <div className="tab-content-area animate-slide">
          
          {/* Weight Reduction Trends */}
          <div className="tracker-section-card">
            <div className="card-section-header">
              <h3 className="card-section-title">Weight Progression Trend</h3>
              <TrendingDown size={20} className="icon-yellow" />
            </div>

            {/* Custom pure CSS graph to show weights reducing */}
            <div className="graph-container">
              <div className="line-graph-grid">
                {/* Horizontal grid lines */}
                <div className="grid-line" data-val="82kg"></div>
                <div className="grid-line" data-val="80kg"></div>
                <div className="grid-line" data-val="78kg"></div>
                <div className="grid-line" data-val="76kg"></div>
                
                {/* The SVG Path connecting weights */}
                <svg className="graph-svg" viewBox="0 0 100 60" preserveAspectRatio="none">
                  <path 
                    d="M 5,10 L 25,18 L 45,30 L 65,38 L 85,48" 
                    fill="none" 
                    stroke="var(--color-accent)" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                  />
                  {/* Glowing data points */}
                  <circle cx="5" cy="10" r="2.5" fill="var(--color-accent)" />
                  <circle cx="25" cy="18" r="2.5" fill="var(--color-accent)" />
                  <circle cx="45" cy="30" r="2.5" fill="var(--color-accent)" />
                  <circle cx="65" cy="38" r="2.5" fill="var(--color-accent)" />
                  <circle cx="85" cy="48" r="2.5" fill="var(--color-accent)" />
                </svg>
              </div>
              <div className="graph-labels-row">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
                <span>Current</span>
              </div>
            </div>
            
            <p className="graph-desc">
              Your overall bodyweight is down by <strong>3.5 kg</strong> this month. Good calorie deficit consistency!
            </p>
          </div>

          {/* Calorie expenditure trends */}
          <div className="tracker-section-card">
            <div className="card-section-header">
              <h3 className="card-section-title">Daily Burn Energy (cals)</h3>
              <Activity size={20} className="icon-yellow" />
            </div>

            {/* Bar graph */}
            <div className="bar-graph-wrapper">
              <div className="bars-container">
                <div className="bar-column">
                  <div className="bar-fill" style={{ height: '70%' }}></div>
                  <span className="bar-label">Mon</span>
                </div>
                <div className="bar-column">
                  <div className="bar-fill" style={{ height: '85%' }}></div>
                  <span className="bar-label">Tue</span>
                </div>
                <div className="bar-column">
                  <div className="bar-fill" style={{ height: '40%' }}></div>
                  <span className="bar-label">Wed</span>
                </div>
                <div className="bar-column">
                  <div className="bar-fill" style={{ height: '95%' }}></div>
                  <span className="bar-label">Thu</span>
                </div>
                <div className="bar-column">
                  <div className="bar-fill" style={{ height: '65%' }}></div>
                  <span className="bar-label">Fri</span>
                </div>
                <div className="bar-column">
                  <div className="bar-fill active-bar" style={{ height: '78%' }}></div>
                  <span className="bar-label font-bold">Sat</span>
                </div>
                <div className="bar-column">
                  <div className="bar-fill" style={{ height: '20%' }}></div>
                  <span className="bar-label">Sun</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Upload Photos Simulator Modal */}
      {showCheckInModal && (
        <div className="modal-backdrop animate-fade">
          <div className="modal-content card-premium animate-slide">
            <h3 className="modal-title">Upload Check-in Photo</h3>
            <p className="modal-sub">Simulate a check-in upload for testing this interactive dashboard.</p>
            
            <div className="modal-actions-list">
              <button className="btn btn-tertiary w-full" onClick={() => handleUploadDemo('before')}>
                <Camera size={16} />
                <span>Upload "Before" Demo Photo</span>
              </button>
              <button className="btn btn-tertiary w-full" onClick={() => handleUploadDemo('after')}>
                <Camera size={16} />
                <span>Upload "After" Demo Photo</span>
              </button>
            </div>
            
            <button className="btn btn-secondary w-full mt-4" onClick={() => setShowCheckInModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .progress-page-wrapper {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .progress-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 16px;
        }

        .progress-title {
          font-size: 1.5rem;
          font-weight: 800;
        }

        .tracker-section-card {
          background-color: var(--bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 24px;
          margin-bottom: 24px;
        }

        .card-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .card-section-title {
          font-size: 1.15rem;
          font-weight: 700;
        }

        .btn-checkin {
          margin-bottom: 20px;
          border-color: var(--color-accent);
          color: var(--color-accent);
        }

        .btn-checkin:hover {
          background-color: rgba(255, 175, 0, 0.05);
          border-color: var(--color-accent-hover);
        }

        /* Photos comparison slots grid */
        .photos-comparison-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }

        .photo-slot {
          background-color: var(--bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          aspect-ratio: 4/5;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .uploaded-progress-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: var(--radius-md);
        }

        .photo-slot-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .silhouette-svg {
          opacity: 0.2;
        }

        .photo-slot-label {
          font-size: 0.85rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .photo-disclaimer-text {
          font-size: 0.8rem;
          color: var(--text-secondary);
          text-align: center;
          line-height: 1.4;
        }

        /* Forms measurements loggers styles */
        .measurements-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }

        .inputs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        @media (max-width: 600px) {
          .inputs-grid {
            grid-template-columns: 1fr;
          }
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-label {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .logged-toast {
          background-color: rgba(34, 197, 94, 0.15);
          border: 1px solid #22c55e;
          border-radius: var(--radius-sm);
          color: #22c55e;
          padding: 10px;
          text-align: center;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .current-stats-box {
          background-color: var(--bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 16px;
        }

        .box-title {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 12px;
          text-transform: uppercase;
          font-weight: 600;
        }

        .stats-row {
          display: flex;
          justify-content: space-around;
          gap: 12px;
        }

        .stat-pill {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .stat-value {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        /* Trends Graphs styles */
        .graph-container {
          background-color: var(--bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 24px 16px 16px 20px;
          margin-bottom: 16px;
        }

        .line-graph-grid {
          position: relative;
          height: 180px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-left: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          margin-left: 30px;
        }

        .grid-line {
          width: 100%;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.05);
          position: relative;
        }

        .grid-line::before {
          content: attr(data-val);
          position: absolute;
          left: -40px;
          top: -8px;
          font-size: 0.75rem;
          color: rgba(181, 183, 192, 0.5);
          font-family: monospace;
        }

        .graph-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .graph-labels-row {
          display: flex;
          justify-content: space-between;
          padding-left: 35px;
          margin-top: 10px;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .graph-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          text-align: center;
        }

        /* Bar Chart Styles */
        .bar-graph-wrapper {
          background-color: var(--bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 24px 20px;
        }

        .bars-container {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          height: 180px;
          gap: 12px;
          align-items: flex-end;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 8px;
        }

        .bar-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          justify-content: flex-end;
          gap: 8px;
        }

        .bar-fill {
          width: 20px;
          background-color: var(--bg-active);
          border-radius: 4px 4px 0 0;
          transition: height 0.3s ease;
        }

        .bar-fill:hover {
          background-color: rgba(255, 175, 0, 0.4);
        }

        .active-bar {
          background: var(--color-accent);
          box-shadow: 0 0 10px rgba(255, 175, 0, 0.25);
        }

        .bar-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        /* Modal backdrop styles */
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 24px;
        }

        .modal-content {
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        .modal-title {
          font-size: 1.25rem;
          margin-bottom: 8px;
        }

        .modal-sub {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .modal-actions-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
      `}} />
    </div>
  );
}
