"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Heart, Check, ArrowDown, Copy } from "lucide-react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    attending: "",
    menuPreference: "",
    message: "",
  });
  const [copiedField, setCopiedField] = useState<"cbu" | "alias" | null>(null);

  const handleCopy = (text: string, field: "cbu" | "alias") => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000); // feedback por 2 segundos
    });
  };
  const [submitted, setSubmitted] = useState(false);
  const [visibleSections, setVisibleSections] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = Number.parseInt(
              entry.target.getAttribute("data-section") || "0"
            );
            setVisibleSections((prev) => [...new Set([...prev, sectionIndex])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll(".animate-section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Datos del formulario:", formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="wedding-container">
      {/* Hero Section */}
      <section
        className={`hero-section animate-section ${
          visibleSections.includes(0) ? "visible" : ""
        }`}
        data-section="0"
      >
        <div className="hero-content">
          <img src="/images/bailando.svg" className="wedding-img" />
          <div className="hero-text">
            <h1 className="couple-names">Valentín & Camila</h1>
            <img src="/images/flores.svg" className="flores-wedding" />
            <img
              src="/images/frase-bebamos.svg"
              className="frase-bebamos"
            ></img>
          </div>

          <div className="scroll-indicator">
            <ArrowDown className="scroll-arrow" />
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section
        className={`info-section animate-section ${
          visibleSections.includes(1) ? "visible" : ""
        }`}
        data-section="1"
      >
        <div className="container">
          {/* <h2 className="section-title">DETALLES DEL EVENTO</h2> */}

          <div className="info-grid">
            <div className="info-card">
              <img src="/images/altar.svg" className="altar"></img>
              <img
                src="/images/fecha.svg"
                style={{ marginTop: "16px" }}
                className="wedding-date"
              />

              <img src="/images/horario.svg" className="horario"></img>
              <img src="/images/lugar.svg" className="iglesia"></img>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.5926921532127!2d-68.7307335!3d-32.9617615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e0d6fb6e74fdd%3A0x7cd33a5a42ecaa56!2sFinca%20Martinez!5e0!3m2!1ses-419!2sar!4v1753828507523!5m2!1ses-419!2sar"
                style={{
                  border: 0,
                  width: "100%",
                  marginTop: "50px",
                  height: "600px",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="info-card">
              <img src="/images/orden-evento.svg"></img>
            </div>
            <div className="info-card">
              <strong
                style={{
                  fontSize: "36px",
                  fontFamily: "Aurore",
                  fontWeight: "500",
                }}
              >
                Dress code
              </strong>
              <p style={{ fontFamily: "Cinzel", fontSize: "24px" }}>
                Formal elegante
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section
        className={`rsvp-section animate-section ${
          visibleSections.includes(2) ? "visible" : ""
        }`}
        data-section="2"
      >
        <div className="container">
          <h2 className="section-title">Confirmá tu asistencia</h2>
          <p style={{ fontFamily: "Cinzel", textAlign: "center" }}>
            por favor, confirma tu <br />
            presencia antes del 30 de noviembre
          </p>
          {!submitted ? (
            <div className="rsvp-form-container">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLScVEDKlNkiUfvsn1SUH1FWzq-d_elXn5EA0bNwLNvVQN95GXg/viewform?embedded=true"
                style={{
                  width: "100%",
                  height: "1100px",
                  overflow: "hidden",
                }}
              >
                Cargando…
              </iframe>
            </div>
          ) : (
            <div className="confirmation-message">
              <div className="confirmation-icon">
                <Check className="check-icon" />
              </div>
              <h3>¡Confirmación recibida!</h3>
              <p>
                Gracias por confirmar tu asistencia. ¡Te esperamos para bailar y
                disfrutar!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Gift Section */}
      <section
        className={`gift-section animate-section ${
          visibleSections.includes(3) ? "visible" : ""
        }`}
        data-section="3"
      >
        <div className="container">
          <h2 className="section-title" style={{ fontSize: "50px" }}>
            Regalos
          </h2>

          <div className="gift-content">
            <div className="gift-icon-wrapper">
              <img src="/images/regalo.svg"></img>
            </div>

            <h3 style={{ fontFamily: "Aurore", fontSize: "36px" }}>
              Tu presencia es nuestro regalo
            </h3>
            <p style={{ fontFamily: "Cinzel" }}>
              Si deseas acompañarnos con nuestros proyectos, <br /> podes
              hacerlo acá
            </p>

            <div className="gift-details">
              <div className="gift-item">
                <strong>CBU:</strong>
                <span className="gift-text">0170285140000033624727</span>
                <button
                  className="icon-button"
                  onClick={() => handleCopy("0170285140000033624727", "cbu")}
                  aria-label="Copiar CBU"
                >
                  {copiedField === "cbu" ? (
                    <Check size={18} color="#4caf50" />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              </div>

              <div style={{ maxWidth: "500px" }} className="gift-item">
                <strong>Alias:</strong>
                <span className="gift-text">camilayvalentin26</span>
                <button
                  className="icon-button"
                  onClick={() => handleCopy("camilayvalentin26", "alias")}
                  aria-label="Copiar alias"
                >
                  {copiedField === "alias" ? (
                    <Check size={18} color="#4caf50" />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              </div>
            </div>

            <p className="gift-note">
              ¡Gracias por ser parte de nuestro día especial!
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="wedding-footer">
        <div className="container">
          <p>Con amor, Valentín & Camila</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
