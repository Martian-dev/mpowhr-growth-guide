import { BentoGrid, Tile, TileEyebrow } from "./bento";
import { PRICING_ANCHOR, bodyFont } from "./constants";
import { CtaButton } from "./shared";

const ProgramOverview = () => {
  return (
    <BentoGrid id="overview" className="pb-4 md:pb-8">
      <Tile className="md:col-span-6 lg:col-span-7 lg:row-span-2 flex flex-col justify-between gap-8">
        <TileEyebrow as="h2" className="text-gray-500">
          Program Overview
        </TileEyebrow>
        <p
          className="text-2xl md:text-3xl lg:text-[2.75rem] font-bold text-primary leading-snug md:leading-snug"
          style={{ fontFamily: "Vinila, Inter, sans-serif" }}
        >
          Cut through the HR jargon and get a clear, practical understanding of
          the POSH Act and its impact on business leadership.
        </p>
      </Tile>

      <Tile index={1} className="md:col-span-3 lg:col-span-5 flex items-center">
        <p className="text-lg text-gray-600 leading-relaxed" style={bodyFont}>
          This is not another generic awareness session. This live masterclass
          gives CEOs, Founders, Managing Directors and Promoters a clear
          understanding of their legal responsibilities, key timelines, Internal
          Committee requirements, risk areas and the right procedures to follow.
        </p>
      </Tile>

      <Tile
        index={2}
        className="md:col-span-3 lg:col-span-5 flex flex-col justify-between gap-6"
      >
        <p className="text-lg text-gray-600 leading-relaxed" style={bodyFont}>
          Walk away with the knowledge to identify compliance gaps, reduce
          organisational risk and respond to POSH matters with greater clarity
          and confidence — while protecting both your people and your
          organisation.
        </p>
        <div className="flex flex-col xl:flex-row xl:items-center gap-3">
          <CtaButton href={PRICING_ANCHOR}>Join the Workshop Now</CtaButton>
          <span
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600"
            style={bodyFont}
          >
            <span
              className="w-2 h-2 rounded-full bg-primary"
              aria-hidden="true"
            />
            Limited Seats Available
          </span>
        </div>
      </Tile>
    </BentoGrid>
  );
};

export default ProgramOverview;
