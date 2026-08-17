import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PortalLayout from './components/PortalLayout';
import ScrollHero from './components/ScrollHero';
import { translations } from './utils/translations';
import { Play, ArrowRight, Check, MessageSquare, ChevronRight, Lock, Dumbbell, ShieldCheck, Download, Mail, Smartphone } from 'lucide-react';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('home'); // home, programs, nutrition, coaching, plans, about
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [language, setLanguage] = useState('en');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const t = (key) => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    return key;
  };

  // Auto-scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentRoute, showPortal]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      setAuthError('Please fill in all credentials.');
      return;
    }
    
    // Simulate login
    setIsLoggedIn(true);
    setAuthError('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowPortal(false);
    setAuthEmail('');
    setAuthPassword('');
  };

  // Switch public layout VS member dashboard layout
  if (showPortal) {
    if (!isLoggedIn) {
      // Premium Login Form
      return (
        <div className="login-wrapper animate-fade">
          <div className="login-card card-premium animate-slide">
            <div className="login-header">
              <span className="logo-maxx">MAXX</span>
              <span className="logo-fit">FIT CLUB</span>
              <h2>Member Access</h2>
              <p>Log in to view workouts, track nutrition, and message your coach.</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="login-form">
              {authError && <div className="auth-error-msg">{authError}</div>}
              
              <div className="input-group">
                <label className="input-label">Email Address</label>
                <input
                  type="email"
                  className="input-premium"
                  placeholder="name@example.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Password</label>
                <input
                  type="password"
                  className="input-premium"
                  placeholder="••••••••"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-full mt-4">
                Sign In
              </button>
            </form>

            <div className="login-demo-helper">
              <span className="helper-title">Demo Credentials</span>
              <p>Enter any email and password to log in and explore the portal.</p>
            </div>

            <button className="btn btn-secondary w-full" onClick={() => setShowPortal(false)}>
              Back to Marketing Site
            </button>
          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            .login-wrapper {
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: var(--bg-primary);
              padding: 24px;
            }
            .login-card {
              width: 100%;
              max-width: 440px;
              display: flex;
              flex-direction: column;
              gap: 24px;
            }
            .login-header {
              text-align: center;
            }
            .login-header h2 {
              font-size: 1.6rem;
              margin-top: 14px;
              margin-bottom: 6px;
            }
            .login-header p {
              font-size: 0.9rem;
            }
            .login-form {
              display: flex;
              flex-direction: column;
              gap: 16px;
            }
            .auth-error-msg {
              background-color: rgba(255, 77, 77, 0.15);
              border: 1px solid var(--color-alert-red);
              color: var(--color-alert-red);
              border-radius: var(--radius-sm);
              padding: 10px;
              font-size: 0.85rem;
              font-weight: 600;
              text-align: center;
            }
            .login-demo-helper {
              background-color: var(--bg-secondary);
              border: 1px solid var(--color-border);
              border-radius: var(--radius-md);
              padding: 16px;
              font-size: 0.85rem;
            }
            .helper-title {
              display: block;
              font-weight: 700;
              color: var(--color-accent);
              margin-bottom: 4px;
            }
            .login-demo-helper p {
              font-size: 0.85rem;
            }
          `}} />
        </div>
      );
    }

    // Portal view
    return (
      <PortalLayout
        user={{ name: authEmail.split('@')[0] || 'vaibhav', email: authEmail || 'vaibhavjain7890@gmail.com' }}
        onLogout={handleLogout}
      />
    );
  }

  // Otherwise, Marketing public views
  return (
    <div className="marketing-wrapper">
      <Navbar
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
        isLoggedIn={isLoggedIn}
        togglePortal={() => setShowPortal(true)}
        language={language}
        setLanguage={setLanguage}
        t={t}
      />

      {/* Main marketing subpages */}
      <main className="marketing-content">
        
        {/* HOME SUBPAGE */}
        {currentRoute === 'home' && (
          <div className="subpage-pane">
            
            {/* HERO SECTION */}
            <ScrollHero setCurrentRoute={setCurrentRoute} language={language} />

            {/* PERSONALIZED FITNESS SECTION */}
            <section className="personal-fitness-section section-spacing">
              <div className="container personal-grid">
                <div className="personal-visual">
                  <img 
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800" 
                    alt="Cinematic Personal Trainer Lifting weights" 
                    className="personal-img"
                  />
                </div>
                <div className="personal-content">
                  <span className="section-badge">{t('trulyPersonal')}</span>
                  <h2 className="section-title">{t('personalJourneyTitle')}</h2>
                  <p className="section-desc">
                    {t('personalJourneyDesc')}
                  </p>
                  <button className="link-action text-lg" onClick={() => setCurrentRoute('about')}>
                    <span>{t('learnMore')}</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </section>

            {/* PROGRAMS TEASER SECTION */}
            <section className="programs-teaser-section section-spacing">
              <div className="container">
                <div className="teaser-heading-row">
                  <h2 className="section-title">{t('exploreYourTraining')}</h2>
                  <button className="btn btn-secondary" onClick={() => setCurrentRoute('programs')}>
                    {t('viewAllPrograms')}
                  </button>
                </div>

                <div className="teaser-grid">
                  <div className="card-premium program-teaser-card pulse-hover" onClick={() => setCurrentRoute('programs')}>
                    <div className="teaser-img-wrap">
                      <img src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400" alt="Beginner" />
                      <div className="lock-overlay"><Lock size={20} /></div>
                    </div>
                    <div className="teaser-body">
                      <span className="teaser-card-badge">Beginner</span>
                      <h3>Beginner Fat Loss: Home Circuit</h3>
                      <p>Unlock structured full-body metabolic conditioning without equipment limitations.</p>
                      <span className="teaser-card-action">Unlock Program →</span>
                    </div>
                  </div>

                  <div className="card-premium program-teaser-card pulse-hover" onClick={() => setCurrentRoute('programs')}>
                    <div className="teaser-img-wrap">
                      <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=400" alt="Intermediate" />
                      <div className="lock-overlay"><Lock size={20} /></div>
                    </div>
                    <div className="teaser-body">
                      <span className="teaser-card-badge">Intermediate</span>
                      <h3>Muscle Gain: Gym [Chest & Triceps]</h3>
                      <p>Focused split routines designed to build maximum upper-body density with weights.</p>
                      <span className="teaser-card-action">Unlock Program →</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* COACHING PREVIEW HIGHLIGHT */}
            <section className="coaching-highlight-section section-spacing">
              <div className="container coaching-highlight-grid">
                <div className="coaching-highlight-content">
                  <span className="section-badge">{t('directCommunication')}</span>
                  <h2 className="section-title">{t('coachReachTitle')}</h2>
                  <p className="section-desc">
                    {t('coachReachDesc')}
                  </p>
                  <button className="btn btn-primary" onClick={() => setCurrentRoute('coaching')}>
                    {t('talkToCoach')}
                  </button>
                </div>
                <div className="coaching-mock-ui">
                  {/* Simulated App Messages Interface */}
                  <div className="chat-preview-box">
                    <div className="preview-chat-head">
                      <div className="preview-avatar">FP</div>
                      <div>
                        <strong>FitClub Pro</strong>
                        <span>Coach Support</span>
                      </div>
                    </div>
                    <div className="preview-chat-body">
                      <div className="preview-bubble preview-bubble-coach">
                        Hey there! Welcome to Maxx Fitclub! Ready to lock in your targets today?
                      </div>
                      <div className="preview-bubble preview-bubble-user">
                        Hi coach! Ready to hit Chest and Triceps today.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* APP PROMOTION SECTION */}
            <section className="app-promotion-section section-spacing">
              <div className="container app-promo-container card-premium">
                <div className="app-promo-content">
                  <h2>{t('appPromotionTitle')}</h2>
                  <p>
                    {t('appPromotionDesc')}
                  </p>
                  <div className="promo-badges">
                    <button className="btn btn-secondary justify-between" onClick={() => alert('Redirecting to Apple App Store...')}>
                      <Smartphone size={18} />
                      <span>{t('appStoreDownload')}</span>
                    </button>
                    <button className="btn btn-secondary justify-between" onClick={() => alert('Redirecting to Google Play Store...')}>
                      <Play size={18} />
                      <span>{t('googlePlayDownload')}</span>
                    </button>
                  </div>
                </div>
                <div className="app-promo-visual">
                  <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400" alt="Mobile app frames" className="promo-screen-img" />
                </div>
              </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="testimonials-section section-spacing">
              <div className="container">
                <h2 className="section-title text-center mb-12">{t('testimonialsTitle')}</h2>
                
                <div className="testimonials-grid">
                  <div className="card-premium testimonial-card">
                    <div className="testimonial-header">
                      <div className="test-avatar">VJ</div>
                      <div>
                        <h4>Vaibhav Jain</h4>
                        <span className="test-result">Lost 12kg · Muscle Gain</span>
                      </div>
                    </div>
                    <p className="testimonial-text">
                      "Maxx Fit Club completely rebuilt my approach to health. The workouts are highly structured, but the true game changer is having my coach answer my nutrition queries daily. Highly recommend!"
                    </p>
                  </div>

                  <div className="card-premium testimonial-card">
                    <div className="testimonial-header">
                      <div className="test-avatar">SK</div>
                      <div>
                        <h4>Siddharth K.</h4>
                        <span className="test-result">Stamina Boost · Body Recomp</span>
                      </div>
                    </div>
                    <p className="testimonial-text">
                      "The mobile app experience is incredible, but having access to this desktop web portal makes tracking meal macros and entering measurements after gym sessions exceptionally fluid."
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* PROGRAMS PAGE */}
        {currentRoute === 'programs' && (
          <section className="subpage-pane container section-spacing animate-fade">
            <h1 className="subpage-title mb-4">{t('programsTitle')}</h1>
            <p className="subpage-sub mb-12">{t('programsSub')}</p>

            <div className="marketing-programs-categories">
              <div className="category-block">
                <h2 className="category-title mb-6">{t('beginnerClasses')}</h2>
                <div className="programs-grid">
                  <div className="card-premium program-teaser-card">
                    <div className="teaser-img-wrap">
                      <img src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400" alt="Beginner fat loss" />
                      <div className="lock-overlay"><Lock size={20} /></div>
                    </div>
                    <div className="teaser-body">
                      <h3>Beginner Fat Loss: Home Circuit</h3>
                      <p>{t('duration')}: 40-45 mins · {t('target')}: Full Body</p>
                      <button className="btn btn-secondary w-full mt-4" onClick={() => setShowPortal(true)}>{t('unlockMembership')}</button>
                    </div>
                  </div>
                  <div className="card-premium program-teaser-card">
                    <div className="teaser-img-wrap">
                      <img src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=400" alt="Beginner stretch" />
                      <div className="lock-overlay"><Lock size={20} /></div>
                    </div>
                    <div className="teaser-body">
                      <h3>Full Body Stretch & Mobility</h3>
                      <p>{t('duration')}: 4 mins · {t('target')}: Stretching</p>
                      <button className="btn btn-secondary w-full mt-4" onClick={() => setShowPortal(true)}>{t('unlockMembership')}</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="category-block mt-12">
                <h2 className="category-title mb-6">{t('intermediateClasses')}</h2>
                <div className="programs-grid">
                  <div className="card-premium program-teaser-card">
                    <div className="teaser-img-wrap">
                      <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=400" alt="Gym split" />
                      <div className="lock-overlay"><Lock size={20} /></div>
                    </div>
                    <div className="teaser-body">
                      <h3>Muscle Gain: Gym [Chest & Triceps]</h3>
                      <p>{t('duration')}: 1 hr · {t('target')}: Chest, Arms</p>
                      <button className="btn btn-secondary w-full mt-4" onClick={() => setShowPortal(true)}>{t('unlockMembership')}</button>
                    </div>
                  </div>
                  <div className="card-premium program-teaser-card">
                    <div className="teaser-img-wrap">
                      <img src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=400" alt="legs" />
                      <div className="lock-overlay"><Lock size={20} /></div>
                    </div>
                    <div className="teaser-body">
                      <h3>Intermediate Fat Loss: Gym [Legs]</h3>
                      <p>{t('duration')}: 1 hr · {t('target')}: Legs, Glutes</p>
                      <button className="btn btn-secondary w-full mt-4" onClick={() => setShowPortal(true)}>{t('unlockMembership')}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* NUTRITION PAGE */}
        {currentRoute === 'nutrition' && (
          <section className="subpage-pane container section-spacing animate-fade">
            <h1 className="subpage-title mb-4">{t('nutritionTitle')}</h1>
            <p className="subpage-sub mb-12">{t('nutritionSub')}</p>

            <div className="nutrition-showcase-grid">
              <div className="card-premium food-card">
                <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400" alt="Training Day Food" className="food-img" />
                <div className="food-body">
                  <span className="food-cal-badge">1,892 {t('caloriesPerDay')}</span>
                  <h3>Training Days Nutrition Plan</h3>
                  <p>Higher carb density to replenish glycogen reserves after heavy lifting workouts.</p>
                  <button className="btn btn-secondary w-full mt-4" onClick={() => setShowPortal(true)}>{t('viewMealOptions')}</button>
                </div>
              </div>

              <div className="card-premium food-card">
                <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400" alt="Low Carb Diet" className="food-img" />
                <div className="food-body">
                  <span className="food-cal-badge">1,570 {t('caloriesPerDay')}</span>
                  <h3>Low Carbs / Fat Loss Diet</h3>
                  <p>Ketogenic-aligned meals featuring eggs, avocado slices, grilled poultry, and vegetables.</p>
                  <button className="btn btn-secondary w-full mt-4" onClick={() => setShowPortal(true)}>{t('viewMealOptions')}</button>
                </div>
              </div>

              <div className="card-premium food-card">
                <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400" alt="PCOS nutrition" className="food-img" />
                <div className="food-body">
                  <span className="food-cal-badge">2,392 {t('caloriesPerDay')}</span>
                  <h3>6-Week PCOS Nutrition Plan</h3>
                  <p>Tailored schedules designed to optimize insulin sensitivity and physical energy levels.</p>
                  <button className="btn btn-secondary w-full mt-4" onClick={() => setShowPortal(true)}>{t('viewMealOptions')}</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* PLANS PAGE */}
        {currentRoute === 'plans' && (
          <section className="subpage-pane container section-spacing animate-fade">
            <h1 className="subpage-title mb-4">{t('membershipPlans')}</h1>
            <p className="subpage-sub mb-12">{t('selectMembership')}</p>

            <div className="plans-grid-pricing">
              {/* Entry */}
              <div className="card-premium price-card">
                <div className="price-header">
                  <span className="badge-recommend">{t('starterOption')}</span>
                  <h3>{t('entryPlanTitle')}</h3>
                  <p>{t('entryPlanDesc')}</p>
                </div>
                <div className="price-box">
                  <div className="price-vals">
                    <span className="price-old">{t('entryPlanPriceOld')}</span>
                    <span className="price-main">{t('entryPlanPriceMain')}</span>
                    <span className="price-period">{t('entryPlanPricePeriod')}</span>
                  </div>
                  <span className="price-trial-tag">{t('entryPlanTrial')}</span>
                </div>
                <button className="btn btn-primary w-full mt-6" onClick={() => setShowPortal(true)}>
                  {t('entryPlanBtn')}
                </button>
              </div>

              {/* Intermediate */}
              <div className="card-premium price-card recommended-card">
                <div className="price-header">
                  <span className="badge-recommend recommendation-yellow">{t('mostPopular')}</span>
                  <h3>{t('interPlanTitle')}</h3>
                  <p>{t('interPlanDesc')}</p>
                </div>
                <div className="price-box">
                  <div className="price-vals">
                    <span className="price-old">{t('interPlanPriceOld')}</span>
                    <span className="price-main">{t('interPlanPriceMain')}</span>
                    <span className="price-period">{t('interPlanPricePeriod')}</span>
                  </div>
                  <span className="price-trial-tag">{t('interPlanTrial')}</span>
                </div>
                <button className="btn btn-primary w-full mt-6" onClick={() => setShowPortal(true)}>
                  {t('interPlanBtn')}
                </button>
              </div>

              {/* Advanced */}
              <div className="card-premium price-card">
                <div className="price-header">
                  <span className="badge-recommend">{t('proOption')}</span>
                  <h3>{t('advPlanTitle')}</h3>
                  <p>{t('advPlanDesc')}</p>
                </div>
                <div className="price-box">
                  <div className="price-vals">
                    <span className="price-old">{t('advPlanPriceOld')}</span>
                    <span className="price-main">{t('advPlanPriceMain')}</span>
                    <span className="price-period">{t('advPlanPricePeriod')}</span>
                  </div>
                  <span className="price-trial-tag">{t('advPlanTrial')}</span>
                </div>
                <button className="btn btn-primary w-full mt-6" onClick={() => setShowPortal(true)}>
                  {t('advPlanBtn')}
                </button>
              </div>

              {/* Customised */}
              <div className="card-premium price-card">
                <div className="price-header">
                  <span className="badge-recommend">{t('customisedOption')}</span>
                  <h3>{t('customPlanTitle')}</h3>
                  <p>{t('customPlanDesc')}</p>
                </div>
                <div className="price-box">
                  <div className="price-vals">
                    <span className="price-main">{t('customPlanPriceMain')}</span>
                    <span className="price-period">{t('customPlanPricePeriod')}</span>
                  </div>
                  <span className="price-trial-tag">{t('customPlanTrial')}</span>
                </div>
                <button className="btn btn-primary w-full mt-6" onClick={() => setShowPortal(true)}>
                  {t('customPlanBtn')}
                </button>
              </div>

              {/* Elite */}
              <div className="card-premium price-card">
                <div className="price-header">
                  <span className="badge-recommend">{t('completeCoaching')}</span>
                  <h3>{t('elitePlanTitle')}</h3>
                  <p>{t('elitePlanDesc')}</p>
                </div>
                <div className="price-box">
                  <div className="price-vals">
                    <span className="price-main">{t('elitePlanPriceMain')}</span>
                    <span className="price-period">{t('elitePlanPricePeriod')}</span>
                  </div>
                  <span className="price-trial-tag">{t('elitePlanTrial')}</span>
                </div>
                <button className="btn btn-primary w-full mt-6" onClick={() => setShowPortal(true)}>
                  {t('elitePlanBtn')}
                </button>
              </div>
            </div>

            <div className="restore-purchases-box">
              <p>{t('restorePurchasesTitle')}</p>
              <button className="link-action font-bold mt-2" onClick={() => alert('Restore Purchases initialized. Please check your email credentials.')}>
                <span>{t('restorePurchasesBtn')}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </section>
        )}

        {/* COACHING PAGE */}
        {currentRoute === 'coaching' && (
          <section className="subpage-pane container section-spacing animate-fade">
            <div className="coaching-landing-grid">
              <div className="coaching-landing-content">
                <span className="section-badge">Certified Personal Trainers</span>
                <h1 className="mb-4">Professional guidance inside your browser.</h1>
                <p className="mb-6">
                  Every subscription gives you access to online chat support with a qualified personal trainer. No bot replies, no generic scripts. Real coaches who review metrics, update plans, and keep you accountable.
                </p>
                <div className="coaching-benefits-list">
                  <div className="benefit-item">
                    <Check size={18} className="icon-yellow" />
                    <span>Direct messaging support (under 4-hour response latency)</span>
                  </div>
                  <div className="benefit-item">
                    <Check size={18} className="icon-yellow" />
                    <span>Weekly progress form checks & weights tracking checks</span>
                  </div>
                  <div className="benefit-item">
                    <Check size={18} className="icon-yellow" />
                    <span>Form analysis review (Upload short execution clips)</span>
                  </div>
                </div>
                <button className="btn btn-primary mt-8" onClick={() => setShowPortal(true)}>
                  Enter Chat Portal
                </button>
              </div>

              <div className="coaching-landing-visual">
                <img src="https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=600" alt="Coach posing" className="coaching-coach-img" />
              </div>
            </div>
          </section>
        )}

        {/* ABOUT PAGE */}
        {currentRoute === 'about' && (
          <section className="subpage-pane container section-spacing animate-fade">
            <div className="about-content-wrapper">
              <h1 className="mb-6">About Maxx Fit Club</h1>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Maxx Fit Club is a premium athletic fitness brand. We do not support generic, template-driven bodybuilding gyms. We help individuals unlock sustainable, science-based health transformations through:
              </p>

              <div className="about-pillars-grid">
                <div className="card-premium pillar-card">
                  <Dumbbell size={32} className="icon-yellow mb-4" />
                  <h3>Tailored Strength</h3>
                  <p>Workouts engineered specifically around your capability, equipment availability, and target metrics.</p>
                </div>

                <div className="card-premium pillar-card">
                  <ShieldCheck size={32} className="icon-yellow mb-4" />
                  <h3>Structured Nutrition</h3>
                  <p>Flexible calorie scheduling (low carb, high carb days) targeting PCOS resistance, insulin control, and muscle recovery.</p>
                </div>

                <div className="card-premium pillar-card">
                  <MessageSquare size={32} className="icon-yellow mb-4" />
                  <h3>Trainer Accountability</h3>
                  <p>Continuous direct messaging with certified fitness advisors to adjust weights, check off sets, and motivate you.</p>
                </div>
              </div>
            </div>
          </section>
        )}

      </main>

      <Footer setCurrentRoute={setCurrentRoute} />

      <style dangerouslySetInnerHTML={{ __html: `
        /* Marketing layouts spacing and styling */
        .marketing-wrapper {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .marketing-content {
          padding-top: 80px; /* Offset sticky header */
        }

        /* Hero Section styles */
        .hero-section {
          padding: 80px 0;
          background: radial-gradient(circle at 70% 30%, rgba(255,175,0,0.06) 0%, transparent 60%);
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .hero-title {
          font-size: clamp(2.8rem, 6vw, 4.5rem);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.03em;
        }

        .hero-subtitle {
          font-size: clamp(1.2rem, 2vw, 1.5rem);
          line-height: 1.4;
          color: var(--text-secondary);
        }

        .hero-actions {
          display: flex;
          gap: 16px;
        }

        .app-download-badges-row {
          border-top: 1px solid var(--color-border);
          padding-top: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .badge-promo-text {
          font-size: 0.85rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .badges-flex {
          display: flex;
          gap: 12px;
        }

        .badge-item {
          background-color: var(--bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: 6px 12px;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .hero-visual {
          display: flex;
          justify-content: center;
        }

        .device-frame-wrapper {
          position: relative;
          width: 320px;
          aspect-ratio: 9/18;
          border-radius: 40px;
          border: 8px solid var(--bg-card);
          overflow: hidden;
          background-color: #000000;
          box-shadow: 0 24px 80px rgba(0,0,0,0.8), 0 0 40px rgba(255,175,0,0.1);
        }

        .hero-smartphone-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .device-overlay-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, rgba(255,175,0,0.05) 0%, transparent 100%);
          pointer-events: none;
        }

        /* Personal Fitness Section styling */
        .personal-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: center;
        }

        .personal-visual {
          width: 100%;
          aspect-ratio: 1/1;
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--color-border);
        }

        .personal-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .personal-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: flex-start;
        }

        .section-badge {
          background-color: var(--bg-secondary);
          border: 1px solid var(--color-border);
          color: var(--color-accent);
          font-size: 0.8rem;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: var(--radius-pill);
          text-transform: uppercase;
        }

        .section-title {
          font-size: 2.2rem;
          line-height: 1.2;
        }

        .section-desc {
          font-size: 1.1rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        /* Programs Teaser styling */
        .teaser-heading-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .teaser-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        .program-teaser-card {
          padding: 0;
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }

        .teaser-img-wrap {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
          width: 100%;
        }

        .teaser-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .program-teaser-card:hover .teaser-img-wrap img {
          transform: scale(1.05);
        }

        .lock-overlay {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(13, 13, 13, 0.75);
          backdrop-filter: blur(4px);
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-accent);
        }

        .teaser-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
        }

        .teaser-card-badge {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--color-accent);
        }

        .teaser-card-action {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-accent);
          margin-top: 10px;
        }

        /* Coaching Teaser styling */
        .coaching-highlight-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .coaching-mock-ui {
          display: flex;
          justify-content: center;
        }

        .chat-preview-box {
          width: 100%;
          max-width: 380px;
          background-color: var(--bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 20px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.6);
        }

        .preview-chat-head {
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 12px;
          margin-bottom: 16px;
        }

        .preview-avatar {
          width: 36px;
          height: 36px;
          background-color: var(--bg-active);
          border-radius: 50%;
          color: var(--color-accent);
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
        }

        .preview-chat-head div {
          display: flex;
          flex-direction: column;
        }

        .preview-chat-head span {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .preview-chat-body {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .preview-bubble {
          padding: 12px 14px;
          border-radius: 16px;
          font-size: 0.85rem;
          max-width: 85%;
          line-height: 1.4;
        }

        .preview-bubble-coach {
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          border: 1px solid var(--color-border);
          border-bottom-left-radius: 4px;
          align-self: flex-start;
        }

        .preview-bubble-user {
          background-color: var(--bg-active);
          color: var(--text-primary);
          border-bottom-right-radius: 4px;
          align-self: flex-end;
        }

        /* App promo section */
        .app-promo-container {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 40px;
          align-items: center;
          padding: 48px;
          background-color: var(--bg-secondary);
        }

        .app-promo-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: flex-start;
        }

        .promo-badges {
          display: flex;
          gap: 16px;
          width: 100%;
        }

        .promo-badges .btn {
          flex: 1;
          font-size: 0.85rem;
          max-width: 220px;
          padding: 12px 16px;
        }

        .app-promo-visual {
          display: flex;
          justify-content: center;
        }

        .promo-screen-img {
          width: 100%;
          max-width: 260px;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.6);
        }

        /* Testimonials */
        .testimonials-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        .testimonial-card {
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .testimonial-header {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .test-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: var(--bg-active);
          color: var(--color-accent);
          font-weight: 800;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .testimonial-header h4 {
          font-size: 1rem;
        }

        .test-result {
          font-size: 0.8rem;
          color: var(--color-accent);
          font-weight: 600;
        }

        .testimonial-text {
          font-size: 1rem;
          font-style: italic;
          line-height: 1.6;
        }

        /* Subpages titles details */
        .subpage-title {
          font-size: clamp(2rem, 4vw, 3rem);
          text-align: center;
        }

        .subpage-sub {
          font-size: 1.1rem;
          color: var(--text-secondary);
          text-align: center;
          max-width: 600px;
          margin: 0 auto 48px auto;
        }

        /* Programs categories list on public subpage */
        .programs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }

        @media (max-width: 600px) {
          .programs-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Nutrition showcase public subpage */
        .nutrition-showcase-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        @media (max-width: 900px) {
          .nutrition-showcase-grid {
            grid-template-columns: 1fr;
          }
        }

        .food-card {
          padding: 0;
          display: flex;
          flex-direction: column;
        }

        .food-img {
          width: 100%;
          aspect-ratio: 16/10;
          object-fit: cover;
          border-radius: var(--radius-lg) var(--radius-lg) 0 0;
        }

        .food-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
          flex: 1;
        }

        .food-cal-badge {
          background-color: var(--bg-secondary);
          color: var(--color-accent);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 2px 10px;
          border-radius: var(--radius-pill);
          border: 1px solid var(--color-border);
        }

        /* Plans Catalog grid on pricing subpage */
        .plans-grid-pricing {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        @media (max-width: 900px) {
          .plans-grid-pricing {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .plans-grid-pricing {
            grid-template-columns: 1fr;
          }
        }

        .price-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 32px;
        }

        .recommended-card {
          border-color: var(--color-accent);
          background-color: rgba(255,175,0,0.02);
          transform: translateY(-8px);
        }

        .recommended-card:hover {
          border-color: var(--color-accent);
        }

        .price-header {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 24px;
        }

        .badge-recommend {
          align-self: flex-start;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          background-color: var(--bg-secondary);
          border: 1px solid var(--color-border);
          color: var(--text-secondary);
          padding: 2px 10px;
          border-radius: var(--radius-pill);
        }

        .recommendation-yellow {
          background-color: var(--color-accent);
          color: #000000;
          border-color: var(--color-accent);
        }

        .price-box {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .price-vals {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 6px;
        }

        .price-old {
          text-decoration: line-through;
          font-size: 0.9rem;
          color: var(--text-secondary);
          width: 100%;
        }

        .price-main {
          font-size: 2rem;
          font-weight: 900;
          color: var(--text-primary);
        }

        .price-period {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .price-trial-tag {
          font-size: 0.8rem;
          color: var(--color-accent);
          font-weight: 600;
        }

        .restore-purchases-box {
          text-align: center;
          margin-top: 48px;
          border-top: 1px solid var(--color-border);
          padding-top: 32px;
        }

        /* Coaching landing layout */
        .coaching-landing-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .coaching-benefits-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 24px;
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 500;
        }

        .coaching-coach-img {
          width: 100%;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
        }

        /* About Us Pillars */
        .about-pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-top: 48px;
        }

        @media (max-width: 900px) {
          .about-pillars-grid {
            grid-template-columns: 1fr;
          }
        }

        .pillar-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 32px 24px;
        }

        /* Global Responsiveness */
        @media (max-width: 900px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 40px;
          }
          .hero-actions {
            justify-content: center;
          }
          .app-download-badges-row {
            justify-content: center;
          }
          .personal-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .personal-content {
            align-items: center;
            text-align: center;
          }
          .coaching-highlight-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .coaching-highlight-content {
            text-align: center;
            align-items: center;
          }
          .app-promo-container {
            grid-template-columns: 1fr;
            padding: 32px;
            text-align: center;
          }
          .app-promo-content {
            align-items: center;
          }
          .promo-badges {
            justify-content: center;
          }
          .teaser-heading-row {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }
          .teaser-grid {
            grid-template-columns: 1fr;
          }
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
          .coaching-landing-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .coaching-benefits-list {
            align-items: center;
          }
        }
      `}} />
    </div>
  );
}
