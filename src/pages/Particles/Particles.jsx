import React from "react";
import Footer from "../../components/Footer/Footer";
import ParticleFace from "../../components/ParticleFace/ParticleFace";
import useScrollReset from "../../hooks/useScrollReset";
import "./Particles.css";

export default function Particles() {
  useScrollReset();

  return (
    <main className="particles-page">
      <section className="particles-hero">
        <ParticleFace />
      </section>
      <Footer />
    </main>
  );
}
