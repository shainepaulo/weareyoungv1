import { SECONDARY_BRANDS } from "@/lib/brands";

export function InfiniteMarquee() {
  const track = [...SECONDARY_BRANDS, ...SECONDARY_BRANDS];

  return (
    <div className="relative flex w-full overflow-hidden border-y border-red/20 bg-ink py-[24rem]">
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          className="animate-marquee flex shrink-0 items-center whitespace-nowrap"
        >
          {track.map((brand, i) => (
            <a
              key={`${copy}-${i}`}
              href="#"
              className="type-marquee flex items-center text-red/70 transition-colors hover:text-red"
            >
              <span className="px-[20rem] lg:px-[32rem]">{brand}</span>
              <span
                className="inline-block shrink-0 rounded-full bg-red/40"
                style={{ width: "10rem", height: "10rem" }}
              />
            </a>
          ))}
        </div>
      ))}
    </div>
  );
}
