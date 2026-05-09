import FadeIn from "./FadeIn";

const highlights = [
  {
    emoji: "🥐",
    title: "Domowe wypieki",
    desc: "Każdego ranka pieczemy świeże croissanty, scones i ciasta według sprawdzonych, rodzinnych przepisów.",
  },
  {
    emoji: "🌱",
    title: "Świeże składniki",
    desc: "Wybieramy lokalnych dostawców i sezonowe produkty – bo jakość zaczyna się od źródła.",
  },
  {
    emoji: "☕",
    title: "Specjality coffee",
    desc: "Ziarna z najlepszych palarni, starannie parzone metodami przelewowymi i espresso.",
  },
  {
    emoji: "💛",
    title: "Przytulna atmosfera",
    desc: "Ciepłe wnętrze, miła obsługa i miejsce, w którym lubisz wracać – jak do drugiego domu.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="bg-cream py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image placeholder */}
          <FadeIn className="order-2 lg:order-1">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl shadow-xl">
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary/40 to-primary/20">
                <span className="text-8xl opacity-60" aria-hidden="true">🏠</span>
              </div>
            </div>
          </FadeIn>

          {/* Text */}
          <FadeIn className="order-1 lg:order-2" delay={150}>
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary-light">
                O nas
              </h2>
              <h3 className="mb-6 text-3xl font-bold text-warm-brown sm:text-4xl">
                Tworzymy miejsce z duszą
              </h3>
              <p className="mb-8 leading-relaxed text-foreground/75">
                Kawa i Ciasteczko powstało z miłości do dobrej kawy i
                domowych wypieków. W kameralnym wnętrzu, z dala od
                miejskiego zgiełku, serwujemy starannie przygotowane napoje
                i słodkości, które poprawiają nastrój o każdej porze dnia.
                <br />
                <br />
                Naszym celem jest stworzenie przestrzeni, w której każdy
                gość czuje się wyjątkowo – czy to przy porannej kawie w
                biegu, czy podczas leniwego popołudnia z książką i
                kawałkiem szarlotki.
              </p>

              {/* Highlights grid */}
              <div className="grid gap-6 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="mt-1 text-2xl" aria-hidden="true">{item.emoji}</span>
                    <div>
                      <h4 className="font-semibold text-warm-brown">
                        {item.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-foreground/55">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
