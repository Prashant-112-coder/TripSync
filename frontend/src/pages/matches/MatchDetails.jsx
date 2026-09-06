import { CalendarDays, Check, Heart, MapPin, Sparkles, Users, Wallet } from 'lucide-react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { scoreTripMatch } from '../../services/matchingService';
import './match-details.css';

const demoTrip = { id: 'demo-1', destination: 'Manali, India', startDate: '2026-10-15', endDate: '2026-10-20', budget: '₹5,000 – ₹10,000 / day', travelStyle: 'Adventure', interests: ['Nature', 'Photography'], activities: ['Trekking', 'Sightseeing'], travellersNeeded: 4, status: 'upcoming' };
const demoCandidates = [
  { id: 'demo-2', name: 'Aarav', destination: 'Manali, India', startDate: '2026-10-16', endDate: '2026-10-20', budget: '₹6,000 – ₹10,000 / day', travelStyle: 'Adventure', interests: ['Nature', 'Photography', 'Food'], activities: ['Trekking', 'Sightseeing', 'Camping'], status: 'upcoming', bio: 'Love mountain trips, photography and discovering local food.' },
  { id: 'demo-3', name: 'Meera', destination: 'Manali, India', startDate: '2026-10-14', endDate: '2026-10-19', budget: '₹5,000 – ₹8,000 / day', travelStyle: 'Adventure', interests: ['Nature', 'Hiking', 'Photography'], activities: ['Trekking', 'Sightseeing'], status: 'upcoming', bio: 'Looking for easy-going companions for a scenic Himalayan adventure.' },
  { id: 'demo-4', name: 'Rohan', destination: 'Goa, India', startDate: '2026-10-17', endDate: '2026-10-22', budget: '₹4,000 – ₹7,000 / day', travelStyle: 'Balanced', interests: ['Beaches', 'Food', 'Photography'], activities: ['Sightseeing', 'Water Sports'], status: 'upcoming', bio: 'Beach, food and relaxed exploration.' },
  { id: 'demo-5', name: 'Ananya', destination: 'Manali, India', startDate: '2026-11-02', endDate: '2026-11-07', budget: '₹8,000 – ₹12,000 / day', travelStyle: 'Comfort', interests: ['Nature', 'Photography'], activities: ['Sightseeing'], status: 'upcoming', bio: 'Planning a comfortable mountain escape with great views.' }
];
const date = (v) => v ? new Date(`${v}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Not set';

export default function MatchDetails() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const savedTrips = JSON.parse(localStorage.getItem('tripsync_trips') || '[]');
  const trips = savedTrips.length ? savedTrips : [demoTrip];
  const trip = state?.trip || trips.find((item) => item.id === new URLSearchParams(window.location.search).get('trip')) || trips[0] || demoTrip;
  const storedCandidates = trips.filter((item) => item.id !== trip.id && item.status !== 'completed');
  const allCandidates = [...storedCandidates, ...demoCandidates.filter((item) => !storedCandidates.some((saved) => saved.id === item.id))];
  const candidate = state?.candidate || allCandidates.find((item) => item.id === id);

  if (!candidate) return <div className="match-details-page"><Link to="/discover" className="back-link">Back to Discover</Link><section className="detail-panel"><h2>Match not found</h2><p>This match may no longer be available.</p></section></div>;

  const match = scoreTripMatch(trip, candidate);
  const requests = JSON.parse(localStorage.getItem('tripsync_requests') || '[]');
  const request = requests.find((item) => item.tripId === trip.id && item.candidateId === candidate.id);
  const sendRequest = () => {
    const current = JSON.parse(localStorage.getItem('tripsync_requests') || '[]');
    if (!current.some((item) => item.tripId === trip.id && item.candidateId === candidate.id)) current.push({ id: `request-${Date.now()}`, tripId: trip.id, candidateId: candidate.id, candidateName: candidate.name, destination: candidate.destination, status: 'pending', createdAt: new Date().toISOString() });
    localStorage.setItem('tripsync_requests', JSON.stringify(current));
    navigate('/requests');
  };
  const labels = [['Destination', match.breakdown.destination], ['Dates', match.breakdown.dates], ['Budget', match.breakdown.budget], ['Travel style', match.breakdown.style], ['Interests', match.breakdown.interests], ['Activities', match.breakdown.activities]];
  return <div className="match-details-page"><Link to="/discover" className="back-link"><MapPin size={15}/> Back to Discover</Link><div className="match-detail-hero"><div className="match-person"><div className="large-avatar">{candidate.name?.slice(0, 1) || 'T'}</div><div><span className="page-eyebrow">TRAVEL COMPANION</span><h1>{candidate.name}</h1><p><MapPin size={15}/> {candidate.destination}</p></div></div><div className="big-match-score"><strong>{match.score}%</strong><span>Compatibility</span></div></div><div className="match-detail-grid"><main><section className="detail-panel"><div className="panel-title"><Sparkles size={18}/><div><h2>Why you match</h2><p>Every score is based on explainable trip signals.</p></div></div><div className="reason-list">{match.reasons.map((reason) => <div key={reason}><Check size={16}/><span>{reason}</span></div>)}</div></section><section className="detail-panel"><h2>Compatibility breakdown</h2><div className="breakdown-list">{labels.map(([label, value]) => <div className="breakdown-row" key={label}><span>{label}</span><div className="bar"><i style={{ width: `${Math.round(value * 100)}%` }}/></div><strong>{Math.round(value * 100)}%</strong></div>)}</div></section></main><aside><section className="detail-panel candidate-info"><h2>Trip details</h2><div><CalendarDays size={16}/><span>{date(candidate.startDate)} – {date(candidate.endDate)}</span></div><div><Wallet size={16}/><span>{candidate.budget}</span></div><div><Users size={16}/><span>{candidate.travellersNeeded || 1} travellers needed</span></div><div><Sparkles size={16}/><span>{candidate.travelStyle} style</span></div><p>{candidate.bio}</p>{request ? <Link to="/requests" className="primary-btn request-btn">Request {request.status}</Link> : <button type="button" className="primary-btn request-btn" onClick={sendRequest}><Heart size={17}/> Send Travel Request</button>}</section></aside></div></div>;
}
