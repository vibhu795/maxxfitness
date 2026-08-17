import React, { useState, useEffect } from 'react';
import { Sparkles, Play, RotateCcw, ShieldCheck, HelpCircle } from 'lucide-react';

const EXERCISE_DATABASE = {
  gym: {
    fullbody: [
      { name: 'Barbell Back Squats', sets: 3, reps: 10, weight: 60 },
      { name: 'Flat Barbell Bench Press', sets: 3, reps: 8, weight: 50 },
      { name: 'Lat Pulldowns (Wide Grip)', sets: 3, reps: 10, weight: 40 },
      { name: 'Seated Dumbbell Shoulder Press', sets: 3, reps: 12, weight: 16 }
    ],
    chest_arms: [
      { name: 'Incline Barbell Bench Press', sets: 4, reps: 8, weight: 55 },
      { name: 'Cable Chest Flyes', sets: 3, reps: 12, weight: 20 },
      { name: 'Barbell Bicep Curls', sets: 3, reps: 10, weight: 25 },
      { name: 'Tricep Rope Pushdowns', sets: 3, reps: 12, weight: 22 }
    ],
    shoulders_back: [
      { name: 'Overhead Military Press', sets: 4, reps: 8, weight: 40 },
      { name: 'Conventional Deadlifts', sets: 3, reps: 6, weight: 90 },
      { name: 'Seated Cable Rows', sets: 3, reps: 10, weight: 45 },
      { name: 'Dumbbell Lateral Raises', sets: 3, reps: 15, weight: 8 }
    ],
    legs: [
      { name: 'Barbell Back Squats', sets: 4, reps: 8, weight: 70 },
      { name: 'Leg Press Machine', sets: 3, reps: 10, weight: 120 },
      { name: 'Dumbbell Romanian Deadlifts (RDL)', sets: 3, reps: 10, weight: 50 },
      { name: 'Seated Hamstring Curls', sets: 3, reps: 12, weight: 35 }
    ]
  },
  dumbbells: {
    fullbody: [
      { name: 'Dumbbell Goblet Squats', sets: 3, reps: 12, weight: 20 },
      { name: 'Dumbbell Flat Press', sets: 3, reps: 10, weight: 18 },
      { name: 'Dumbbell One-Arm Rows', sets: 3, reps: 10, weight: 16 },
      { name: 'Dumbbell Arnold Press', sets: 3, reps: 12, weight: 12 }
    ],
    chest_arms: [
      { name: 'Incline Dumbbell Flyes', sets: 3, reps: 12, weight: 14 },
      { name: 'Dumbbell Incline Bench Press', sets: 4, reps: 10, weight: 18 },
      { name: 'Dumbbell Alternating Hammer Curls', sets: 3, reps: 12, weight: 12 },
      { name: 'Dumbbell Overhead Tricep Extension', sets: 3, reps: 12, weight: 14 }
    ],
    shoulders_back: [
      { name: 'Dumbbell Shoulder Press', sets: 4, reps: 10, weight: 14 },
      { name: 'Dumbbell Bent-Over Row', sets: 3, reps: 10, weight: 18 },
      { name: 'Dumbbell Reverse Flyes', sets: 3, reps: 12, weight: 8 },
      { name: 'Dumbbell Shrugs', sets: 3, reps: 12, weight: 22 }
    ],
    legs: [
      { name: 'Dumbbell Lunges (Alternating)', sets: 3, reps: 10, weight: 12 },
      { name: 'Dumbbell Sumo Squats', sets: 3, reps: 12, weight: 22 },
      { name: 'Dumbbell Calf Raises', sets: 3, reps: 15, weight: 16 },
      { name: 'Dumbbell Romanian Deadlifts', sets: 3, reps: 10, weight: 20 }
    ]
  },
  bodyweight: {
    fullbody: [
      { name: 'Standard Push-ups', sets: 3, reps: 12, weight: 0 },
      { name: 'Bodyweight squats', sets: 3, reps: 15, weight: 0 },
      { name: 'Plank Hold', sets: 3, reps: 45, weight: 0 }, // reps will represent seconds here
      { name: 'Glute Bridges', sets: 3, reps: 12, weight: 0 }
    ],
    chest_arms: [
      { name: 'Decline Push-ups', sets: 3, reps: 10, weight: 0 },
      { name: 'Bench Tricep Dips', sets: 3, reps: 12, weight: 0 },
      { name: 'Incline Push-ups', sets: 3, reps: 15, weight: 0 },
      { name: 'Diamond Push-ups', sets: 3, reps: 8, weight: 0 }
    ],
    shoulders_back: [
      { name: 'Pike Push-ups', sets: 3, reps: 10, weight: 0 },
      { name: 'Prone Superman Raises', sets: 3, reps: 12, weight: 0 },
      { name: 'Y-T-W Back Extensions', sets: 3, reps: 10, weight: 0 },
      { name: 'Crab Walk Walkouts', sets: 3, reps: 8, weight: 0 }
    ],
    legs: [
      { name: 'Bodyweight Jump Squats', sets: 3, reps: 10, weight: 0 },
      { name: 'Forward Lunges', sets: 3, reps: 12, weight: 0 },
      { name: 'Single-Leg Calf Raises', sets: 3, reps: 15, weight: 0 },
      { name: 'Wall Sit Hold', sets: 3, reps: 30, weight: 0 }
    ]
  }
};

