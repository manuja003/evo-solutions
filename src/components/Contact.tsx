import { useState, useRef } from "react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]     = useState(false);
  const [error, setError]         = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    setError("");
    setSending(true);

    const get = (name: string) =>
      (form.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${name}"]`)?.value || "").trim();

    const payload = new FormData();
    payload.append("_subject", `EvoSolutions Enquiry — ${get("company") || "New Lead"}`);
    payload.append("_template", "table");
    payload.append("_captcha", "false");
    payload.append("Full Name",          get("from_name"));
    payload.append("Company / Business", get("company"));
    payload.append("Email Address",      get("reply_to"));
    payload.append("Phone Number",       get("phone"));
    payload.append("Product of Interest",get("product"));
    payload.append("Message",            get("message"));

    try {
      const res  = await fetch("https://formsubmit.co/ajax/infotagteamengineering@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });
      const data = await res.json();
      if (data.success === "true" || data.success === true) {
        setSubmitted(true);
        form.reset();
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      setError("Could not send message. Please email us directly at infotagteamengineering@gmail.com");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      style={{ padding: "100px 0", position: "relative", overflow: "hidden" }}
    >
      {/* Background orb */}
      <div style={{
        position: "absolute", width: 700, height: 700,
        background: "radial-gradient(circle, rgba(255,107,43,.06) 0%, transparent 70%)",
        bottom: -200, right: -200, borderRadius: "50%", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
        <div className="contact-grid-cols">

          {/* Left: Contact Info */}
          <div data-reveal>
            <div className="section-eyebrow">Get In Touch</div>
            <h2 className="section-title">
              Let's Build Something<br />
              <span className="gradient-text">Remarkable Together</span>
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--ed-text-secondary)", lineHeight: 1.75, marginBottom: 36 }}>
              Ready to see our products in action, or need a custom solution for your business?
              Fill in your details and our team will reach out within one business day.
            </p>

            {/* Contact Details */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 36 }}>
              {[
                {
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                  label: "Email Us",
                  value: "infotagteamengineering@gmail.com",
                  href: "mailto:infotagteamengineering@gmail.com",
                },
                {
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
                  label: "WhatsApp / Phone",
                  value: "Contact via Email for schedule",
                  href: "mailto:infotagteamengineering@gmail.com",
                },
                {
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
                  label: "Company",
                  value: "EvoSolutions — A TagTeam Engineering Product",
                  href: null,
                },
                {
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                  label: "Response Time",
                  value: "Within 1 business day",
                  href: null,
                },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: "var(--ed-orange-soft)",
                    border: "1px solid rgba(255,107,43,.2)",
                    color: "var(--ed-orange)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <strong style={{ display: "block", fontSize: ".82rem", fontWeight: 600, color: "var(--ed-text-secondary)", marginBottom: 3, fontFamily: "var(--font-jakarta)" }}>
                      {item.label}
                    </strong>
                    {item.href ? (
                      <a href={item.href} style={{ fontSize: ".9rem", color: "var(--ed-text-white)", fontWeight: 500, textDecoration: "none" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#FF6B2B")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ed-text-white)")}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span style={{ fontSize: ".9rem", color: "var(--ed-text-white)", fontWeight: 500 }}>{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Promises */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "Free product demonstration",
                "No commitment required",
                "Expert onboarding support included",
              ].map((p) => (
                <div key={p} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: 9999,
                    background: "var(--ed-green-soft)",
                    color: "var(--ed-green)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: ".88rem", color: "var(--ed-text-secondary)" }}>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div data-reveal data-delay="200">
            <div className="contact-form-card">
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontFamily: "var(--font-jakarta)", fontSize: "1.3rem", fontWeight: 800, color: "var(--ed-text-white)", marginBottom: 6 }}>
                  Send Us a Message
                </h3>
                <p style={{ fontSize: ".88rem", color: "var(--ed-text-secondary)" }}>
                  Complete the form and we'll be in touch shortly.
                </p>
              </div>

              {submitted ? (
                <div style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "20px 24px",
                  background: "var(--ed-green-soft)",
                  border: "1px solid rgba(34,197,94,.3)",
                  borderRadius: 14,
                }}>
                  <div style={{ color: "var(--ed-green)", flexShrink: 0 }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <div>
                    <strong style={{ display: "block", color: "var(--ed-text-white)", fontFamily: "var(--font-jakarta)", marginBottom: 4 }}>
                      Message Sent!
                    </strong>
                    <p style={{ fontSize: ".85rem", color: "var(--ed-text-secondary)", margin: 0 }}>
                      Thank you! We'll contact you within 1 business day.
                    </p>
                  </div>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate>
                  <div className="form-row-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div className="form-group">
                      <label>Full Name <span style={{ color: "#FF6B2B" }}>*</span></label>
                      <input name="from_name" type="text" placeholder="Your full name" required />
                    </div>
                    <div className="form-group">
                      <label>Company / Business <span style={{ color: "#FF6B2B" }}>*</span></label>
                      <input name="company" type="text" placeholder="Your company name" required />
                    </div>
                  </div>
                  <div className="form-row-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div className="form-group">
                      <label>Email Address <span style={{ color: "#FF6B2B" }}>*</span></label>
                      <input name="reply_to" type="email" placeholder="your@email.com" required />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input name="phone" type="tel" placeholder="+94 XX XXX XXXX" />
                    </div>
                  </div>
                  <div style={{ marginBottom: 16 }} className="form-group">
                    <label>Product of Interest</label>
                    <input name="product" type="text" placeholder="e.g. EvoDine, EvoPos, Custom Solution" />
                  </div>
                  <div style={{ marginBottom: 24 }} className="form-group">
                    <label>Message</label>
                    <textarea name="message" rows={4} placeholder="Tell us about your business and what you're looking for..." style={{ resize: "vertical" }} />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={sending}
                    style={{ width: "100%", justifyContent: "center", fontSize: "1rem", padding: "14px 24px", opacity: sending ? .7 : 1 }}
                  >
                    {sending ? (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin-slow 1s linear infinite" }}>
                          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                        Submit Request
                      </>
                    )}
                  </button>

                  {error && (
                    <div style={{
                      marginTop: 14,
                      display: "flex", alignItems: "flex-start", gap: 10,
                      padding: "12px 16px",
                      background: "rgba(239,68,68,.08)",
                      border: "1px solid rgba(239,68,68,.25)",
                      borderRadius: 12,
                      fontSize: ".82rem", color: "#FCA5A5", lineHeight: 1.5,
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                      {error}
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Contact;
