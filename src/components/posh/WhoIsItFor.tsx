import { Briefcase, Building2, Crown, Rocket } from "lucide-react";
import { BentoGrid, Tile, TileHeading } from "./bento";
import { PRICING_ANCHOR, bodyFont } from "./constants";
import { CtaButton } from "./shared";

const audiences = [
  {
    icon: Briefcase,
    role: "Managing Director",
    description:
      "Responsible for organisational governance and business continuity.",
  },
  {
    icon: Crown,
    role: "CEO",
    description:
      "Looking to understand the legal and leadership implications of workplace compliance.",
  },
  {
    icon: Rocket,
    role: "Founder / Promoter",
    description:
      "Building or scaling an organisation and wanting the right compliance framework from the start.",
  },
  {
    icon: Building2,
    role: "Business Owner",
    description:
      "Wanting to understand personal and organisational exposure under the POSH framework.",
  },
];

const RoleTile = ({
  audience,
  index,
}: {
  audience: (typeof audiences)[number];
  index: number;
}) => {
  const Icon = audience.icon;

  return (
    <Tile
      index={index}
      className="sm:col-span-1 md:col-span-3 lg:col-span-3 flex flex-col gap-4"
    >
      <span className="w-11 h-11 rounded-2xl border border-primary/15 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
      </span>
      <h3
        className="text-xl font-bold text-foreground"
        style={{ fontFamily: "Vinila, Inter, sans-serif" }}
      >
        {audience.role}
      </h3>
      <p className="text-gray-600 leading-relaxed" style={bodyFont}>
        {audience.description}
      </p>
    </Tile>
  );
};

const WhoIsItFor = () => {
  return (
    <BentoGrid id="audience" className="pt-4 md:pt-8 pb-12 md:pb-16">
      <Tile className="md:col-span-6 lg:col-span-6 flex items-end min-h-[180px]">
        <TileHeading className="text-foreground">
          This Masterclass Is For You If You Are A...
        </TileHeading>
      </Tile>

      {audiences.map((audience, index) => (
        <RoleTile key={audience.role} audience={audience} index={index + 1} />
      ))}

      <Tile
        index={5}
        className="md:col-span-6 lg:col-span-6 flex flex-col justify-center items-start gap-3"
      >
        <CtaButton href={PRICING_ANCHOR}>Become a POSH Expert</CtaButton>
        <p className="text-gray-600" style={bodyFont}>
          Get Free Consultation after Workshop
        </p>
      </Tile>
    </BentoGrid>
  );
};

export default WhoIsItFor;
