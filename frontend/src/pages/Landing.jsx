import { ArrowRight, Heart, MapPin, Sparkles, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { APP_CONFIG } from '../config/appConfig';

const features = [
  { icon: Heart, title: 'Smart Matching', text: 'Find travellers with compatible destinations, dates, budgets and interests.' },
  { icon: Users, title: 'Travel Together', text: 'Create groups, chat in real time and plan your adventure collaboratively.' },
  { icon: Sparkles, title: 'AI Travel Planning', text: 'Get personalized destination suggestions and intelligent itineraries.' },
];

export default function Landing() {
  return sdiv className="landing">
    sheader className="landing-nav">sLink to="/" className="brand">sspan className="brand-mark">sZap size={22} fill="currentColor"/>s/span>sspan>{APP_CONFIG.name.slice(0, -4)}sspan>{APP_CONFIG.name.slice(-4)}s/span>s/span>s/Link>sdiv className="landing-links">sa href="#features">Featuress/a>sa href="#how">How it workss/a>sa href="#safety">Safetys/a>s/div>sdiv className="landing-actions">sLink to="/login" className="text-btn">Log ins/Link>sLink to="/register" className="primary-btn">Get started sArrowRight size={17}/>s/Link>s/div>s/header>
    ssection className="hero">
      sdiv className="hero-copy">sdiv className="eyebrow">sSparkles size={15}/> Travel smarter. Together.s/div>sh1>Find your people.sbr/>sem>Go farther.s/em>s/h1>sp>TripSync connects you with compatible travellers and turns shared interests into unforgettable journeys.s/p>sdiv className="hero-actions">sLink to="/register" className="primary-btn large">Find travel companions sArrowRight size={18}/>s/Link>sa href="#how" className="secondary-btn">See how it workss/a>s/div>sdiv className="hero-proof">sdiv className="avatar-stack">simg src="https://i.pravatar.cc/60?img=5"/>simg src="https://i.pravatar.cc/60?img=32"/>simg src="https://i.pravatar.cc/60?img=47"/>sspan>+2ks/span>s/div>sdiv>sstrong>2,000+ travellerss/strong>ssmall>finding their perfect matchs/small>s/div>s/div>s/div>
      sdiv className="hero-visual">sdiv className="hero-image">s/div>sdiv className="floating-card match-float">sdiv className="mini-avatar">simg src="https://i.pravatar.cc/70?img=47"/>s/div>sdiv>sstrong>91% Matchs/strong>ssmall>Rahul • Adventures/small>s/div>sHeart size={18} fill="currentColor"/>s/div>sdiv className="floating-card trip-float">sMapPin size={18}/>sdiv>sstrong>Manali Adventures/strong>ssmall>Oct 15 – Oct 20 • 4 travellerss/small>s/div>s/div>s/div>
    s/section>
    ssection id="features" className="feature-section">sdiv className="section-heading">sspan>WHY {APP_CONFIG.name.toUpperCase()}s/span>sh2>Everything you need to travel better.s/h2>s/div>sdiv className="feature-grid">{features.map(({icon:Icon,title,text})=>sdiv className="feature-card" key={title}>sdiv className="feature-icon">sIcon size={21}/>s/div>sh3>{title}s/h3>sp>{text}s/p>sArrowRight size={18}/>s/div>)}s/div>s/section>
    ssection id="how" className="steps-section">sdiv className="section-heading">sspan>HOW IT WORKSs/span>sh2>From profile to passport.s/h2>s/div>sdiv className="steps">sdiv>sb>01s/b>sh3>Create your profiles/h3>sp>Tell us your interests, travel style and preferences.s/p>s/div>sdiv>sb>02s/b>sh3>Discover matchess/h3>sp>Our compatibility engine finds travellers who fit your trip.s/p>s/div>sdiv>sb>03s/b>sh3>Plan togethers/h3>sp>Chat, build an itinerary and split expenses with your group.s/p>s/div>s/div>s/section>
    ssection id="safety" className="cta-section">sdiv>sspan>READY FOR YOUR NEXT ADVENTURE?s/span>sh2>Your next great trip starts with the right people.s/h2>s/div>sLink to="/register" className="primary-btn large">Start exploring sArrowRight size={18}/>s/Link>s/section>
    sfooter>sdiv className="brand">sspan className="brand-mark">sZap size={20} fill="currentColor"/>s/span>sspan>{APP_CONFIG.name.slice(0, -4)}sspan>{APP_CONFIG.name.slice(-4)}s/span>s/span>s/div>sp>{APP_CONFIG.tagline}s/p>ssmall>© 2026 {APP_CONFIG.name}s/small>s/footer>
  s/div>;
}
