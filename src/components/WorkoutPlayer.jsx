import React, { useState, useEffect } from 'react';
import { Play, Clock, BarChart2, Target, Dumbbell, ArrowLeft, Check, Download, Trophy } from 'lucide-react';

export default function WorkoutPlayer({ workout, onBack }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Setup exercises list based on program type
  const [exercises, setExercises] = useState(() => {
    if (workout && workout.exercises && workout.exercises.length > 0) {
      return workout.exercises.map(ex => ({
        ...ex,
        sets: ex.sets.map(s => ({ ...s, done: false }))
      }));
    }
    return [
      {
        id: 1,
        name: 'Barbell Bench Press',
        sets: [
          { id: 1, reps: 10, weight: 60, done: false },
          { id: 2, reps: 8, weight: 70, done: false },
          { id: 3, reps: 6, weight: 80, done: false },
        ]
      },
      {
        id: 2,
        name: 'Dumbbell Incline Press',
        sets: [
          { id: 1, reps: 12, weight: 20, done: false },
          { id: 2, reps: 10, weight: 24, done: false },
          { id: 3, reps: 8, weight: 28, done: false },
        ]
      },
      {
        id: 3,
        name: 'Cable Flyes',
        sets: [
          { id: 1, reps: 15, weight: 15, done: false },
          { id: 2, reps: 12, weight: 20, done: false },
          { id: 3, reps: 10, weight: 25, done: false },
        ]
      },
      {
        id: 4,
        name: 'Dips (Chest Focus)',
        sets: [
          { id: 1, reps: 12, weight: 0, done: false },
          { id: 2, reps: 10, weight: 5, done: false },
          { id: 3, reps: 8, weight: 10, done: false },
        ]
      }
    ];
  });

  // Workout Timer
  useEffect(() => {
    let interval = null;
    if (isPlaying && !completed) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, completed]);

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return [
      hrs > 0 ? String(hrs).padStart(2, '0') : null,
      String(mins).padStart(2, '0'),
      String(secs).padStart(2, '0'),
    ].filter(Boolean).join(':');
  };

  const handleToggleSet = (exIndex, setIndex) => {
    const updated = [...exercises];
    updated[exIndex].sets[setIndex].done = !updated[exIndex].sets[setIndex].done;
    setExercises(updated);

    // Check if workout is completely finished
    const allDone = updated.every(ex => ex.sets.every(s => s.done));
    if (allDone) {
      setCompleted(true);
    }
  };

  const handleUpdateLog = (exIndex, setIndex, field, value) => {
    const updated = [...exercises];
    updated[exIndex].sets[setIndex][field] = parseFloat(value) || 0;
    setExercises(updated);
  };

  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
  const doneSets = exercises.reduce((acc, ex) => acc + ex.sets.filter(s => s.done).length, 0);
  const percentComplete = Math.round((doneSets / totalSets) * 100);

  if (completed) {
    return (
      <div className="workout-completed-screen animate-fade">
        <div className="trophy-wrapper">
          <Trophy size={64} className="trophy-icon" />
        </div>
        <h2 className="complete-headline">Workout Complete!</h2>
        <p className="complete-subhead">Sensational job! You are getting stronger every day.</p>
        
        <div className="summary-card">
          <div className="summary-item">
            <span className="summary-label">Time Elapsed</span>
            <span className="summary-val">{formatTime(seconds)}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Sets Completed</span>
            <span className="summary-val">{doneSets} / {totalSets}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Workout Type</span>
            <span className="summary-val">{workout.name}</span>
          </div>
        </div>

        <div className="complete-actions">
          <button className="btn btn-primary" onClick={onBack}>
            Back to Dashboard
          </button>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          .workout-completed-screen {
            text-align: center;
            padding: 48px 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 400px;
          }
          .trophy-wrapper {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: rgba(255, 175, 0, 0.15);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 24px;
            border: 2px solid var(--color-accent);
            animation: pulseBorder 2.5s infinite;
          }
          .trophy-icon {
            color: var(--color-accent);
          }
          .complete-headline {
            font-size: 2rem;
            margin-bottom: 8px;
          }
          .complete-subhead {
            margin-bottom: 32px;
            max-width: 400px;
          }
          .summary-card {
            background-color: var(--bg-card);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-md);
            width: 100%;
            max-width: 440px;
            padding: 24px;
            margin-bottom: 32px;
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          .summary-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .summary-label {
            color: var(--text-secondary);
            font-size: 0.95rem;
          }
          .summary-val {
            font-weight: 700;
            color: var(--text-primary);
          }
        `}} />
      </div>
    );
  }

  return (
    <div className="player-container animate-fade">
      {/* Header Row */}
      <div className="player-header">
        <button className="back-link-btn" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <span className="player-nav-title">{isPlaying ? 'Active Session' : 'Workout Details'}</span>
        <div style={{ width: 60 }} />
      </div>

      {/* Main Info Header or Active Timer */}
      {!isPlaying ? (
        <div className="workout-details-intro animate-slide">
          <div className="workout-detail-hero">
            <h2 className="workout-title">{workout.name}</h2>
            <span className="difficulty-badge">{workout.difficulty || 'Moderate'}</span>
          </div>

          <div className="detail-meta-grid">
            <div className="meta-item">
              <Clock className="meta-icon" size={20} />
              <div className="meta-texts">
                <span className="meta-label">Duration</span>
                <span className="meta-value">{workout.duration || '1 hr'}</span>
              </div>
            </div>
            <div className="meta-item">
              <BarChart2 className="meta-icon" size={20} />
              <div className="meta-texts">
                <span className="meta-label">Level</span>
                <span className="meta-value">{workout.difficulty || 'Moderate'}</span>
              </div>
            </div>
            <div className="meta-item">
              <Target className="meta-icon" size={20} />
              <div className="meta-texts">
                <span className="meta-label">Muscles</span>
                <span className="meta-value">{workout.muscles || 'Chest, Arms'}</span>
              </div>
            </div>
            <div className="meta-item">
              <Dumbbell className="meta-icon" size={20} />
              <div className="meta-texts">
                <span className="meta-label">Equipment</span>
                <span className="meta-value">Barbell, Dumbbells, Cables</span>
              </div>
            </div>
          </div>

          <p className="workout-description">
            This routine targets strength and size. Lift heavy with strict form, focus on muscle contraction, and complete recommended set thresholds for maximum physical returns.
          </p>

          <div className="workout-actions">
            <button className="btn btn-primary btn-start-session" onClick={() => setIsPlaying(true)}>
              <Play size={18} fill="#000000" />
              <span>Start Workout</span>
            </button>
            <button className="btn btn-secondary" onClick={() => alert('Workout offline content downloaded successfully!')}>
              <Download size={18} />
              <span>Download</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="active-player animate-slide">
          <div className="timer-card">
            <span className="timer-label">Workout Timer</span>
            <h2 className="timer-clock">{formatTime(seconds)}</h2>
            <div className="progress-bar-container">
              <div className="progress-fill" style={{ width: `${percentComplete}%` }} />
            </div>
            <span className="progress-percentage">{percentComplete}% Complete ({doneSets} of {totalSets} sets done)</span>
          </div>

          <div className="active-exercises-list">
            {exercises.map((ex, exIdx) => (
              <div key={ex.id} className="active-exercise-card">
                <h3 className="active-exercise-name">{ex.name}</h3>
                
                <table className="sets-table">
                  <thead>
                    <tr>
                      <th className="th-set">Set</th>
                      <th className="th-lbs">Weight (kg)</th>
                      <th className="th-reps">Reps</th>
                      <th className="th-check">Check</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ex.sets.map((set, setIdx) => (
                      <tr key={set.id} className={`set-tr ${set.done ? 'set-done' : ''}`}>
                        <td className="td-set-index">{setIdx + 1}</td>
                        <td>
                          <input
                            type="number"
                            className="set-input"
                            value={set.weight}
                            disabled={set.done}
                            onChange={(e) => handleUpdateLog(exIdx, setIdx, 'weight', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="set-input"
                            value={set.reps}
                            disabled={set.done}
                            onChange={(e) => handleUpdateLog(exIdx, setIdx, 'reps', e.target.value)}
                          />
                        </td>
                        <td>
                          <button
                            className={`set-check-btn ${set.done ? 'checked' : ''}`}
                            onClick={() => handleToggleSet(exIdx, setIdx)}
                          >
                            {set.done && <Check size={14} />}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          <button className="btn btn-secondary w-full" onClick={() => setIsPlaying(false)}>
            Pause Session
          </button>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .player-container {
          padding: 24px 0;
        }

        .player-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 16px;
          margin-bottom: 24px;
        }

        .back-link-btn {
          background: transparent;
          border: none;
          color: var(--color-accent);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }

        .player-nav-title {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .workout-details-intro {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .workout-title {
          font-size: 1.8rem;
          margin-bottom: 8px;
        }

        .difficulty-badge {
          display: inline-block;
          background-color: var(--bg-secondary);
          color: var(--color-accent);
          padding: 4px 12px;
          border-radius: var(--radius-pill);
          font-size: 0.8rem;
          font-weight: 600;
          border: 1px solid var(--color-border);
        }

        .detail-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin: 10px 0;
        }

        .meta-item {
          background-color: var(--bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .meta-icon {
          color: var(--color-accent);
        }

        .meta-texts {
          display: flex;
          flex-direction: column;
        }

        .meta-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .meta-value {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .workout-description {
          line-height: 1.6;
        }

        .workout-actions {
          display: flex;
          gap: 16px;
          margin-top: 10px;
        }

        .btn-start-session {
          flex: 2;
        }

        /* Active training player */
        .timer-card {
          background-color: var(--bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 24px;
        }

        .timer-label {
          font-size: 0.85rem;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .timer-clock {
          font-size: 2.8rem;
          font-weight: 800;
          font-family: monospace;
          color: var(--color-accent);
          margin: 6px 0;
        }

        .progress-bar-container {
          width: 100%;
          height: 6px;
          background-color: var(--bg-secondary);
          border-radius: var(--radius-pill);
          overflow: hidden;
          margin-top: 12px;
          margin-bottom: 6px;
        }

        .progress-fill {
          height: 100%;
          background: var(--color-accent);
          transition: width 0.3s ease;
        }

        .progress-percentage {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .active-exercises-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 32px;
        }

        .active-exercise-card {
          background-color: var(--bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 20px;
        }

        .active-exercise-name {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .sets-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .sets-table th {
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--color-border);
        }

        .th-set { width: 15%; }
        .th-lbs { width: 35%; }
        .th-reps { width: 35%; }
        .th-check { width: 15%; text-align: center; }

        .set-tr {
          transition: background-color 0.2s ease;
        }

        .set-tr td {
          padding: 10px 0;
          vertical-align: middle;
        }

        .td-set-index {
          font-weight: 700;
          color: var(--text-secondary);
        }

        .set-input {
          background-color: var(--bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: 6px 10px;
          color: var(--text-primary);
          width: 80%;
          font-size: 0.95rem;
        }

        .set-input:disabled {
          opacity: 0.5;
          border-color: transparent;
        }

        .set-check-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 2px solid var(--color-border);
          background: transparent;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .set-check-btn.checked {
          background-color: #22c55e;
          border-color: #22c55e;
        }

        .set-done td {
          opacity: 0.6;
        }

        @media (max-width: 600px) {
          .set-input {
            width: 90%;
            padding: 4px 6px;
            font-size: 0.85rem;
          }
          .active-exercise-card {
            padding: 12px;
          }
          .timer-clock {
            font-size: 2.2rem;
          }
          .workout-actions {
            flex-direction: column;
          }
          .th-lbs { width: 40%; }
          .th-reps { width: 30%; }
        }
      `}} />
    </div>
  );
}
