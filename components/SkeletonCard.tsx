export default function SkeletonCard({ variant = "card" }: { variant?: "hero" | "card" | "list" | "contact" }) {
  const pulse = "animate-pulse rounded bg-amber-200/60";

  if (variant === "hero") {
    return (
      <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-gradient-to-b from-cream via-amber-50 to-background px-4 pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className={`mx-auto mb-6 h-20 w-20 rounded-full ${pulse}`} />
          <div className={`mx-auto mb-4 h-10 w-3/4 ${pulse}`} />
          <div className={`mx-auto mb-8 h-6 w-2/3 ${pulse}`} />
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className={`h-12 w-44 rounded-full ${pulse}`} />
            <div className={`h-12 w-40 rounded-full ${pulse}`} />
          </div>
        </div>
      </section>
    );
  }

  if (variant === "list") {
    return (
      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <div className={`mx-auto mb-2 h-4 w-24 ${pulse}`} />
            <div className={`mx-auto h-8 w-72 ${pulse}`} />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-5 rounded-xl bg-white p-5 shadow-sm">
                <div className={`h-14 w-14 shrink-0 rounded-xl ${pulse}`} />
                <div className="min-w-0 flex-1 space-y-2">
                  <div className={`h-4 w-3/4 ${pulse}`} />
                  <div className={`h-3 w-full ${pulse}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "contact") {
    return (
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <div className={`mx-auto mb-2 h-4 w-20 ${pulse}`} />
            <div className={`mx-auto h-8 w-56 ${pulse}`} />
          </div>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-xl ${pulse}`} />
                  <div className="flex-1 space-y-1.5">
                    <div className={`h-3 w-16 ${pulse}`} />
                    <div className={`h-4 w-40 ${pulse}`} />
                  </div>
                </div>
              ))}
              <div className={`h-48 w-full rounded-xl ${pulse}`} />
            </div>
            <div className={`h-64 rounded-2xl ${pulse}`} />
          </div>
        </div>
      </section>
    );
  }

  // default "card" variant — used for Offer section
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <div className={`mx-auto mb-2 h-4 w-24 ${pulse}`} />
          <div className={`mx-auto h-8 w-64 ${pulse}`} />
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-white p-6 shadow-md">
              <div className={`mb-5 h-14 w-14 rounded-xl ${pulse}`} />
              <div className={`mb-2 h-5 w-24 ${pulse}`} />
              <div className={`h-4 w-full ${pulse}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
