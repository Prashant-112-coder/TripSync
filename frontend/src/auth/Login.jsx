import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Lock, Mail, Plane } from "lucide-react";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <header className="auth-brand">
        <Link to="/" className="auth-logo">
          <span className="brand-mark"><Plane size={21} fill="currentColor" /></span>
          <span>Trip<span>Sync</span></span>
        </Link>
      </header>

      <main className="auth-container">
        <section className="auth-card">
          <Link to="/" className="auth-back"><ArrowLeft size={16} /> Back to home</Link>
          <div className="auth-heading">
            <span className="auth-eyebrow">WELCOME BACK</span>
            <h1>Ready for your next adventure?</h1>
            <p>Sign in to continue planning, matching and travelling together.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <label>Email address
              <div className="auth-input"><Mail size={18} /><input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
            </label>
            <label>Password
              <div className="auth-input"><Lock size={18} /><input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
            </label>
            <div className="auth-options">
              <label className="remember"><input type="checkbox" /> Remember me</label>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
            <button className="primary-btn auth-submit" type="submit">Sign in <ArrowRight size={18} /></button>
          </form>

          <div className="auth-divider"><span>or</span></div>
          <p className="auth-switch">Don't have an account? <Link to="/register">Create one</Link></p>
        </section>
      </main>
      <p className="auth-footer">© 2026 TripSync · Travel smarter. Together.</p>
    </div>
  );
}
