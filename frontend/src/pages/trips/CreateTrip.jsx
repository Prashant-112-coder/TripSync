import { useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, Check, MapPin, Users, Wallet } from 'lucide-react';
import './trips.css';

const travelStyles = ['Budget', 'Balanced', 'Comfort', 'Luxury'];
const interests = ['Adventure', 'Beaches', 'Culture', 'Food', 'Hiking', 'Photography', 'Nightlife', 'Nature', 'Road trips', 'Shopping'];
const activities = ['Trekking', 'Sightseeing', 'Camping', 'Museums', 'Local food', 'Water sports', 'Photography', 'Night markets'];

const initialTrip = { destination: '', startDate: '', endDate: '', travellersNeeded: '1', budget: '₹2,000 – ₹5,000 / day', travelStyle: 'Balanced', accommodation: 'Hotels / Hostels', description: '' };

export default function CreateTrip() {
  const [trip, setTrip] = useState(initialTrip);
  const [selectedInterests, setSelectedInterests] = useState(['Adventure', 'Food']);
  const [selectedActivities, setSelectedActivities] = useState(['Sightseeing', 'Local food']);
  const [created, setCreated] = useState(false);

  const update = (field, value) => setTrip((current) => ({ ...current, [field]: value }));
  const toggle = (value, setter) => setter((items) => items.includes(value) ? items.filter((item) => item !== value) : [...items, value]);
  const duration = useMemo(() => {
    if (!trip.startDate || !trip.endDate) return null;
    const days = Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / 86400000) + 1;
    return days > 0 ? days : null;
  }, [trip.startDate, trip.endDate]);

  const handleSubmit = (event) => { event.preventDefault(); setCreated(true); };

  return (
    <div className="trip-page">
      <div className="trip-heading">
        <div><span className="page-eyebrow">PLAN YOUR NEXT ADVENTURE</span><h1>Create a trip</h1><p>Tell TripSync about your plans so we can find compatible travellers.</p></div>
      </div>
      {created && <div className="trip-success"><Check size={18} /> Trip draft created successfully. Matching will be connected when the backend is enabled.</div>}
      <form className="trip-layout" onSubmit={handleSubmit}>
        <main className="trip-main">
          <section className="trip-card">
            <div className="card-heading"><div><h2>Where are you going?</h2><p>The destination is the first matching signal.</p></div></div>
            <label className="trip-label">Destination<div className="trip-input icon-input"><MapPin size={18} /><input required value={trip.destination} onChange={(e) => update('destination', e.target.value)} placeholder="e.g. Goa, India" /></div></label>
          </section>
          <section className="trip-card">
            <div className="card-heading"><div><h2>When are you travelling?</h2><p>Overlapping dates help us identify people who can actually travel together.</p></div></div>
            <div className="trip-grid two">
              <label className="trip-label">Start date<div className="trip-input icon-input"><CalendarDays size={17} /><input required type="date" value={trip.startDate} onChange={(e) => update('startDate', e.target.value)} /></div></label>
              <label className="trip-label">End date<div className="trip-input icon-input"><CalendarDays size={17} /><input required type="date" min={trip.startDate || undefined} value={trip.endDate} onChange={(e) => update('endDate', e.target.value)} /></div></label>
            </div>
            {duration && <div className="duration-pill">{duration} day{duration === 1 ? '' : 's'} planned</div>}
          </section>
          <section className="trip-card">
            <div className="card-heading"><div><h2>Trip preferences</h2><p>These fields will become features for the future AI/ML matching engine.</p></div></div>
            <div className="trip-grid two">
              <label className="trip-label">Daily budget<select value={trip.budget} onChange={(e) => update('budget', e.target.value)}><option>Under ₹2,000 / day</option><option>₹2,000 – ₹5,000 / day</option><option>₹5,000 – ₹10,000 / day</option><option>₹10,000+ / day</option></select></label>
              <label className="trip-label">Travellers needed<div className="trip-input icon-input"><Users size={17} /><input type="number" min="1" max="20" value={trip.travellersNeeded} onChange={(e) => update('travellersNeeded', e.target.value)} /></div></label>
              <label className="trip-label full">Travel style<div className="choice-row">{travelStyles.map((item) => <button type="button" key={item} className={trip.travelStyle === item ? 'choice active' : 'choice'} onClick={() => update('travelStyle', item)}>{item}</button>)}</div></label>
              <label className="trip-label">Accommodation<select value={trip.accommodation} onChange={(e) => update('accommodation', e.target.value)}><option>Hotels / Hostels</option><option>Hostels</option><option>Hotels</option><option>Homestays</option><option>Resorts</option></select></label>
            </div>
          </section>
          <section className="trip-card">
            <div className="card-heading"><div><h2>Interests</h2><p>Select interests you would enjoy sharing with companions.</p></div></div>
            <div className="tag-picker">{interests.map((item) => <button type="button" key={item} className={selectedInterests.includes(item) ? 'tag active' : 'tag'} onClick={() => toggle(item, setSelectedInterests)}>{selectedInterests.includes(item) && <Check size={13} />}{item}</button>)}</div>
          </section>
          <section className="trip-card">
            <div className="card-heading"><div><h2>Activities</h2><p>Choose the experiences you want on this trip.</p></div></div>
            <div className="tag-picker">{activities.map((item) => <button type="button" key={item} className={selectedActivities.includes(item) ? 'tag active' : 'tag'} onClick={() => toggle(item, setSelectedActivities)}>{selectedActivities.includes(item) && <Check size={13} />}{item}</button>)}</div>
          </section>
          <section className="trip-card">
            <div className="card-heading"><div><h2>Tell travellers about your trip</h2><p>Add context that isn't captured by the structured preferences.</p></div></div>
            <label className="trip-label">Trip description<textarea rows="5" maxLength="500" value={trip.description} onChange={(e) => update('description', e.target.value)} placeholder="What are you hoping to experience on this trip?" /></label>
          </section>
          <button className="primary-btn create-trip-btn" type="submit">Create trip <ArrowRight size={18} /></button>
        </main>
        <aside className="trip-side">
          <section className="trip-card match-ready"><div className="match-icon"><Wallet size={20} /></div><h3>Built for better matches</h3><p>TripSync will use these structured preferences to compare your trip with other active trips.</p><ul><li><Check size={15} /> Destination similarity</li><li><Check size={15} /> Date overlap</li><li><Check size={15} /> Budget compatibility</li><li><Check size={15} /> Travel style</li><li><Check size={15} /> Shared interests & activities</li></ul></section>
          <section className="trip-card score-preview"><span>Future compatibility</span><strong>—%</strong><p>After the matching service is connected, compatible travellers will receive a calculated score.</p></section>
        </aside>
      </form>
    </div>
  );
}
