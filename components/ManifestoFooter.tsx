import { ArrowGlyph, WayLogo } from "./WayLogo";

export function ManifestoFooter() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between bg-ink p-[20rem] text-red">
      <div className="flex flex-1 items-center justify-center py-[40rem]">
        <p className="type-manifesto max-w-[1400rem] text-center">
          WAY TV is born from the idea of blurring the line between creation and production, aiming
          to restore the value of content. It&rsquo;s all about quality over quantity.
        </p>
      </div>

      <footer className="flex flex-col items-center gap-[20rem] border-t border-red/20 pt-[16rem] lg:flex-row lg:items-end lg:justify-between">
        <ul className="order-2 flex items-center gap-[22rem] lg:order-1 lg:flex-1">
          <li>
            <a
              className="hover:underline"
              href="https://vimeo.com/waytv"
              target="_blank"
              rel="noreferrer"
            >
              Vimeo
            </a>
          </li>
          <li>
            <a
              className="hover:underline"
              href="https://www.instagram.com/waytv.paris/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </li>
        </ul>

        <div className="order-1 flex justify-center lg:order-2 lg:flex-1">
          <WayLogo className="h-auto w-[80rem] lg:w-[66rem]" />
        </div>

        <div className="order-3 flex justify-center lg:flex-1 lg:justify-end">
          <a className="flex items-center gap-[10rem] hover:underline" href="mailto:hello@waytv.paris">
            <ArrowGlyph className="h-auto w-[10rem]" />
            <span>hello@waytv.paris</span>
          </a>
        </div>
      </footer>
    </section>
  );
}
