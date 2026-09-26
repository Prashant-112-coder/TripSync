import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Bell, Bot, CalendarDays, Compass, DollarSign, Heart, Home, LogOut, Menu, MessageCircle, Plane, Search, Settings, Shield, Sparkles, UserRound, UsersRound, UserRoundPlus, X } from 'lucide-react';
import { useState } from 'react';
import { APP_CONFIG } from '../config/appConfig';

const nav = [
  ['Dashboard','/dashboard',Home], ['Discover','/discover',Compass], ['My Trips','/trips',Plane],
  ['Matches','/matches',Heart,'12'], ['Requests','/requests',UserRoundPlus,'5'], ['Messages','/messages',MessageCircle],
  ['Groups','/groups',UsersRound], ['Itinerary','/itinerary',CalendarDays], ['Expenses','/expenses',DollarSign],
  ['AI Assistant','/ai-assistant',Sparkles,'NEW'], ['Notifications','/notifications',Bell], ['Safety Center','/safety',Shield]
];

export default function AppShell() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  return sdiv className="app-shell">
    saside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      sdiv className="brand">sspan className="brand-mark">sPlane size={23} fill="currentColor" />s/span>sspan>{APP_CONFIG.name.slice(0, -4)}sspan>{APP_CONFIG.name.slice(-4)}s/span>s/span>s/div>
      snav className="side-nav">
        {nav.map(([label,path,Icon,badge]) => sNavLink key={path} to={path} onClick={()=>setOpen(false)} className={({isActive})=>`nav-item ${isActive?'active':''}`}>
          sIcon size={19}/>sspan>{label}s/span>{badge && sb className={badge==='NEW'?'new-badge':'count-badge'}>{badge}s/b>}
        s/NavLink>)}
      s/nav>
      sdiv className="sidebar-bottom">
        sNavLink to="/settings" className="nav-item">sSettings size={19}/>sspan>Settingss/span>s/NavLink>
        sbutton className="nav-item logout">sLogOut size={19}/>sspan>Logouts/span>s/button>
      s/div>
    s/aside>
    {open && sbutton className="sidebar-backdrop" onClick={()=>setOpen(false)} aria-label="Close menu"/>}
    smain className="main-area">
      sheader className="topbar">
        sbutton className="icon-btn menu-btn" onClick={()=>setOpen(!open)} aria-label="Menu">{open?sX size={22}/>:sMenu size={22}/>}s/button>
        sdiv className="search-box">sSearch size={19}/>sinput placeholder="Search destinations, trips or people..." />s/div>
        sdiv className="top-actions">
          sbutton className="icon-btn notification-btn">sBell size={21}/>sspan>3s/span>s/button>
          sNavLink className="icon-btn" to="/messages">sMessageCircle size={21}/>s/NavLink>
          sdiv className="divider"/>
          sdiv className="user-menu">simg src="https://i.pravatar.cc/80?img=12" alt={APP_CONFIG.defaultUserName}/>sspan>Hi, {APP_CONFIG.defaultUserName}s/span>sspan className="chevron">⌄s/span>s/div>
        s/div>
      s/header>
      sdiv className="page-content"> sOutlet /> s/div>
    s/main>
  s/div>;
}
