import { FEATURED } from "@/lib/way-data";
import { Arrow } from "@/components/way/Arrow";
import { CircleCursor } from "@/components/way/CircleCursor";
import { FeaturedSlider } from "@/components/way/FeaturedSlider";
import { FooterProjects } from "@/components/way/FooterProjects";
import { Header } from "@/components/way/Header";
import { Preloader } from "@/components/way/Preloader";
import { ProjectsBrowser } from "@/components/way/ProjectsBrowser";
import { ResponsiveSlider } from "@/components/way/ResponsiveSlider";
import { ScrollLink } from "@/components/way/ScrollLink";

/**
 * weareyoung-agency.com/projects/, rebuilt as the local index.
 *
 * The DOM tree and class names below are the production ones — the vendored
 * stylesheets in app/vendor address them directly, so the markup is the
 * contract. The only element that is not in the original is <Preloader />.
 */
export default function Page() {
  return (
    <>
      <Header />

      <div id="containerAllPage">
        <div id="AllPage">
          <main id="Projets">
            <FeaturedSlider items={FEATURED} />
            <ResponsiveSlider items={FEATURED} />

            <ProjectsBrowser />

            <ScrollLink
              className="arrow noAjax scrollTo"
              id="footerResponsiveArrow"
              href="#sliderResponsive"
            >
              <Arrow className="svg" />
            </ScrollLink>

            <FooterProjects />
          </main>
        </div>
      </div>

      <CircleCursor />
      <Preloader />
    </>
  );
}
