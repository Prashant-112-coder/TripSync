import { ArrowRight, Heart, MapPin, Sparkles, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  { icon: Heart, title: 'Smart Matching', text: 'Find travellers with compatible destinations, dates, budgets and interests.' },
  { icon: Users, title: 'Travel Together', text: 'Create groups, chat in real time and plan your adventure collaboratively.' },
  { icon: Sparkles, title: 'AI Travel Planning', text: 'Get personalized destination suggestions and intelligent itineraries.' },
];

export default function Landing() {
  return <div className="landing">
    <header className="landing-nav"><Link to="/" className="brand"><span className="brand-mark"><Zap size={22} fill="currentColor"/></span><span>Trip<span>Sync</span></span></Link><div className="landing-links"><a href="#features">Features</a><a href="#how">How it works</a><a href="#safety">Safety</a></div><div className="landing-actions"><Link to="/login" className="text-btn">Log in</Link><Link to="/register" className="primary-btn">Get started <ArrowRight size={17}/></Link></div></header>
    <section className="hero">
      <div className="hero-copy"><div className="eyebrow"><Sparkles size={15}/> Travel smarter. Together.</div><h1>Find your people.<br/><em>Go farther.</em></h1><p>TripSync connects you with compatible travellers and turns shared interests into unforgettable journeys.</p><div className="hero-actions"><Link to="/register" className="primary-btn large">Find travel companions <ArrowRight size={18}/></Link><a href="#how" className="secondary-btn">See how it works</a></div><div className="hero-proof"><div className="avatar-stack"><img src="https://i.pravatar.cc/60?img=5"/><img src="https://i.pravatar.cc/60?img=32"/><img src="https://i.pravatar.cc/60?img=47"/><span>+2k</span></div><div><strong>2,000+ travellers</strong><small>finding their perfect match</small></div></div></div>
      <div className="hero-visual"><div className="hero-image"></div><div className="floating-card match-float"><div className="mini-avatar"><img src="https://i.pravatar.cc/70?img=47"/></div><div><strong>91% Match</strong><small>Rahul • Adventure</small></div><Heart size={18} fill="currentColor"/></div><div className="floating-card trip-float"><MapPin size={18}/><div><strong>Manali Adventure</strong><small>Oct 15 – Oct 20 • 4 travellers</small></div></div></div>
    </section>
    <section id="features" className="feature-section"><div className="section-heading"><span>WHY TRIPSYNC</span><h2>Everything you need to travel better.</h2></div><div className="feature-grid">{features.map(({icon:Icon,title,text})=><div className="feature-card" key={title}><div className="feature-icon"><Icon size={21}/></div><h3>{title}</h3><p>{text}</p><ArrowRight size={18}/></div>)}</div></section>
    <section id="how" className="steps-section"><div className="section-heading"><span>HOW IT WORKS</span><h2>From profile to passport.</h2></div><div className="steps"><div><b>01</b><h3>Create your profile</h3><p>Tell us your interests, travel style and preferences.</p></div><div><b>02</b><h3>Discover matches</h3><p>Our compatibility engine finds travellers who fit your trip.</p></div><div><b>03</b><h3>Plan together</h3><p>Chat, build an itinerary and split expenses with your group.</p></div></div></section>
    <section id="safety" className="cta-section"><div><span>READY FOR YOUR NEXT ADVENTURE?</span><h2>Your next great trip starts with the right people.</h2></div><Link to="/register" className="primary-btn large">Start exploring <ArrowRight size={18}/></Link></section>
    <footer><div className="brand"><span className="brand-mark"><Zap size={20} fill="currentColor"/></span><span>Trip<span>Sync</span></span></div><p>Intelligent travel companion matching & collaborative planning.</p><small>© 2026 TripSync</small></footer>
  </div>;
}
