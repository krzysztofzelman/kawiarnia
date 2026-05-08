"use client";

import { useState } from "react";
import OrderModal from "./OrderModal";

const navLinks = [
  { label: "O nas", href: "#about" },
  { label: "Oferta", href: "#offer" },
  { label: "Menu", href: "#menu" },
  { label: "Kontakt", href: "#contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">☕</span>
          <span className="text-lg font-bold tracking-tight text-warm-brown sm:text-xl">
            Kawa i Ciasteczko
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-warm-brown transition-colors hover:text-primary-light"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={(e) => {
              e.preventDefault();
              setModalOpen(true);
            }}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-light hover:shadow-lg"
          >
            Zamów online
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu nawigacji"
        >
          <span
            className={`block h-0.5 w-6 rounded bg-warm-brown transition-transform ${
              mobileOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 rounded bg-warm-brown transition-opacity ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 rounded bg-warm-brown transition-transform ${
              mobileOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="flex flex-col items-center gap-4 border-t border-amber-200 bg-cream px-4 pb-6 pt-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-warm-brown transition-colors hover:text-primary-light"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={(e) => {
              e.preventDefault();
              setMobileOpen(false);
              setModalOpen(true);
            }}
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-light"
          >
            Zamów online
          </button>
        </nav>
      )}

      <OrderModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </header>
  );
}
