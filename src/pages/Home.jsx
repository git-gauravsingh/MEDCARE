import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">

      {/* HERO SECTION */}
      <section style={styles.hero} className="card">
        <h1 style={styles.heroTitle}>
          🩺 MedCare
        </h1>
        <p style={styles.heroText}>
          Your smart healthcare companion — find doctors, medicines,
          and medical guidance tailored to your budget.
        </p>

        <div style={styles.heroBtns}>
          <Link to="/symptoms" style={styles.primaryBtn}>
             Check Symptoms
          </Link>

          <Link to="/medicine" style={styles.secondaryBtn}>
             Buy Medicines
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="card">
        <h2> What MedCare Offers</h2>

        <div style={styles.grid}>
          <Feature
            title="Symptom Checker"
            desc="Describe your symptoms and get guidance on possible health issues."
            icon="🤖"
            link="/symptoms"
          />

          <Feature
            title="Budget Doctor Finder"
            desc="Find the best doctors near you according to your budget."
            icon="💰"
            link="/budget"
          />

          <Feature
            title="Medicine Store"
            desc="Browse and add medicines to your cart easily."
            icon="💊"
            link="/medicine"
          />

          <Feature
            title="Doctor Registration"
            desc="Doctors can register and showcase their expertise."
            icon="👨‍⚕️"
            link="/register"
          />
        </div>
      </section>

      {/* WHY US */}
      <section className="card">
        <h2> Why Choose MedCare?</h2>
        <ul>
          <li> Works across India</li>
          <li> Budget-friendly healthcare discovery</li>
          <li> Simple & fast user experience</li>
          <li> Guest browsing supported</li>
          <li> Designed for scalability & startups</li>
        </ul>
      </section>

      {/* CTA */}
      <section style={styles.cta} className="card">
        <h2>Get Started Today</h2>
        <p>
          Join MedCare and experience smart healthcare like never before.
        </p>

        <Link to="/login" style={styles.primaryBtn}>
          Login / Register
        </Link>
      </section>
    </div>
  );
}

/* ================= SUB COMPONENTS ================= */

function Feature({ title, desc, icon, link }) {
  return (
    <div style={styles.featureCard}>
      <h3>{icon} {title}</h3>
      <p>{desc}</p>
      <Link to={link} style={{ color: "#38bdf8" }}>
        Explore →
      </Link>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  hero: {
    textAlign: "center",
    padding: "50px 20px"
  },

  heroTitle: {
    fontSize: "48px",
    marginBottom: 10
  },

  heroText: {
    fontSize: 18,
    opacity: 0.9
  },

  heroBtns: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    gap: 15,
    flexWrap: "wrap"
  },

  primaryBtn: {
    background: "#38bdf8",
    color: "#020617",
    padding: "10px 20px",
    borderRadius: 8,
    fontWeight: "bold",
    textDecoration: "none"
  },

  secondaryBtn: {
    border: "1px solid #38bdf8",
    color: "#38bdf8",
    padding: "10px 20px",
    borderRadius: 8,
    textDecoration: "none"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20,
    marginTop: 20
  },

  featureCard: {
    background: "#020617",
    border: "1px solid #1e293b",
    padding: 20,
    borderRadius: 10
  },

  cta: {
    textAlign: "center",
    padding: 30
  }
};
