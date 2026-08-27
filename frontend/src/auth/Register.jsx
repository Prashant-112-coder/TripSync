import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Lock, Mail, Plane, User } from "lucide-react";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) return;
    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <header className="auth-brand">
        <Link to="/" className="auth-logo"><span className="brand-mark"><Plane size={21} fill="currentColor" /></span><span>Trip<span>Sync</span></span></Link>
      </header>
      <main className="auth-container">
        <section className="auth-card">
          <Link to="/" className="auth-back"><ArrowLeft size={16} /> Back to home</Link>
          <div className="auth-heading">
            <span className="auth-eyebrow">JOIN TRIPSYNC</span>
            <h1>Start your journey ✈️</h1>
            <p>Create your profile and meet people who match your travel style.</p>
          </div>
          <form onSubmit={handleSubmit} className="auth-form">
            <label>Full name<div className="auth-input"><User size={18} /><input name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required /></div></label>
            <label>Email address<div className="auth-input"><Mail size={18} /><input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required /></div></label>
            <label>Password<div className="auth-input"><Lock size={18} /><input name="password" type="password" placeholder="Create a password" minLength={6} value={form.password} onChange={handleChange} required /></div></label>
            <label>Confirm password<div className="auth-input"><Lock size={18} /><input name="confirmPassword" type="password" placeholder="Confirm your password" value={form.confirmPassword} onChange={handleChange} required /></div></label>
            <label className="terms"><input type="checkbox" required /><span>I agree to the TripSync terms and privacy policy.</span></label>
            <button className="primary-btn auth-submit" type="submit">Create account <ArrowRight size={18} /></button>
          </form>
          <div className="auth-divider"><span>or</span></div>
          <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
        </section>
      </main>
      <p className="auth-footer">© 2026 TripSync · Travel smarter. Together.</p>
    </div>
  );
}
