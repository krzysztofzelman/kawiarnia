export default function Hero() {
  return (
    <section className="scroll-mt-20 relative flex min-h-dvh items-center justify-center overflow-hidden bg-gradient-to-b from-cream via-amber-50 to-background px-4 pt-16">
      {/* Decorative background circles */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div className="animate-fade-in-up mb-6 text-6xl sm:text-7xl" aria-hidden="true">☕</div>
        <h1 className="animate-fade-in-up mb-4 text-4xl font-extrabold tracking-tight text-warm-brown sm:text-5xl lg:text-6xl">
          Kawa <span className="text-primary-light">&</span> Ciasteczko
        </h1>
        <p className="animate-fade-in-up mx-auto mb-8 max-w-lg text-lg leading-relaxed text-warm-brown/80 sm:text-xl [animation-delay:150ms]">
          Przytulna kawiarnia, w której każdy łyk i każdy kęs to mała chwila
          przyjemności. Domowe wypieki, najlepsza kawa i uśmiech na dobry
          początek dnia.
        </p>
        <div className="animate-fade-in-up flex flex-col items-center justify-center gap-4 sm:flex-row [animation-delay:300ms]">
          <a
            href="#menu"
            className="rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-primary-light hover:shadow-xl"
          >
            Zobacz menu
          </a>
          <a
            href="#about"
            className="rounded-full border-2 border-primary/30 px-8 py-3.5 text-base font-semibold text-warm-brown transition-all hover:border-primary hover:bg-primary/5"
          >
            Poznaj nas
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="h-6 w-6 text-primary/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
