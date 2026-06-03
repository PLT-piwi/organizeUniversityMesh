import { useState } from "react";
import { DONATION_OPTIONS } from "../../constants/config.js";

export function FloatingDonateButton() {
  const [isOpen, setIsOpen] = useState(false);

  const openDonationPage = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <div className="donate-widget">
      {isOpen && (
        <div className="donate-panel" role="dialog" aria-label="Opciones de donacion">
          <div className="donate-panel__header">
            <span>Apoya el proyecto</span>
            <button
              type="button"
              className="donate-panel__close"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar opciones de donacion"
              title="Cerrar"
            >
              x
            </button>
          </div>

          <div className="donate-panel__options">
            {DONATION_OPTIONS.map((option) => (
              <button
                type="button"
                key={`${option.label}-${option.amount}`}
                className="donate-option"
                onClick={() => openDonationPage(option.url)}
              >
                <span>{option.label}</span>
                <strong>{option.amount}</strong>
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        className="donate-fab"
        onClick={() => setIsOpen((open) => !open)}
        title="Apoyar el proyecto"
        aria-label="Abrir opciones para apoyar el proyecto"
        aria-expanded={isOpen}
      >
        <span className="donate-fab__icon" aria-hidden="true">🐣</span>
      </button>
    </div>
  );
}
