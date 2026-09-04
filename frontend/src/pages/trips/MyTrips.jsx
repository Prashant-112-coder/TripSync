import { useEffect, useState } from 'react';
import { ArrowRight, CalendarDays, MapPin, Plus, Users, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import './trips.css';

const seedTrips = [{ id: 'demo-1', destination: 'Manali, India', startDate: '2026-10-15', endDate: '2026-10-20', travellersNeeded: 4, budget: '₹5,000 – ₹10,000 / day', travelStyle: 'Adventure', interests: ['Nature', 'Photography'], activities: ['Trekking', 'Sightseeing'], accommodation: 'Hotels / Hostels', description: 'Mountain adventure with great views, local food and trekking.', status: 'upcoming' }];
function formatDate(value) { if (!value) return 'Date not set'; return new Date(`${value}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); }
export default function MyTrips() {
  const [trips, setTrips] = useState([]);
  useEffect(() => { const saved = JSON.parse(localStorage.getItem('tripsync_trips') || '[]'); setTrips(saved.length ? saved : seedTrips); }, []);
  const deleteTrip = (id) => { const next = trips.filter((trip) => trip.id !== id); setTrips(next); localStorage.setItem('tripsync_trips', JSON.stringify(next)); };
  return <div className="trip-page">
    <div className="my-trips-heading"><div><span className="page-eyebrow">YOUR ADVENTURES</span><h1>My Trips</h1><p>Manage your plans and find compatible travellers for each adventure.</p></div><Link to="/create-trip" className="primary-btn create-action"><Plus size={18} /> Create Trip</Link></div>
    <div className="trip-filter-row"><span className="active-filter">All trips <b>{trips.length}</b></span><span>Upcoming</span><span>Completed</span></div>
    {trips.length === 0 ? <section className="trip-card empty-trips"><MapPin size={28}/><h2>No trips yet</h2><p>Create your first trip and TripSync will use it to discover compatible companions.</p><Link to="/create-trip" className="primary-btn">Create your first trip <ArrowRight size={17}/></Link></section> : <div className="my-trip-grid">{trips.map((trip) => <article className="trip-list-card" key={trip.id}>
      <div className="trip-cover"><div className="cover-label">{trip.status === 'completed' ? 'Completed' : 'Upcoming'}</div><MapPin size={20}/><strong>{trip.destination || 'Destination'}</strong></div>
      <div className="trip-list-body"><div className="trip-card-title"><div><h2>{trip.destination || 'Untitled trip'}</h2><span>{trip.travelStyle} travel</span></div><button type="button" className="delete-trip" onClick={() => deleteTrip(trip.id)} aria-label="Delete trip">×</button></div>
        <div className="trip-info"><span><CalendarDays size={16}/>{formatDate(trip.startDate)} – {formatDate(trip.endDate)}</span><span><Wallet size={16}/>{trip.budget}</span><span><Users size={16}/>{trip.travellersNeeded || 1} travellers needed</span></div>
        <div className="mini-tags">{[...(trip.interests || []), ...(trip.activities || [])].slice(0, 5).map((item) => <span key={item}>{item}</span>)}</div>
        <div className="trip-list-actions"><Link to={`/trips/${trip.id}`} className="secondary-btn">View Details</Link><Link to="/discover" className="primary-btn">Find Matches <ArrowRight size={16}/></Link></div>
      </div></article>)}</div>}
  </div>;
}
