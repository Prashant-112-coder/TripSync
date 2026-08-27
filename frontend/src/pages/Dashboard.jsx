import { ArrowUpRight, CalendarDays, CheckCircle2, ChevronRight, Heart, MapPin, MessageCircle, Sparkles, Users, WalletCards } from 'lucide-react';

const matches = [
  { name:'Rahul Verma', city:'Bangalore', tags:'Adventure, Trekking, Photography', score:91, img:'https://i.pravatar.cc/100?img=11' },
  { name:'Priya Sharma', city:'Delhi', tags:'Nature, Photography, Camping', score:88, img:'https://i.pravatar.cc/100?img=32' },
  { name:'Aman Singh', city:'Mumbai', tags:'Trekking, Bikes, Music', score:85, img:'https://i.pravatar.cc/100?img=12' },
];

function MatchCard({m}) { return <div className="match-card"><img src={m.img} className="match-avatar"/><div className="match-info"><strong>{m.name}</strong><span>{m.city}</span><small>{m.tags}</small></div><div className="score"><div className="score-ring"><b>{m.score}%</b></div><small>Match</small></div><Heart className="heart" size={18} fill={m.score===91?'currentColor':'none'}/></div>; }

export default function Dashboard() {
  return <div className="dashboard"><div className="welcome"><div><h1>Good morning, Prashant! <span>👋</span></h1><p>Ready for your next adventure?</p></div><button className="ghost-btn"><CalendarDays size={17}/> Oct 2024</button></div>
    <div className="dashboard-grid">
      <section className="main-column">
        <div className="trip-hero"><div className="trip-copy"><span>Upcoming Trip</span><h2>Manali Adventure</h2><p>Oct 15 – Oct 20, 2024</p><div className="trip-meta"><Users size={17}/> 4 Travellers</div><button className="primary-btn">View Trip Details <ArrowUpRight size={16}/></button></div><div className="trip-photo"></div><div className="dots"><i></i><i></i><i></i></div></div>
        <div className="stats-grid"><Stat icon={Users} label="Matches Found" value="32" note="+8 this week" type="green"/><Stat icon={Users} label="Pending Requests" value="5" note="View all" type="purple"/><Stat icon={Users} label="Groups" value="3" note="Active groups" type="orange"/><Stat icon={WalletCards} label="Trips" value="2" note="1 upcoming" type="blue"/></div>
        <div className="lower-grid"><section className="panel activity"><div className="panel-title"><h3>Recent Activity</h3><button>View all</button></div><Activity img="https://i.pravatar.cc/60?img=11" text="Rahul accepted your match request" time="5 minutes ago"/><Activity img="https://i.pravatar.cc/60?img=32" text="You have a new message from Priya" time="20 minutes ago"/><Activity img="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=80&q=70" text="3 new travellers matched with your Manali trip" time="1 hour ago"/></section><section className="panel planner"><div className="panel-title"><h3>Trip Planner</h3></div><p>Complete your trip plan and find the perfect companions.</p><div className="progress-ring"><b>70%</b><span>Completed</span></div><button className="primary-btn">Complete Now</button></section></div>
      </section>
      <aside className="right-column"><section className="panel matches"><div className="panel-title"><h3>Top Matches for You</h3><button>View all</button></div>{matches.map(m=><MatchCard key={m.name} m={m}/>)}</section><section className="panel ai-card"><div className="ai-head"><div><h3>AI Travel Assistant</h3><p>Ask anything about travel, destinations, itineraries or finding travel companions.</p></div><b>NEW</b></div><div className="ai-image"><div className="bot"><BotIcon/></div></div><button className="primary-btn">Chat with AI Assistant <MessageCircle size={16}/></button></section><section className="panel destinations"><div className="panel-title"><h3>Popular Destinations</h3><button>View all</button></div><div className="dest-grid">{[['Manali','https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=220&q=80'],['Goa','https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=220&q=80'],['Ladakh','https://images.unsplash.com/photo-1548013146-72479768bada?w=220&q=80'],['Kerala','https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=220&q=80']].map(([n,src])=><div key={n}><img src={src} alt={n}/><span>{n}</span></div>)}</div></section></aside>
    </div>
  </div>;
}
function Stat({icon:Icon,label,value,note,type}) { return <div className="stat-card"><div className={`stat-icon ${type}`}><Icon size={20}/></div><div><span>{label}</span><strong>{value}</strong><small className={type}>{note}</small></div></div>; }
function Activity({img,text,time}) { return <div className="activity-row"><i></i><img src={img} alt=""/><div><strong>{text}</strong><span>{time}</span></div></div>; }
function BotIcon(){ return <Sparkles size={52}/>; }
