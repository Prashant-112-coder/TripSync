import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Mail, Plane } from "lucide-react";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="auth-page">
      <header className="auth-brand">
        <Link to="/" className="auth-logo"><span className="brand-mark"><Plane size={21} fill="currentColor" /></span><span>Trip<span>Sync</span></span></Link>
      </header>
      <main className="auth-container">
        <section className="auth-card">
          <Link to="/login" className="auth-back"><ArrowLeft size={16} /> Back to login</Link>
          <div className="auth-heading"><span className="auth-eyebrow">ACCOUNT RECOVERY</span><h1>Reset your password</h1><p>Enter your email and we'll help you get back on your journey.</p></div>
          {sent ? (
            <div className="success-message"><div>✓</div><h3>Check your inbox</h3><p>If an account exists for <strong>{email}</strong>, reset instructions will be sent there.</p><Link to="/login" className="primary-btn">Back to login</Link></div>
          ) : (
            <form className="auth-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <label>Email address<div className="auth-input"><Mail size={18} /><input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required /></div></label>
              <button className="primary-btn auth-submit" type="submit">Send reset link <ArrowRight size={18} /></button>
            </form>
          )}
        </section>
      </main>
      <p className="auth-footer">© 2026 TripSync · Travel smarter. Together.</p>
    </div>
  );
}