const LOADING_PHRASES = [
  'Analyzing user goals...',
  'Optimizing workout volume split...',
  'Structuring biomechanical routines...',
  'Writing targeted exercise profiles...',
  'Finalizing custom training sheet...'
];

export default function AIWorkoutGenerator({ onStartWorkout }) {
  const [focus, setFocus] = useState('fullbody');
  const [equipment, setEquipment] = useState('gym');
  const [level, setLevel] = useState('intermediate');

  const [generating, setGenerating] = useState(false);
  const [loadPhraseIndex, setLoadPhraseIndex] = useState(0);
  const [generatedWorkout, setGeneratedWorkout] = useState(null);

  // Rotate phrases during loader
  useEffect(() => {
    let interval = null;
    if (generating) {
      interval = setInterval(() => {
        setLoadPhraseIndex((prev) => (prev + 1) % LOADING_PHRASES.length);
      }, 600);
    }
    return () => clearInterval(interval);
  }, [generating]);

  const handleGenerate = () => {
    setGenerating(true);
    setGeneratedWorkout(null);

    // Simulate AI generation over 2.4 seconds
    setTimeout(() => {
      // 1. Fetch templates
      const templates = EXERCISE_DATABASE[equipment][focus];
      
      // 2. Adjust sets, reps, and weights based on difficulty level
      let weightMult = 1.0;
      let setDiff = 0;
      let repDiff = 0;

      if (level === 'beginner') {
        weightMult = 0.7;
        setDiff = -1; // subtract a set
        repDiff = -2; // subtract reps
      } else if (level === 'advanced') {
        weightMult = 1.35;
        setDiff = 1; // add a set
        repDiff = 3; // add reps
      }

      const exercises = templates.map((ex, index) => {
        // Adjust sets (min 2 sets)
        const finalSetsCount = Math.max(2, ex.sets + setDiff);
        // Adjust reps (min 5 reps)
        const finalRepsCount = Math.max(5, ex.reps + repDiff);
        // Adjust weights (round to nearest kg, 0 if bodyweight)
        const finalWeight = ex.weight > 0 ? Math.round(ex.weight * weightMult) : 0;

        // Build sets structure for WorkoutPlayer
        const setsArray = Array.from({ length: finalSetsCount }, (_, sIdx) => ({
          id: sIdx + 1,
          reps: finalRepsCount,
          weight: finalWeight,
          done: false
        }));

        return {
          id: index + 1,
          name: ex.name,
          sets: setsArray
        };
      });

      // Format workout titles
      const focusLabels = {
        fullbody: 'Full Body',
        chest_arms: 'Chest & Arms Split',
        shoulders_back: 'Shoulders & Back Split',
        legs: 'Lower Body Workout'
      };

      const equipmentLabels = {
        gym: 'Gym Setup',
        dumbbells: 'Dumbbell Circuit',
        bodyweight: 'Calisthenics'
      };

      const finalWorkout = {
        id: 9999, // Custom AI ID
        name: `AI Custom: ${focusLabels[focus]} [${equipmentLabels[equipment]}]`,
        difficulty: level.charAt(0).toUpperCase() + level.slice(1),
        duration: `${Math.max(20, exercises.length * 10)} mins`,
        muscles: focusLabels[focus],
        isAICustom: true,
        exercises: exercises
      };

      setGeneratedWorkout(finalWorkout);
      setGenerating(false);
    }, 2400);
  };

  const handleReset = () => {
    setGeneratedWorkout(null);
  };

  return (
    <div className="card-premium ai-workout-card animate-slide">
      <div className="ai-card-header">
        <div className="ai-icon-pulse">
          <Sparkles size={24} className="icon-gold" />
        </div>
        <div>
          <h3 className="ai-card-title">✦ Smart AI Workout Generator</h3>
          <p className="ai-card-subtitle">
            Instantly program a personalized strength circuit optimized for your goals and gear.
          </p>
        </div>
      </div>

      {/* 1. Loading State */}
      {generating && (
        <div className="ai-loading-container animate-fade">
          <div className="ai-loader-bar">
            <div className="ai-loader-progress"></div>
          </div>
          <span className="ai-phrase-text">{LOADING_PHRASES[loadPhraseIndex]}</span>
        </div>
      )}

      {/* 2. Parameters Selection Form */}
      {!generating && !generatedWorkout && (
        <div className="ai-generator-form">
          <div className="form-fields-grid">
            <div className="input-group">
              <label className="input-label">Target Focus</label>
              <select 
                className="input-premium ai-select"
                value={focus} 
                onChange={(e) => setFocus(e.target.value)}
              >
                <option value="fullbody">Full Body Circuit</option>
                <option value="chest_arms">Chest & Arms Split</option>
                <option value="shoulders_back">Shoulders & Back Split</option>
                <option value="legs">Legs & Lower Body</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Equipment Available</label>
              <select 
                className="input-premium ai-select"
                value={equipment} 
                onChange={(e) => setEquipment(e.target.value)}
              >
                <option value="gym">Full Gym Machines & Barbell</option>
                <option value="dumbbells">Dumbbells Only</option>
                <option value="bodyweight">Bodyweight (No Gear)</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Difficulty Level</label>
              <select 
                className="input-premium ai-select"
                value={level} 
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="beginner">Beginner (1-3 months)</option>
                <option value="intermediate">Intermediate (3-12 months)</option>
                <option value="advanced">Advanced (1 year+)</option>
              </select>
            </div>
          </div>

          <button className="btn btn-primary w-full mt-4 justify-center" onClick={handleGenerate}>
            <Sparkles size={18} fill="#000" />
            <span>Generate Custom Session ✦</span>
          </button>
        </div>
      )}

      {/* 3. Generated Workout Presentation */}
      {!generating && generatedWorkout && (
        <div className="ai-results-panel animate-fade">
          <div className="result-header-row">
            <div>
              <span className="result-badge">AI Compiled Program</span>
              <h4 className="result-workout-name">{generatedWorkout.name}</h4>
              <div className="result-meta-row">
                <span>{generatedWorkout.difficulty} Level</span>
                <span>·</span>
                <span>{generatedWorkout.duration}</span>
              </div>
            </div>
            <button className="btn btn-secondary btn-icon-only" onClick={handleReset} title="Re-generate">
              <RotateCcw size={16} />
            </button>
          </div>

          <div className="exercises-preview-box">
            <h5 className="preview-heading">Program Exercises:</h5>
            <ul className="preview-exercise-list">
              {generatedWorkout.exercises.map((ex) => (
                <li key={ex.id} className="preview-ex-item">
                  <span className="ex-item-num">{ex.id}</span>
                  <div className="ex-item-details">
                    <strong>{ex.name}</strong>
                    <span>
                      {ex.sets.length} sets x {ex.sets[0].reps} reps {ex.sets[0].weight > 0 ? `@ ${ex.sets[0].weight} kg` : '(Bodyweight)'}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <button className="btn btn-primary w-full mt-4 justify-center" onClick={() => onStartWorkout(generatedWorkout)}>
            <Play size={18} fill="#000" />
            <span>Start AI Workout Session</span>
          </button>
        </div>
      )}
    </div>
  );
}
