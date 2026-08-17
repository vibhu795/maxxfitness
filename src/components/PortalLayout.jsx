import React, { useState } from 'react';
import { Home, Grid, MessageCircle, BarChart2, CreditCard, User, LogOut, ChevronRight, CheckSquare, Dumbbell, Coffee, Settings } from 'lucide-react';
import DashboardWidgets from './DashboardWidgets';
import WorkoutPlayer from './WorkoutPlayer';
import CoachChat from './CoachChat';
import ProgressTracker from './ProgressTracker';
import AIWorkoutGenerator from './AIWorkoutGenerator';

export default function PortalLayout({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, workouts, nutrition, messages, progress, plans, profile
  const [unitSystem, setUnitSystem] = useState('Metric'); // Metric vs Imperial
  const [activeWorkout, setActiveWorkout] = useState(null); // Selected workout for details/player

  // Connected apps settings state
  const [connectedApps, setConnectedApps] = useState({
    appleHealth: true,
    myFitnessPal: false,
    googleFit: false
  });

  const sidebarLinks = [
    { label: 'Dashboard', id: 'dashboard', icon: Home },
    { label: 'Workouts', id: 'workouts', icon: Dumbbell },
    { label: 'Nutrition', id: 'nutrition', icon: Coffee },
    { label: 'Messages', id: 'messages', icon: MessageCircle, badge: 1 },
    { label: 'Progress', id: 'progress', icon: BarChart2, badge: 1 },
    { label: 'Plans', id: 'plans', icon: CreditCard },
    { label: 'Profile', id: 'profile', icon: User }
  ];

  // Dummy catalog lists matching mobile screenshots
  const workoutsCatalog = {
    intermediate: [
      { id: 1, name: 'Muscle Gain: Gym [Chest & Triceps]', difficulty: 'Moderate', duration: '1 hr', muscles: 'Chest, Arms', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=300' },
      { id: 2, name: 'Intermediate Fat Loss: Gym [Legs]', difficulty: 'Moderate', duration: '1 hr', muscles: 'Glutes', img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=300' },
      { id: 3, name: 'Intermediate Fat Loss: Gym [Shoulders]', difficulty: 'Moderate', duration: '1 hr', muscles: 'Shoulders, Chest', img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=300' }
    ],
    beginners: [
      { id: 4, name: 'Beginner Fat Loss: Home [Circuit - 1]', difficulty: 'Beginner', duration: '45 mins', muscles: 'Full Body', img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=300' },
      { id: 5, name: 'Beginner Fat Loss: Home [Circuit - 2]', difficulty: 'Beginner', duration: '40 mins', muscles: 'Core, Legs', img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=300' }
    ],
    stretching: [
      { id: 6, name: 'Full Body Stretch', difficulty: 'Beginner', duration: '4 mins', muscles: 'Stretching', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=300' }
    ]
  };

  const mealPlansCatalog = [
    { id: 1, day: 'DAY 1', name: 'PCOS - MEAL PLAN', cals: 2392, type: 'Breakfast', meal: 'Oatmeal with chia seeds, whey, and almonds' },
    { id: 2, day: 'DAY 1', name: 'PCOS - MEAL PLAN', cals: 2392, type: 'Lunch', meal: 'Grilled chicken breast with mashed sweet potato and asparagus' },
    { id: 3, day: 'DAY 1', name: 'PCOS - MEAL PLAN', cals: 2392, type: 'Snack', meal: 'Rice cakes with natural peanut butter' },
    { id: 4, day: 'DAY 1', name: 'PCOS - MEAL PLAN', cals: 2392, type: 'Dinner', meal: 'Baked salmon fillet with quinoa salad' },
    { id: 5, day: 'DAY 2', name: 'PCOS - MEAL PLAN', cals: 2392, type: 'Breakfast', meal: 'Scrambled egg whites with avocado toast' },
    { id: 6, day: 'DAY 2', name: 'PCOS - MEAL PLAN', cals: 2392, type: 'Lunch', meal: 'Turkey meatballs with brown rice and green beans' }
  ];

  const handleSelectWorkout = (workout) => {
    setActiveWorkout(workout);
    setActiveTab('workouts');
  };

  const toggleAppConnection = (key) => {
    setConnectedApps(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="portal-layout">
      {/* Sidebar navigation */}
      <aside className="portal-sidebar">
        <div className="sidebar-logo">
          <span className="logo-maxx">MAXX</span>
          <span className="logo-fit">PORTAL</span>
        </div>

        <ul className="sidebar-links">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.id}>
                <button
                  className={`sidebar-btn ${activeTab === link.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(link.id);
                    setActiveWorkout(null);
                  }}
                >
                  <Icon size={20} className="sidebar-icon" />
                  <span className="sidebar-label">{link.label}</span>
                  {link.badge && <span className="sidebar-badge">{link.badge}</span>}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="sidebar-footer">
          <div className="sidebar-user-card">
            <div className="sidebar-user-avatar">
              {user.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="sidebar-user-info">
              <span className="sidebar-username">{user.name}</span>
              <span className="sidebar-useremail">{user.email}</span>
            </div>
          </div>
          <button className="sidebar-logout-btn" onClick={onLogout}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main dashboard content container */}
      <main className="portal-content-body">
        {/* Mobile Header */}
        <header className="portal-mobile-header">
          <div className="mobile-logo">
            <span className="logo-maxx">MAXX</span>
            <span className="logo-fit">PORTAL</span>
          </div>
          <div className="mobile-header-actions">
            <div className="mobile-avatar" onClick={() => setActiveTab('profile')}>
              {user.name.slice(0, 2).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Tab Router Switch */}
        <div className="portal-router-view">
          
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="tab-pane animate-fade">
              <div className="greeting-row">
                <div>
                  <h1 className="greeting-title">Hello <strong>{user.name}</strong></h1>
                  <p className="greeting-sub">Let's check your activity goals today.</p>
                </div>
                <div className="portal-plan-tag">
                  <span className="plan-badge">Intermediate Member</span>
                </div>
              </div>

              <div className="dashboard-grid-layout">
                {/* Left col: trackers */}
                <div className="dashboard-main-col">
                  <DashboardWidgets unitSystem={unitSystem} />
                </div>

                {/* Right col: quick summaries & coach callout */}
                <div className="dashboard-side-col">
                  {/* Current Active Plan Card */}
                  <div className="card-premium quick-plan-card">
                    <h3 className="quick-plan-title">Active Program</h3>
                    <div className="quick-plan-banner" onClick={() => handleSelectWorkout(workoutsCatalog.intermediate[0])}>
                      <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=400" alt="workout" className="quick-plan-img" />
                      <div className="quick-plan-overlay">
                        <span className="quick-plan-badge">Current Plan</span>
                        <h4 className="quick-plan-name">Muscle Gain: Gym [Chest & Triceps]</h4>
                        <span className="quick-plan-action">Start Workout →</span>
                      </div>
                    </div>
                  </div>

                  {/* Coach Messenger Card */}
                  <div className="card-premium quick-coach-card" onClick={() => setActiveTab('messages')}>
                    <div className="coach-bubble-header">
                      <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=200" alt="Coach" className="quick-coach-avatar" />
                      <div>
                        <h4 className="quick-coach-name">Coach Support</h4>
                        <span className="quick-coach-status">1 unread message</span>
                      </div>
                    </div>
                    <p className="quick-coach-bubble">
                      "Hey there {user.name}! Welcome to Maxx Fitclub! You've just taken the first step..."
                    </p>
                    <span className="quick-coach-link">Open Chat →</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Workouts Tab */}
          {activeTab === 'workouts' && (
            <div className="tab-pane animate-fade">
              {activeWorkout ? (
                <WorkoutPlayer workout={activeWorkout} onBack={() => setActiveWorkout(null)} />
              ) : (
                <div className="workouts-explorer animate-slide">
                  {/* AI Custom Workout Generator Block */}
                  <div style={{ marginBottom: '32px' }}>
                    <AIWorkoutGenerator onStartWorkout={(workoutObj) => handleSelectWorkout(workoutObj)} />
                  </div>

                  <div className="section-head-row">
                    <h2 className="tab-section-title">Explore Workouts</h2>
                    <span className="results-count">6 routines listed</span>
                  </div>

                  {/* Schedule section */}
                  <div className="workout-category-block">
                    <h3 className="category-block-title">Featured Schedule</h3>
                    <div className="horizontal-slide-row">
                      <div className="card-premium program-slide-card" onClick={() => handleSelectWorkout(workoutsCatalog.intermediate[0])}>
                        <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=400" alt="Endurance" />
                        <div className="slide-card-details">
                          <h4>Strength Endurance Training</h4>
                          <span>8 weeks</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Intermediate list */}
                  <div className="workout-category-block">
                    <h3 className="category-block-title">Intermediate Gym Routines</h3>
                    <div className="catalog-grid">
                      {workoutsCatalog.intermediate.map(w => (
                        <div key={w.id} className="card-premium catalog-item-card" onClick={() => handleSelectWorkout(w)}>
                          <img src={w.img} alt={w.name} className="catalog-item-img" />
                          <div className="catalog-item-info">
                            <h4>{w.name}</h4>
                            <div className="catalog-meta">
                              <span>{w.duration}</span>
                              <span>·</span>
                              <span>{w.difficulty}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Beginners list */}
                  <div className="workout-category-block">
                    <h3 className="category-block-title">Beginner Home Circuits</h3>
                    <div className="catalog-grid">
                      {workoutsCatalog.beginners.map(w => (
                        <div key={w.id} className="card-premium catalog-item-card" onClick={() => handleSelectWorkout(w)}>
                          <img src={w.img} alt={w.name} className="catalog-item-img" />
                          <div className="catalog-item-info">
                            <h4>{w.name}</h4>
                            <div className="catalog-meta">
                              <span>{w.duration}</span>
                              <span>·</span>
                              <span>{w.difficulty}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Nutrition Tab */}
          {activeTab === 'nutrition' && (
            <div className="tab-pane animate-fade">
              <div className="nutrition-portal-wrap animate-slide">
                <div className="section-head-row">
                  <h2 className="tab-section-title">6-Week PCOS Nutrition</h2>
                  <div className="portal-plan-tag">
                    <span className="plan-badge">2,000 - 2,392 cals / day</span>
                  </div>
                </div>

                <div className="meal-plans-interactive-list">
                  <h3 className="meal-week-sub">Week 1 meal schedules</h3>
                  
                  <div className="meals-grid-list">
                    {mealPlansCatalog.map(m => (
                      <div key={m.id} className="card-premium meal-item-card">
                        <div className="meal-pill-header">
                          <span className="meal-day-pill">{m.day}</span>
                          <span className="meal-type-pill">{m.type}</span>
                        </div>
                        <h4 className="meal-item-name">{m.name}</h4>
                        <p className="meal-description">{m.meal}</p>
                        <div className="meal-item-footer">
                          <span className="meal-cal-val">{m.cals} cals</span>
                          <label className="meal-log-checkbox">
                            <input type="checkbox" onChange={(e) => alert(e.target.checked ? 'Meal checked off!' : 'Meal unchecked')} />
                            <span>Log Meal</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="tab-pane animate-fade">
              <CoachChat />
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === 'progress' && (
            <div className="tab-pane animate-fade">
              <ProgressTracker unitSystem={unitSystem} />
            </div>
          )}

          {/* Plans Tab */}
          {activeTab === 'plans' && (
            <div className="tab-pane animate-fade">
              <div className="portal-plans-list animate-slide">
                <h2 className="tab-section-title mb-6">Manage Membership Plans</h2>
                
                <div className="card-premium active-subscription-card">
                  <div className="active-sub-head">
                    <span className="sub-badge-active">Active Plan</span>
                    <h3 className="active-plan-title">Intermediate Monthly Plan</h3>
                  </div>
                  <p className="active-sub-desc">
                    Includes access to all Intermediate gym programs, nutrition calorie guidelines, and online direct messaging with your coach.
                  </p>
                  <div className="active-sub-meta">
                    <div className="sub-meta-pill">
                      <span>Billed Monthly</span>
                      <strong>€24.99/mo</strong>
                    </div>
                    <div className="sub-meta-pill">
                      <span>Renewal Date</span>
                      <strong>14 Sep 2026</strong>
                    </div>
                  </div>
                  <button className="btn btn-secondary w-full" onClick={() => alert('Upgrade options: Contact your personal coach to request tier adjustments.')}>
                    Upgrade Membership
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Profile & Settings Tab */}
          {activeTab === 'profile' && (
            <div className="tab-pane animate-fade">
              <div className="profile-settings-portal animate-slide">
                {/* User Card */}
                <div className="card-premium profile-intro-card">
                  <div className="profile-main-avatar">
                    {user.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="profile-details-wrap">
                    <h3 className="profile-detail-name">{user.name}</h3>
                    <span className="profile-detail-email">{user.email}</span>
                  </div>
                </div>

                {/* Settings Card 1 */}
                <div className="card-premium settings-card-box">
                  <h4 className="settings-box-title">System Settings</h4>
                  
                  <div className="settings-row-item">
                    <div className="settings-row-info">
                      <span className="settings-row-label">Unit System</span>
                      <span className="settings-row-sub">Select preferred units metric or imperial</span>
                    </div>
                    <div className="tab-container">
                      <button 
                        className={`tab-btn ${unitSystem === 'Metric' ? 'active' : ''}`}
                        onClick={() => setUnitSystem('Metric')}
                      >
                        Metric
                      </button>
                      <button 
                        className={`tab-btn ${unitSystem === 'Imperial' ? 'active' : ''}`}
                        onClick={() => setUnitSystem('Imperial')}
                      >
                        Imperial
                      </button>
                    </div>
                  </div>

                  <div className="settings-row-item">
                    <div className="settings-row-info">
                      <span className="settings-row-label">Connected Apps</span>
                      <span className="settings-row-sub">Sync metrics with Apple Health and others</span>
                    </div>
                    <div className="connected-apps-toggles">
                      <label className="toggle-label-row">
                        <input 
                          type="checkbox" 
                          checked={connectedApps.appleHealth} 
                          onChange={() => toggleAppConnection('appleHealth')} 
                        />
                        <span>Apple Health</span>
                      </label>
                      <label className="toggle-label-row">
                        <input 
                          type="checkbox" 
                          checked={connectedApps.myFitnessPal} 
                          onChange={() => toggleAppConnection('myFitnessPal')} 
                        />
                        <span>MyFitnessPal</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Settings Card 2 */}
                <div className="card-premium settings-card-box">
                  <h4 className="settings-box-title">Account Security</h4>
                  <button className="btn btn-tertiary w-full justify-between" onClick={() => alert('Change password email sent!')}>
                    <span>Change Password</span>
                    <ChevronRight size={16} />
                  </button>
                </div>

                <button className="btn btn-secondary w-full logout-btn-portal" onClick={onLogout}>
                  <LogOut size={16} className="icon-red" />
                  <span>Log Out of Account</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Mobile Sticky Tab bar switcher */}
      <nav className="portal-mobile-navbar">
        {sidebarLinks.slice(0, 6).map(link => {
          const Icon = link.icon;
          return (
            <button
              key={link.id}
              className={`mobile-nav-tab-btn ${activeTab === link.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(link.id);
                setActiveWorkout(null);
              }}
            >
              <div className="mobile-icon-wrap">
                <Icon size={20} />
                {link.badge && <span className="mobile-tab-badge"></span>}
              </div>
              <span className="mobile-tab-label">{link.label}</span>
            </button>
          );
        })}
      </nav>

      <style dangerouslySetInnerHTML={{ __html: `
        .portal-layout {
          display: grid;
          grid-template-columns: 260px 1fr;
          min-height: 100vh;
          background-color: var(--bg-primary);
        }

        /* Sidebar Styling */
        .portal-sidebar {
          background-color: var(--bg-secondary);
          border-right: 1px solid var(--color-border);
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
        }

        .sidebar-logo {
          font-weight: 900;
          font-size: 1.3rem;
          letter-spacing: -0.01em;
          margin-bottom: 32px;
          display: flex;
          gap: 6px;
        }

        .sidebar-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }

        .sidebar-btn {
          width: 100%;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 14px;
          transition: all 0.2s ease;
          position: relative;
        }

        .sidebar-btn:hover {
          color: var(--text-primary);
          background-color: var(--bg-card);
        }

        .sidebar-btn.active {
          color: var(--color-accent);
          background-color: var(--bg-card);
          border: 1px solid var(--color-border);
        }

        .sidebar-badge {
          background-color: var(--color-alert-red);
          color: #FFFFFF;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: var(--radius-pill);
          margin-left: auto;
        }

        .sidebar-footer {
          border-top: 1px solid var(--color-border);
          padding-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .sidebar-user-card {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sidebar-user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: var(--bg-active);
          border: 1px solid var(--color-border);
          color: var(--color-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
        }

        .sidebar-user-info {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .sidebar-username {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sidebar-useremail {
          font-size: 0.75rem;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sidebar-logout-btn {
          background: transparent;
          border: 1px solid var(--color-border);
          color: var(--text-secondary);
          padding: 8px;
          border-radius: var(--radius-sm);
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
        }

        .sidebar-logout-btn:hover {
          color: var(--color-alert-red);
          border-color: var(--color-alert-red);
        }

        /* Content Body */
        .portal-content-body {
          padding: 40px 48px;
          overflow-y: auto;
          height: 100vh;
        }

        .portal-mobile-header {
          display: none;
        }

        .portal-router-view {
          max-width: 900px;
          margin: 0 auto;
        }

        /* Greeting row */
        .greeting-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
        }

        .greeting-title {
          font-size: 1.8rem;
          font-weight: 400;
        }

        .greeting-sub {
          font-size: 1rem;
        }

        .plan-badge {
          background-color: rgba(255, 175, 0, 0.1);
          border: 1px solid var(--color-accent);
          color: var(--color-accent);
          padding: 6px 14px;
          border-radius: var(--radius-pill);
          font-size: 0.85rem;
          font-weight: 600;
        }

        /* Dashboard Grid Layout */
        .dashboard-grid-layout {
          display: grid;
          grid-template-columns: 1.8fr 1fr;
          gap: 32px;
        }

        .dashboard-main-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .dashboard-side-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .quick-plan-card, .quick-coach-card {
          padding: 20px;
          cursor: pointer;
        }

        .quick-plan-title {
          font-size: 1rem;
          margin-bottom: 12px;
        }

        .quick-plan-banner {
          position: relative;
          border-radius: var(--radius-md);
          overflow: hidden;
          aspect-ratio: 16/10;
        }

        .quick-plan-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .quick-plan-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 16px;
        }

        .quick-plan-badge {
          font-size: 0.7rem;
          color: var(--color-accent);
          text-transform: uppercase;
          font-weight: 700;
        }

        .quick-plan-name {
          font-size: 0.95rem;
          margin: 2px 0 6px 0;
        }

        .quick-plan-action {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-accent);
        }

        .coach-bubble-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .quick-coach-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
        }

        .quick-coach-name {
          font-size: 0.95rem;
          font-weight: 700;
        }

        .quick-coach-status {
          font-size: 0.75rem;
          color: var(--color-accent);
        }

        .quick-coach-bubble {
          font-size: 0.85rem;
          color: var(--text-secondary);
          background-color: var(--bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: 12px;
          padding: 10px 14px;
          margin-bottom: 12px;
          line-height: 1.4;
          font-style: italic;
        }

        .quick-coach-link {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--color-accent);
        }

        /* Workouts Catalogue Explorer */
        .section-head-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 16px;
          margin-bottom: 24px;
        }

        .tab-section-title {
          font-size: 1.4rem;
          font-weight: 800;
        }

        .results-count {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .workout-category-block {
          margin-bottom: 32px;
        }

        .category-block-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .program-slide-card {
          padding: 0;
          display: flex;
          flex-direction: column;
          max-width: 280px;
          cursor: pointer;
        }

        .program-slide-card img {
          width: 100%;
          aspect-ratio: 16/10;
          object-fit: cover;
        }

        .slide-card-details {
          padding: 16px;
        }

        .slide-card-details h4 {
          font-size: 0.95rem;
          margin-bottom: 4px;
        }

        .slide-card-details span {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .catalog-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        @media (max-width: 600px) {
          .catalog-grid {
            grid-template-columns: 1fr;
          }
        }

        .catalog-item-card {
          padding: 0;
          display: flex;
          gap: 16px;
          align-items: center;
          cursor: pointer;
        }

        .catalog-item-img {
          width: 90px;
          height: 90px;
          object-fit: cover;
          border-radius: var(--radius-md) 0 0 var(--radius-md);
        }

        .catalog-item-info {
          padding: 12px 16px 12px 0;
          flex: 1;
        }

        .catalog-item-info h4 {
          font-size: 0.95rem;
          margin-bottom: 4px;
        }

        .catalog-meta {
          font-size: 0.8rem;
          color: var(--text-secondary);
          display: flex;
          gap: 6px;
        }

        /* Meal Plan Cards Tab */
        .meals-grid-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 16px;
        }

        @media (max-width: 600px) {
          .meals-grid-list {
            grid-template-columns: 1fr;
          }
        }

        .meal-item-card {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .meal-pill-header {
          display: flex;
          gap: 8px;
        }

        .meal-day-pill {
          background-color: var(--bg-active);
          border: 1px solid var(--color-border);
          color: var(--color-accent);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: var(--radius-pill);
        }

        .meal-type-pill {
          background-color: rgba(255,255,255,0.05);
          color: var(--text-primary);
          font-size: 0.75rem;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: var(--radius-pill);
        }

        .meal-item-name {
          font-size: 1.05rem;
          font-weight: 700;
        }

        .meal-description {
          font-size: 0.9rem;
          color: var(--text-secondary);
          flex: 1;
        }

        .meal-item-footer {
          border-top: 1px solid var(--color-border);
          padding-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .meal-cal-val {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 700;
        }

        .meal-log-checkbox {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          cursor: pointer;
        }

        /* Settings settings profile page styling */
        .profile-settings-portal {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .profile-intro-card {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .profile-main-avatar {
          width: 56px;
          height: 56px;
          background-color: var(--bg-active);
          border: 1px solid var(--color-border);
          border-radius: 50%;
          color: var(--color-accent);
          font-size: 1.3rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-detail-name {
          font-size: 1.25rem;
        }

        .profile-detail-email {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .settings-card-box {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .settings-box-title {
          font-size: 0.85rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 8px;
        }

        .settings-row-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 0;
        }

        .settings-row-info {
          display: flex;
          flex-direction: column;
        }

        .settings-row-label {
          font-weight: 700;
          font-size: 0.95rem;
        }

        .settings-row-sub {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .connected-apps-toggles {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .toggle-label-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          cursor: pointer;
        }

        .logout-btn-portal {
          border-color: rgba(255, 77, 77, 0.4);
          color: var(--color-alert-red);
        }

        .logout-btn-portal:hover {
          background-color: rgba(255, 77, 77, 0.05);
          border-color: var(--color-alert-red);
        }

        .icon-red {
          color: var(--color-alert-red);
        }

        /* active sub plan */
        .active-subscription-card {
          border-color: var(--color-accent);
          background-color: rgba(255, 175, 0, 0.02);
        }

        .active-sub-head {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 12px;
        }

        .sub-badge-active {
          align-self: flex-start;
          background-color: var(--color-accent);
          color: #000000;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 2px 10px;
          border-radius: var(--radius-pill);
          text-transform: uppercase;
        }

        .active-sub-desc {
          line-height: 1.5;
          margin-bottom: 20px;
        }

        .active-sub-meta {
          display: flex;
          gap: 20px;
          margin-bottom: 24px;
        }

        .sub-meta-pill {
          flex: 1;
          background-color: var(--bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: 12px;
          display: flex;
          flex-direction: column;
        }

        .sub-meta-pill span {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .sub-meta-pill strong {
          font-size: 1.1rem;
          color: var(--text-primary);
          margin-top: 2px;
        }

        /* Mobile Sticky Footer switcher tab */
        .portal-mobile-navbar {
          display: none;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .portal-layout {
            grid-template-columns: 1fr;
          }
          .portal-sidebar {
            display: none;
          }
          .portal-content-body {
            padding: 20px;
            padding-bottom: 90px;
          }
          .portal-router-view {
            padding: 0 16px;
            box-sizing: border-box;
          }
          .section-head-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .portal-mobile-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: var(--bg-secondary);
            border-bottom: 1px solid var(--color-border);
            padding: 12px 20px;
            margin: -20px -20px 20px -20px;
          }
          .mobile-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-color: var(--bg-active);
            color: var(--color-accent);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 0.8rem;
            cursor: pointer;
          }
          .dashboard-grid-layout {
            grid-template-columns: 1fr;
          }
          .portal-mobile-navbar {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: #0D0D0D;
            border-top: 1px solid var(--color-border);
            z-index: 1000;
            padding: 12px 0;
          }
          .mobile-nav-tab-btn {
            background: transparent;
            border: none;
            color: var(--text-secondary);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            cursor: pointer;
          }
          .mobile-nav-tab-btn.active {
            color: var(--color-accent);
          }
          .mobile-icon-wrap {
            position: relative;
            display: flex;
            align-items: center;
          }
          .mobile-tab-badge {
            position: absolute;
            top: -2px;
            right: -2px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: var(--color-alert-red);
          }
          .mobile-tab-label {
            display: none;
          }
          .active-sub-meta {
            flex-direction: column;
            gap: 12px;
          }
        }
      `}} />
    </div>
  );
}
