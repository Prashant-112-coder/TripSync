import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './layouts/AppShell';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Placeholder from './pages/Placeholder';
import Login from './auth/Login';
import Register from './auth/Register';
import ForgotPassword from './auth/ForgotPassword';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route element={<AppShell />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/discover" element={<Placeholder title="Discover" description="Find travellers who match your destination, dates, budget and interests." />} />
        <Route path="/trips" element={<Placeholder title="My Trips" description="Your upcoming, active and completed adventures will appear here." />} />
        <Route path="/matches" element={<Placeholder title="Matches" description="Your highest compatibility traveller recommendations." />} />
        <Route path="/requests" element={<Placeholder title="Requests" description="Manage incoming and outgoing travel companion requests." />} />
        <Route path="/messages" element={<Placeholder title="Messages" description="Real-time conversations with your travel companions." />} />
        <Route path="/groups" element={<Placeholder title="Groups" description="Collaborative travel groups, members and shared plans." />} />
        <Route path="/itinerary" element={<Placeholder title="Itinerary" description="Build a day-by-day plan for your next adventure." />} />
        <Route path="/expenses" element={<Placeholder title="Expenses" description="Track shared costs and settle trip balances." />} />
        <Route path="/ai-assistant" element={<Placeholder title="AI Travel Assistant" description="Personalized travel planning and itinerary assistance." />} />
        <Route path="/notifications" element={<Placeholder title="Notifications" description="Stay up to date with matches, requests and trip activity." />} />
        <Route path="/safety" element={<Placeholder title="Safety Center" description="Verification, reporting, emergency contacts and safety tools." />} />
        <Route path="/settings" element={<Placeholder title="Settings" description="Manage your account and TripSync preferences." />} />
        <Route path="/profile" element={<Placeholder title="Profile" description="Your traveller identity, interests and travel preferences." />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
