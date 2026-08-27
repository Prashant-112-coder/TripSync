import { useMemo, useState } from 'react';
import { Camera, Check, MapPin, Save, UserRound } from 'lucide-react';

const travelStyles = ['Budget', 'Balanced', 'Comfort', 'Luxury'];
const interests = ['Adventure', 'Beaches', 'Culture', 'Food', 'Hiking', 'Photography', 'Nightlife', 'Nature', 'Road trips', 'Shopping'];
const activities = ['Trekking', 'Sightseeing', 'Camping', 'Museums', 'Local food', 'Water sports', 'Photography', 'Night markets'];

export default function Profile() {
  const [profile, setProfile] = useState({
    name: 'Prashant',
    age: '22',
    location: 'Bengaluru, India',
    bio: 'Curious traveller who enjoys discovering new places, local food and memorable experiences.',
    style: 'Balanced',
    budget: '₹2,000 – ₹5,000 / day',
    accommodation: 'Hotels / Hostels',
    destinations: 'Goa, Manali, Kerala',
    startDate: '',
    endDate: ''
  });
  const [selectedInterests, setSelectedInterests] = useState(['Adventure', 'Food', 'Photography', 'Nature']);
  const [selectedActivities, setSelectedActivities] = useState(['Trekking', 'Sightseeing', 'Local food']);
  const [saved, setSaved] = useState(false);

  const initials = useMemo(() => profile.name.trim().slice(0, 2).toUpperCase() || 'TS', [profile.name]);

  const update = (field, value) => setProfile((current) => ({ ...current, [field]: value }));
  const toggle = (value, setter) => setter((items) => items.includes(value) ? items.filter((item) => item !== value) : [...items, value]);

  const saveProfile = (event) => {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div className="profile-page">
      <div className="profile-heading">
        <div>
          <span className="page-eyebrow">YOUR TRAVELLER IDENTITY</span>
          <h1>Profile & preferences</h1>
          <p>Tell TripSync what makes a great travel companion for you.</p>
        </div>
        <button className="primary-btn" onClick={saveProfile} form="profile-form">
          {saved ? <Check size={17} /> : <Save size={17} />}
          {saved ? 'Saved' : 'Save changes'}
        </button>
      </div>

      <form id="profile-form" onSubmit={saveProfile} className="profile-layout">
        <div className="profile-main">
          <section className="profile-card profile-intro-card">
            <div className="profile-avatar-wrap">
              <div className="profile-avatar">{initials}</div>
              <button type="button" className="avatar-camera" aria-label="Change profile photo"><Camera size={16} /></button>
            </div>
            <div className="profile-intro-copy">
              <h2>{profile.name || 'Your name'}</h2>
              <p><MapPin size={15} /> {profile.location || 'Add your location'}</p>
              <span>Profile completeness · 72%</span>
              <div className="profile-progress"><i /></div>
            </div>
          </section>

          <section className="profile-card">
            <div className="card-heading">
              <div><h2>Personal information</h2><p>Basic details shown to your potential travel companions.</p></div>
            </div>
            <div className="form-grid">
              <label>Full name<input value={profile.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" /></label>
              <label>Age<input type="number" min="18" value={profile.age} onChange={(e) => update('age', e.target.value)} placeholder="Age" /></label>
              <label className="full">Location<div className="input-with-icon"><MapPin size={17} /><input value={profile.location} onChange={(e) => update('location', e.target.value)} placeholder="City, country" /></div></label>
              <label className="full">About you<textarea value={profile.bio} onChange={(e) => update('bio', e.target.value)} rows="4" maxLength="240" placeholder="Tell travellers a little about yourself..." /></label>
            </div>
          </section>

          <section className="profile-card">
            <div className="card-heading"><div><h2>Travel preferences</h2><p>These preferences help TripSync calculate better matches.</p></div></div>
            <div className="form-grid">
              <label>Travel style<div className="choice-row">{travelStyles.map((item) => <button type="button" key={item} className={profile.style === item ? 'choice active' : 'choice'} onClick={() => update('style', item)}>{item}</button>)}</div></label>
              <label>Daily budget<select value={profile.budget} onChange={(e) => update('budget', e.target.value)}><option>Under ₹2,000 / day</option><option>₹2,000 – ₹5,000 / day</option><option>₹5,000 – ₹10,000 / day</option><option>₹10,000+ / day</option></select></label>
              <label>Accommodation<select value={profile.accommodation} onChange={(e) => update('accommodation', e.target.value)}><option>Hotels / Hostels</option><option>Hostels</option><option>Hotels</option><option>Homestays</option><option>Resorts</option></select></label>
              <label>Preferred destinations<input value={profile.destinations} onChange={(e) => update('destinations', e.target.value)} placeholder="e.g. Goa, Japan, Bali" /></label>
              <label>Available from<input type="date" value={profile.startDate} onChange={(e) => update('startDate', e.target.value)} /></label>
              <label>Available until<input type="date" value={profile.endDate} onChange={(e) => update('endDate', e.target.value)} /></label>
            </div>
          </section>

          <section className="profile-card">
            <div className="card-heading"><div><h2>Interests</h2><p>Choose the things you genuinely enjoy while travelling.</p></div></div>
            <div className="tag-picker">{interests.map((item) => <button type="button" key={item} className={selectedInterests.includes(item) ? 'tag active' : 'tag'} onClick={() => toggle(item, setSelectedInterests)}>{selectedInterests.includes(item) && <Check size={13} />}{item}</button>)}</div>
          </section>

          <section className="profile-card">
            <div className="card-heading"><div><h2>Favourite activities</h2><p>Help us find travellers who enjoy similar experiences.</p></div></div>
            <div className="tag-picker">{activities.map((item) => <button type="button" key={item} className={selectedActivities.includes(item) ? 'tag active' : 'tag'} onClick={() => toggle(item, setSelectedActivities)}>{selectedActivities.includes(item) && <Check size={13} />}{item}</button>)}</div>
          </section>
        </div>

        <aside className="profile-side">
          <section className="profile-card match-preview">
            <div className="match-preview-icon"><UserRound size={20} /></div>
            <h3>Your matching profile</h3>
            <p>Complete your preferences to improve the quality of your traveller recommendations.</p>
            <div className="match-score"><strong>72%</strong><span>complete</span></div>
            <ul><li><Check size={15} /> Personal information</li><li><Check size={15} /> Travel style</li><li><Check size={15} /> Interests</li><li className="pending">○ Availability dates</li></ul>
          </section>
          <section className="profile-card privacy-card">
            <h3>Privacy</h3>
            <p>Your profile is visible to travellers when they search for compatible companions.</p>
            <label className="toggle-row"><span>Discoverable profile</span><input type="checkbox" defaultChecked /><i /></label>
          </section>
        </aside>
      </form>
    </div>
  );
}
