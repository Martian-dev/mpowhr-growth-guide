import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/our-impact";
import bannerBW from "@/assets/banner-bw.svg";
import { BentoGrid, Tile, TileEyebrow } from "./bento";
import { CONSULTATION_URL, goldGradientText, bodyFont } from "./constants";

const stats = [
  { value: 14, label: "Years of Expertise" },
  { value: 5, label: "Certifications" },
  { value: 25, label: "Sessions Conducted" },
  { value: 100, label: "Professionals Trained" },
];

// Banner and "We in Numbers" share the first board.
const PoshHero = () => {
  return (
    <BentoGrid className="pt-4">
      {/* Banner */}
      <Tile
        variant="bare"
        className="md:col-span-6 lg:col-span-8 lg:row-span-2 min-h-[520px] md:min-h-[580px] p-0 lg:p-0 flex items-end bg-primary"
      >
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${bannerBW})`,
            backgroundPosition: "72% top",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-green-950/10" />

        <div className="relative p-6 md:p-10 max-w-2xl">
          <h1
            className="text-3xl md:text-[2.5rem] lg:text-[2.4rem] xl:text-[2.6rem]"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              lineHeight: "1.2",
            }}
          >
            <span className="block text-white">
              POSH ISN’T JUST AN HR MATTER.
            </span>
            <span className="block pb-2" style={goldGradientText}>
              It’s a Leadership Responsibility.
            </span>
          </h1>

          <p
            className="mt-4 text-base md:text-lg text-white/90 leading-relaxed"
            style={bodyFont}
          >
            Master the essentials of POSH compliance, IC processes, legal
            exposure & leadership safeguards in 120 minutes.
          </p>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="mt-6 text-base md:text-lg px-6 md:px-8 py-4 h-auto min-h-[48px] bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/40 focus-visible:ring-white"
          >
            <a
              href={CONSULTATION_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Free Consultation
              <ArrowRight className="w-6 h-6 ml-2" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </Tile>

      {/* We in Numbers */}
      {stats.map((stat, index) => (
        <Tile
          key={stat.label}
          index={index + 1}
          className="col-span-1 md:col-span-3 lg:col-span-2 flex flex-col justify-between gap-6 min-h-[150px]"
        >
          {index === 0 ? (
            <TileEyebrow as="h2" className="text-gray-500">
              We in Numbers
            </TileEyebrow>
          ) : (
            <span aria-hidden="true" />
          )}
          <div>
            <div className="flex items-baseline">
              <AnimatedCounter
                target={stat.value}
                className="text-foreground md:text-5xl"
              />
              <span className="text-4xl md:text-5xl font-bold ml-1 text-foreground">
                +
              </span>
            </div>
            <p className="mt-1 font-medium text-gray-600" style={bodyFont}>
              {stat.label}
            </p>
          </div>
        </Tile>
      ))}
    </BentoGrid>
  );
};

export default PoshHero;
