import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Bell, Bot, CalendarDays, Compass, DollarSign, Heart, Home, LogOut, Menu, MessageCircle, Plane, Search, Settings, Shield, Sparkles, UserRound, UsersRound, UserRoundPlus, X } from 'lucide-react';
import { useState } from 'react';

const nav = [
  ['Dashboard','/dashboard',Home], ['Discover','/discover',Compass], ['My Trips','/trips',Plane],
  ['Matches','/matches',Heart,'12'], ['Requests','/requests',UserRoundPlus,'5'], ['Messages','/messages',MessageCircle],
  ['Groups','/groups',UsersRound], ['Itinerary','/itinerary',CalendarDays], ['Expenses','/expenses',DollarSign],
  ['AI Assistant','/ai-assistant',Sparkles,'NEW'], ['Notifications','/notifications',Bell], ['Safety Center','/safety',Shield]
];

export default function AppShell() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  return <div className="app-shell">
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="brand"><span className="brand-mark"><Plane size={23} fill="currentColor" /></span><span>Trip<span>Sync</span></span></div>
      <nav className="side-nav">
        {nav.map(([label,path,Icon,badge]) => <NavLink key={path} to={path} onClick={()=>setOpen(false)} className={({isActive})=>`nav-item ${isActive?'active':''}`}>
          <Icon size={19}/><span>{label}</span>{badge && <b className={badge==='NEW'?'new-badge':'count-badge'}>{badge}</b>}
        </NavLink>)}
      </nav>
      <div className="sidebar-bottom">
        <NavLink to="/settings" className="nav-item"><Settings size={19}/><span>Settings</span></NavLink>
        <button className="nav-item logout"><LogOut size={19}/><span>Logout</span></button>
      </div>
    </aside>
    {open && <button className="sidebar-backdrop" onClick={()=>setOpen(false)} aria-label="Close menu"/>}
    <main className="main-area">
      <header className="topbar">
        <button className="icon-btn menu-btn" onClick={()=>setOpen(!open)} aria-label="Menu">{open?<X size={22}/>:<Menu size={22}/>}</button>
        <div className="search-box"><Search size={19}/><input placeholder="Search destinations, trips or people..." /></div>
        <div className="top-actions">
          <button className="icon-btn notification-btn"><Bell size={21}/><span>3</span></button>
          <NavLink className="icon-btn" to="/messages"><MessageCircle size={21}/></NavLink>
          <div className="divider"/>
          <div className="user-menu"><img src="https://i.pravatar.cc/80?img=12" alt="Prashant"/><span>Hi, Prashant</span><span className="chevron">⌄</span></div>
        </div>
      </header>
      <div className="page-content"> <Outlet /> </div>
    </main>
  </div>;
}
