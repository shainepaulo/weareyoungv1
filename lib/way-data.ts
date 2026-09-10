// Generated from https://www.weareyoung-agency.com/projects/ — do not edit by hand.
// Regenerate with the scraper in the README if the source page changes.

export interface FeaturedSlide {
  id: string;
  href: string;
  number: string;
  title: string;
  image: string;
}

export interface FilterGroup {
  /** id of the sub-list this group reveals, null for the catch-all "All". */
  liste: string | null;
  filter: string;
  label: string;
}

export interface FilterOption {
  filter: string;
  label: string;
}

export interface Project {
  href: string;
  zIndex: number;
  /** mixitup-style tag classes (n18, n12, ...) matched against the filter selectors. */
  tags: string[];
  image: string;
  hover: string;
  title: string;
  client: string;
}

export const FEATURED: FeaturedSlide[] = [
  {
    "id": "2796",
    "href": "https://www.weareyoung-agency.com/projects/adidas-arena/",
    "number": "01.",
    "title": "ADIDAS ARENA",
    "image": "/way/uploads/2024/05/arena-adidas.webp"
  },
  {
    "id": "2765",
    "href": "https://www.weareyoung-agency.com/projects/adidas-this-is-new-rugby/",
    "number": "02.",
    "title": "THIS IS NEW RUGBY",
    "image": "/way/uploads/2024/05/this-is-new-rugby-ii.webp"
  },
  {
    "id": "2814",
    "href": "https://www.weareyoung-agency.com/projects/women-in-tech-beyond-ceiling/",
    "number": "03.",
    "title": "BEYOND CEILING",
    "image": "/way/uploads/2024/05/lia-mention-scaled.webp"
  },
  {
    "id": "2675",
    "href": "https://www.weareyoung-agency.com/projects/quai-54/",
    "number": "04.",
    "title": "QUAI 54",
    "image": "/way/uploads/2023/08/quai54-2023-way-jlnjlvt.webp"
  },
  {
    "id": "2651",
    "href": "https://www.weareyoung-agency.com/projects/saison-xi/",
    "number": "05.",
    "title": "SAISON XI",
    "image": "/way/uploads/2023/08/way-adidasximpulstar-drone-5-min.webp"
  }
];

export const FILTER_GROUPS: FilterGroup[] = [
  {
    "liste": null,
    "filter": ".containerelement",
    "label": "All"
  },
  {
    "liste": "12",
    "filter": ".n12",
    "label": "Client"
  },
  {
    "liste": "9",
    "filter": ".n9",
    "label": "Most recent"
  },
  {
    "liste": "11",
    "filter": ".n11",
    "label": "Type of work"
  }
];

export const FILTER_LISTS: Record<string, FilterOption[]> = {
  "9": [],
  "11": [
    {
      "filter": ".n64",
      "label": "360"
    },
    {
      "filter": ".n16",
      "label": "Brand Influence"
    },
    {
      "filter": ".n14",
      "label": "Creative Content"
    },
    {
      "filter": ".n15",
      "label": "Event Design"
    },
    {
      "filter": ".n27",
      "label": "Roadshow"
    },
    {
      "filter": ".n17",
      "label": "Shopper Experience"
    }
  ],
  "12": [
    {
      "filter": ".n18",
      "label": "adidas"
    },
    {
      "filter": ".n54",
      "label": "adidas originals"
    },
    {
      "filter": ".n51",
      "label": "Bape"
    },
    {
      "filter": ".n49",
      "label": "Citadium"
    },
    {
      "filter": ".n46",
      "label": "Clairefontaine"
    },
    {
      "filter": ".n53",
      "label": "Courir"
    },
    {
      "filter": ".n45",
      "label": "Desperados"
    },
    {
      "filter": ".n61",
      "label": "Edelweiss"
    },
    {
      "filter": ".n57",
      "label": "Epic Games"
    },
    {
      "filter": ".n63",
      "label": "Euroleague"
    },
    {
      "filter": ".n23",
      "label": "Galeries Lafayette"
    },
    {
      "filter": ".n24",
      "label": "Get"
    },
    {
      "filter": ".n59",
      "label": "Gorillas"
    },
    {
      "filter": ".n19",
      "label": "Heineken"
    },
    {
      "filter": ".n60",
      "label": "Henry Jacques"
    },
    {
      "filter": ".n62",
      "label": "Implustar"
    },
    {
      "filter": ".n21",
      "label": "Jordan"
    },
    {
      "filter": ".n47",
      "label": "Levis"
    },
    {
      "filter": ".n44",
      "label": "Mort Subite"
    },
    {
      "filter": ".n55",
      "label": "Netflix"
    },
    {
      "filter": ".n50",
      "label": "PMU"
    },
    {
      "filter": ".n48",
      "label": "Premiere Vision"
    },
    {
      "filter": ".n52",
      "label": "Radar"
    },
    {
      "filter": ".n22",
      "label": "Reebok"
    },
    {
      "filter": ".n66",
      "label": "SNS"
    },
    {
      "filter": ".n58",
      "label": "Sony Music"
    },
    {
      "filter": ".n56",
      "label": "Soupline"
    },
    {
      "filter": ".n41",
      "label": "Timberland"
    },
    {
      "filter": ".n43",
      "label": "Undiz"
    },
    {
      "filter": ".n26",
      "label": "Vans"
    },
    {
      "filter": ".n42",
      "label": "Villa Schweppes"
    },
    {
      "filter": ".n65",
      "label": "Women in Tech"
    }
  ]
};

export const PROJECTS: Project[] = [
  {
    "href": "https://www.weareyoung-agency.com/projects/sns-paris-football-week/",
    "zIndex": 99,
    "tags": [
      "n16",
      "n12",
      "n15",
      "n66",
      "n11"
    ],
    "image": "/way/uploads/2024/07/3.webp",
    "hover": "/way/uploads/2024/07/2-scaled.webp",
    "title": "PARIS FOOTBALL WEEK",
    "client": "_ SNS"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/adidas-arena/",
    "zIndex": 98,
    "tags": [
      "n64",
      "n18",
      "n12",
      "n14",
      "n15",
      "n9",
      "n11"
    ],
    "image": "/way/uploads/2024/05/areana00.webp",
    "hover": "/way/uploads/2024/05/arena.webp",
    "title": "ARENA",
    "client": "_ adidas"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/adidas-this-is-new-rugby/",
    "zIndex": 97,
    "tags": [
      "n64",
      "n18",
      "n12",
      "n14",
      "n9",
      "n11"
    ],
    "image": "/way/uploads/2024/05/off-1-scaled.webp",
    "hover": "/way/uploads/2024/05/on-1-scaled.webp",
    "title": "THIS IS NEW RUGBY",
    "client": "_ adidas"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/women-in-tech-beyond-ceiling/",
    "zIndex": 96,
    "tags": [
      "n12",
      "n14",
      "n9",
      "n11",
      "n65"
    ],
    "image": "/way/uploads/2024/05/002-scaled.webp",
    "hover": "/way/uploads/2024/05/001-scaled.webp",
    "title": "BEYOND CEILING",
    "client": "_ WOMEN IN TECH"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/adidas-this-is-new-rugby-flagship/",
    "zIndex": 95,
    "tags": [
      "n18",
      "n12",
      "n9",
      "n17",
      "n11"
    ],
    "image": "/way/uploads/2024/05/off-scaled.webp",
    "hover": "/way/uploads/2024/05/on-scaled.webp",
    "title": "THIS IS NEW RUGBY @FLAGSHIP",
    "client": "_ adidas"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/euroleague-off-court/",
    "zIndex": 94,
    "tags": [
      "n12",
      "n63",
      "n15",
      "n11"
    ],
    "image": "/way/uploads/2023/09/jlnjlvt-scaled.webp",
    "hover": "/way/uploads/2023/09/jlnjlvt-bis-scaled.webp",
    "title": "OFF COURT",
    "client": "_ EUROLEAGUE"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/quai-54/",
    "zIndex": 93,
    "tags": [
      "n16",
      "n12",
      "n15",
      "n21",
      "n9",
      "n11"
    ],
    "image": "/way/uploads/2023/08/on-2.webp",
    "hover": "/way/uploads/2023/08/on-1.webp",
    "title": "QUAI 54",
    "client": "_ JORDAN"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/saison-xi/",
    "zIndex": 92,
    "tags": [
      "n16",
      "n12",
      "n15",
      "n62",
      "n9",
      "n11"
    ],
    "image": "/way/uploads/2023/08/off-v2.webp",
    "hover": "/way/uploads/2023/08/off-1.webp",
    "title": "SAISON XI",
    "client": "_ IMPULSTAR"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/ucl/",
    "zIndex": 91,
    "tags": [
      "n18",
      "n12",
      "n15",
      "n11"
    ],
    "image": "/way/uploads/2023/08/off.webp",
    "hover": "/way/uploads/2023/08/on.webp",
    "title": "UCL",
    "client": "_ ADIDAS"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/radar-red-house/",
    "zIndex": 90,
    "tags": [
      "n12",
      "n15",
      "n52",
      "n11"
    ],
    "image": "/way/uploads/2023/08/of.webp",
    "hover": "/way/uploads/2023/08/on-jpg.webp",
    "title": "RED HOUSE",
    "client": "_ RADAR"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/bose-x-jain-2/",
    "zIndex": 89,
    "tags": [
      "n12",
      "n14",
      "n17",
      "n58",
      "n11"
    ],
    "image": "/way/uploads/2022/12/home-min.webp",
    "hover": "/way/uploads/2022/12/julien-jolivet-scaled.webp",
    "title": "BOSE x JAIN",
    "client": "_ SONY MUSIC FRANCE"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/mr-a-adidas-originals/",
    "zIndex": 88,
    "tags": [
      "n54",
      "n12",
      "n14",
      "n15",
      "n11"
    ],
    "image": "/way/uploads/2022/12/off-1.webp",
    "hover": "/way/uploads/2022/12/on.webp",
    "title": "MR. A",
    "client": "_ ADIDAS ORIGINALS"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/feel-the-alps-edelweiss/",
    "zIndex": 87,
    "tags": [
      "n16",
      "n12",
      "n14",
      "n61",
      "n15",
      "n11"
    ],
    "image": "/way/uploads/2022/12/experiences-min-1.webp",
    "hover": "/way/uploads/2022/12/logistics-min-1.webp",
    "title": "FEEL THE ALPS",
    "client": "_ EDELWEISS"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/henry-jacques/",
    "zIndex": 86,
    "tags": [
      "n12",
      "n15",
      "n60",
      "n11"
    ],
    "image": "/way/uploads/2022/12/m4a1907-20220513114130418-scaled.webp",
    "hover": "/way/uploads/2022/12/m4a1899-20220513114130418-scaled.webp",
    "title": "AVENUE MONTAIGNE",
    "client": "_ HENRY JACQUES"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/adidas-originals-confirmed/",
    "zIndex": 85,
    "tags": [
      "n54",
      "n12",
      "n14",
      "n15",
      "n11"
    ],
    "image": "/way/uploads/2022/06/confirmed.webp",
    "hover": "/way/uploads/2022/06/capture-dexxcran-2022-06-10-axx-19.02.49.webp",
    "title": "CONFIRMED",
    "client": "_ ADIDAS ORIGINALS"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/adidas-originals-paris-basketball/",
    "zIndex": 84,
    "tags": [
      "n64",
      "n54",
      "n16",
      "n12",
      "n14",
      "n11"
    ],
    "image": "/way/uploads/2022/05/bball00.webp",
    "hover": "/way/uploads/2022/05/on-gazo.webp",
    "title": "PARIS BASKETBALL",
    "client": "_ ADIDAS ORIGINALS"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/gorillas-x-all-star-game/",
    "zIndex": 83,
    "tags": [
      "n12",
      "n14",
      "n15",
      "n59",
      "n9",
      "n11"
    ],
    "image": "/way/uploads/2022/05/home-2-scaled.webp",
    "hover": "/way/uploads/2022/05/gogo.webp",
    "title": "GORILLAS x ALL STAR GAME",
    "client": "_ GORILLAS"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/messi-goats/",
    "zIndex": 82,
    "tags": [
      "n18",
      "n12",
      "n14",
      "n15",
      "n11"
    ],
    "image": "/way/uploads/2022/04/home-600x400.webp",
    "hover": "/way/uploads/2022/04/on-400x267.webp",
    "title": "MESSI GOATS",
    "client": "_ ADIDAS"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/reebok-x-jul/",
    "zIndex": 81,
    "tags": [
      "n64",
      "n16",
      "n12",
      "n14",
      "n22",
      "n17",
      "n11"
    ],
    "image": "/way/uploads/2022/04/home-jlnjlvt-600x400.webp",
    "hover": "/way/uploads/2022/04/on-jlnjlvt-400x267.webp",
    "title": "REEBOK x JUL",
    "client": "_ REEBOK"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/bose-x-jain/",
    "zIndex": 80,
    "tags": [
      "n64",
      "n12",
      "n14",
      "n17",
      "n58",
      "n11"
    ],
    "image": "/way/uploads/2021/11/off-600x400.webp",
    "hover": "/way/uploads/2021/11/on-400x267.webp",
    "title": "BOSE x JAIN",
    "client": "_ SONY MUSIC FRANCE"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/go-crazy-in-fortnite/",
    "zIndex": 79,
    "tags": [
      "n64",
      "n16",
      "n12",
      "n14",
      "n57",
      "n11"
    ],
    "image": "/way/uploads/2021/09/off-go-crazy-in-fornite-x-we-are-young-agency-600x400.webp",
    "hover": "/way/uploads/2021/09/on-go-crazy-in-fornite-x-we-are-young-agency-copie-400x267.webp",
    "title": "GO CRAZY IN FORTNITE",
    "client": "_ Epic Games"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/mon-dressing-soupline/",
    "zIndex": 78,
    "tags": [
      "n16",
      "n12",
      "n14",
      "n56",
      "n11"
    ],
    "image": "/way/uploads/2021/04/on-1-600x400.webp",
    "hover": "/way/uploads/2021/04/off-1-400x267.webp",
    "title": "MON DRESSING SOUPLINE",
    "client": "_ Soupline"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/netflix-en-passant-pecho-hackday/",
    "zIndex": 77,
    "tags": [
      "n16",
      "n12",
      "n14",
      "n55",
      "n11"
    ],
    "image": "/way/uploads/2021/04/jlnjlvt-1-600x337.webp",
    "hover": "/way/uploads/2021/04/off-netflix-copie-400x221.webp",
    "title": "“EN PASSANT PÉCHO” HACKDAY",
    "client": "_ Netflix"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/adidas-originals-zx-x-13-block/",
    "zIndex": 76,
    "tags": [
      "n64",
      "n54",
      "n12",
      "n14",
      "n9",
      "n17",
      "n11"
    ],
    "image": "/way/uploads/2020/11/030-full-body-zefor-03-060-16x9-600x338.webp",
    "hover": "/way/uploads/2020/11/080-full-body-oldpee-01-054-16x9-400x225.webp",
    "title": "ZX x 13 BLOCK",
    "client": "_ adidas originals"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/courir-40ans/",
    "zIndex": 75,
    "tags": [
      "n64",
      "n16",
      "n12",
      "n53",
      "n14",
      "n11"
    ],
    "image": "/way/uploads/2020/11/jlnjlvt-600x400.webp",
    "hover": "/way/uploads/2020/11/adidas-x-ed-banger-400x267.webp",
    "title": "40 ANS",
    "client": "_ Courir"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/adidas-originals-zx-x-vald/",
    "zIndex": 74,
    "tags": [
      "n64",
      "n54",
      "n12",
      "n14",
      "n17",
      "n11"
    ],
    "image": "/way/uploads/2020/11/vald-600x345.webp",
    "hover": "/way/uploads/2020/11/vald2-400x230.webp",
    "title": "ZX x VALD",
    "client": "_ adidas originals"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/reebok-lahaine/",
    "zIndex": 73,
    "tags": [
      "n64",
      "n16",
      "n12",
      "n14",
      "n22",
      "n11"
    ],
    "image": "/way/uploads/2020/10/reebok-x-la-haine-jlnjlvt-1-600x400.webp",
    "hover": "/way/uploads/2020/10/n01a0172-400x267.webp",
    "title": "LA HAINE",
    "client": "_ REEBOK"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/radar-drive-in/",
    "zIndex": 72,
    "tags": [
      "n16",
      "n12",
      "n15",
      "n52",
      "n11"
    ],
    "image": "/way/uploads/2020/10/off-600x400.webp",
    "hover": "/way/uploads/2020/10/on-400x267.webp",
    "title": "DRIVE IN",
    "client": "_ RADAR"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/bape_fr/",
    "zIndex": 71,
    "tags": [
      "n51",
      "n16",
      "n12",
      "n14",
      "n11"
    ],
    "image": "/way/uploads/2020/04/shooting-bapexx-hotel-pigalle-jlnjlvt-2-600x400.webp",
    "hover": "/way/uploads/2020/04/shooting-bapexx-hotel-pigalle-jlnjlvt-3-400x267.webp",
    "title": "@BAPE_FR",
    "client": "_ BAPE"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/citadium-good-games/",
    "zIndex": 70,
    "tags": [
      "n16",
      "n49",
      "n12",
      "n14",
      "n17",
      "n11"
    ],
    "image": "/way/uploads/2020/04/citadium-good-gaming-way-agency-1-600x480.webp",
    "hover": "/way/uploads/2020/04/citadium-good-gaming-way-agency-2-400x320.webp",
    "title": "GOOD GAMES",
    "client": "_ CITADIUM"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/radar/",
    "zIndex": 69,
    "tags": [
      "n16",
      "n12",
      "n15",
      "n52",
      "n27",
      "n11"
    ],
    "image": "/way/uploads/2020/02/radar-desperados-jlnjlvt-600x401.webp",
    "hover": "/way/uploads/2020/02/radar-stage-desperados-jlnjlvt-400x267.webp",
    "title": "RADAR",
    "client": "_ RADAR"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/pmu-le-grand-prix-des-heros/",
    "zIndex": 68,
    "tags": [
      "n12",
      "n15",
      "n50",
      "n11"
    ],
    "image": "/way/uploads/2020/04/way-x-pmu-52-600x774.webp",
    "hover": "/way/uploads/2020/04/way-x-pmu-44-400x465.webp",
    "title": "GRAND PRIX DES HEROS",
    "client": "_ PMU"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/premiere-vision/",
    "zIndex": 67,
    "tags": [
      "n12",
      "n14",
      "n15",
      "n48",
      "n11"
    ],
    "image": "/way/uploads/2020/01/we-are-young-x-premiere-vision-winter-1-2-600x400.webp",
    "hover": "/way/uploads/2020/01/we-are-young-x-premiere-vision-winter-2-400x267.webp",
    "title": "AW/19",
    "client": "_ PREMIÈRE VISION"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/adidas-take-on-summer-paris-2019/",
    "zIndex": 66,
    "tags": [
      "n18",
      "n16",
      "n12",
      "n15",
      "n11"
    ],
    "image": "/way/uploads/2019/09/we-are-young-x-adidas-take-on-summer-paris-2-600x400.webp",
    "hover": "/way/uploads/2019/09/we-are-young-x-adidas-take-on-summer-paris-1-400x267.webp",
    "title": "TAKE ON SUMMER",
    "client": "_ ADIDAS"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/levis-x-ag2r-la-mondiale-off-road/",
    "zIndex": 65,
    "tags": [
      "n16",
      "n12",
      "n14",
      "n47",
      "n17",
      "n11"
    ],
    "image": "/way/uploads/2019/07/we-are-young-x-levis-ag2r-off-600x400.webp",
    "hover": "/way/uploads/2019/07/we-are-young-x-levis-ag2r-on-400x267.webp",
    "title": "OFF-ROAD",
    "client": "_ LEVIS"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/undiz-unexpected-beach-party/",
    "zIndex": 64,
    "tags": [
      "n16",
      "n12",
      "n15",
      "n11",
      "n43"
    ],
    "image": "/way/uploads/2019/07/we-are-young-x-undiz-unexpected-beach-party-1-1-600x400.webp",
    "hover": "/way/uploads/2019/07/we-are-young-x-undiz-unexpected-beach-party-2-on-400x236.webp",
    "title": "UNEXPECTED BEACH PARTY",
    "client": "_ UNDIZ"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/reebok-doner-kebab/",
    "zIndex": 63,
    "tags": [
      "n16",
      "n12",
      "n15",
      "n22",
      "n11"
    ],
    "image": "/way/uploads/2019/07/we-are-young-x-reebok-doxxner-kebab-off-600x400.webp",
    "hover": "/way/uploads/2019/07/we-are-young-x-reebok-doxxner-kebab-on-400x267.webp",
    "title": "DÖNER KEBAB",
    "client": "_ REEBOK"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/clairefontaine-toutankhamon/",
    "zIndex": 62,
    "tags": [
      "n46",
      "n12",
      "n14",
      "n11"
    ],
    "image": "/way/uploads/2019/07/brandcontent-600x402.webp",
    "hover": "/way/uploads/2019/07/we-are-young-x-clairefontaine-off-400x267.webp",
    "title": "TOUTÂNKHAMON",
    "client": "_ CLAIREFONTAINE"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/adidas-tango-arena/",
    "zIndex": 61,
    "tags": [
      "n18",
      "n16",
      "n12",
      "n14",
      "n15",
      "n11"
    ],
    "image": "/way/uploads/2019/02/adidas-tango-arena-x-we-are-young-agencyxx-93-empire-x-garde-rexxpublicaine-9-1-600x337.webp",
    "hover": "/way/uploads/2019/02/adidas-tango-arena-x-we-are-young-agencyxx-93-empire-x-garde-rexxpublicaine-36-400x225.webp",
    "title": "TANGO ARENA",
    "client": "_ adidas"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/undiz-xmas-market/",
    "zIndex": 60,
    "tags": [
      "n16",
      "n12",
      "n15",
      "n11",
      "n43"
    ],
    "image": "/way/uploads/2019/02/undiz-xmas-market-x-we-are-young-agencyxx-off-i-600x400.webp",
    "hover": "/way/uploads/2019/02/undiz-xmas-market-x-we-are-young-agencyxx-on-400x241.webp",
    "title": "XMAS MARKET",
    "client": "_ Undiz"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/the-timberland-studio/",
    "zIndex": 59,
    "tags": [
      "n16",
      "n12",
      "n15",
      "n41",
      "n11"
    ],
    "image": "/way/uploads/2019/02/timberland-the-studio-x-we-are-young-agencyxx-off-600x400.webp",
    "hover": "/way/uploads/2019/02/timberland-the-studio-x-we-are-young-agencyxx-on-400x267.webp",
    "title": "THE TIMBERLAND STUDIO",
    "client": "_ TIMBERLAND"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/adidas-tango-league/",
    "zIndex": 58,
    "tags": [
      "n18",
      "n16",
      "n12",
      "n14",
      "n15",
      "n11"
    ],
    "image": "/way/uploads/2018/09/adidas-tango-league-x-we-are-young-agencyxx-off-1-600x361.webp",
    "hover": "/way/uploads/2018/09/adidas-tango-league-x-we-are-young-agencyxx-set-up-400x267.webp",
    "title": "TANGO LEAGUE",
    "client": "_ ADIDAS"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/adidas-playground-zz10/",
    "zIndex": 57,
    "tags": [
      "n18",
      "n16",
      "n12",
      "n14",
      "n11"
    ],
    "image": "/way/uploads/2018/09/Photo-11-06-2018-14-47-06-3-600x338.webp",
    "hover": "/way/uploads/2018/09/adidas-playground-zz10-x-we-are-young-agencyxx-over-400x267.webp",
    "title": "PLAYGROUND ZZ10",
    "client": "_ ADIDAS"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/desperados-festivals/",
    "zIndex": 56,
    "tags": [
      "n12",
      "n45",
      "n15",
      "n27",
      "n11"
    ],
    "image": "/way/uploads/2018/10/img-9868-600x400.webp",
    "hover": "/way/uploads/2018/10/desperados-solidays-x-we-are-young-agency-06-400x267.webp",
    "title": "FESTIVALS",
    "client": "_ DESPERADOS"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/heineken-beer-factory/",
    "zIndex": 55,
    "tags": [
      "n12",
      "n15",
      "n19",
      "n27",
      "n11"
    ],
    "image": "/way/uploads/2018/10/Beer-Factory-Heineken-x-We-Are-Young-Agency-01-600x400.webp",
    "hover": "/way/uploads/2018/10/beer-factory-heineken-x-we-are-young-agency-17-400x267.webp",
    "title": "BEER FACTORY",
    "client": "_ HEINEKEN"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/desperados-patch-edition/",
    "zIndex": 54,
    "tags": [
      "n16",
      "n12",
      "n45",
      "n17",
      "n11"
    ],
    "image": "/way/uploads/2018/09/desperados-patch-edition-x-we-are-young-agencyxx-liste-600x375.webp",
    "hover": "/way/uploads/2018/09/desperados-patch-edition-x-we-are-young-agencyxx-over-400x267.webp",
    "title": "PATCH EDITION",
    "client": "_ DESPERADOS"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/reebok-24-hours-boxing/",
    "zIndex": 53,
    "tags": [
      "n64",
      "n16",
      "n12",
      "n14",
      "n22",
      "n17",
      "n11"
    ],
    "image": "/way/uploads/2018/10/reebok-24-hours-boxing-x-we-are-young-agencyxx-liste-600x399.webp",
    "hover": "/way/uploads/2018/10/reebok-24-hours-boxing-x-we-are-young-agencyxx-over-400x266.webp",
    "title": "24 HOUR BOXING",
    "client": "_ REEBOK"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/reebok-24-hours-training/",
    "zIndex": 52,
    "tags": [
      "n64",
      "n16",
      "n12",
      "n14",
      "n22",
      "n17",
      "n11"
    ],
    "image": "/way/uploads/2019/02/reebok-24-hours-training-x-we-are-young-agencyxx47-600x338.webp",
    "hover": "/way/uploads/2019/02/reebok-24-hours-training-x-we-are-young-agencyxx35-1-400x225.webp",
    "title": "24 HOUR TRAINING",
    "client": "_ REEBOK"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/adidas-glitch/",
    "zIndex": 51,
    "tags": [
      "n18",
      "n16",
      "n12",
      "n14",
      "n11"
    ],
    "image": "/way/uploads/2018/10/7-DSC09546-600x400.webp",
    "hover": "/way/uploads/2018/10/5-DSC06765-400x600.webp",
    "title": "GLITCH",
    "client": "_ ADIDAS"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/jordan-quai-54/",
    "zIndex": 50,
    "tags": [
      "n16",
      "n12",
      "n15",
      "n21",
      "n11"
    ],
    "image": "/way/uploads/2018/09/P1000557-600x338.webp",
    "hover": "/way/uploads/2018/10/p1000504-400x225.webp",
    "title": "QUAI 54",
    "client": "_ JORDAN"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/adidas-pulse/",
    "zIndex": 49,
    "tags": [
      "n18",
      "n16",
      "n12",
      "n17",
      "n11"
    ],
    "image": "/way/uploads/2019/02/adidas-pulse-x-we-are-young-agencyxx-off-600x400.webp",
    "hover": "/way/uploads/2019/02/adidas-pulse-x-we-are-young-agencyxx-on-400x267.webp",
    "title": "PULSE",
    "client": "_ adidas"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/adidas-challenge-my-game/",
    "zIndex": 48,
    "tags": [
      "n18",
      "n16",
      "n12",
      "n14",
      "n27",
      "n11"
    ],
    "image": "/way/uploads/2018/09/adidas-challenge-my-game-x-we-are-young-agencyxx-off-600x357.webp",
    "hover": "/way/uploads/2018/09/adidas-challenge-my-game-x-we-are-young-agencyxx-on-2-400x238.webp",
    "title": "CHALLENGE MY GAME",
    "client": "_ ADIDAS"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/adidas-project-harden/",
    "zIndex": 47,
    "tags": [
      "n18",
      "n16",
      "n12",
      "n14",
      "n11"
    ],
    "image": "/way/uploads/2018/10/Project-Harden-adidas-x-We-Are-Young-Agency40-600x400.webp",
    "hover": "/way/uploads/2018/10/project-harden-adidas-x-we-are-young-agency1-400x267.webp",
    "title": "PROJECT HARDEN",
    "client": "_ ADIDAS"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/get-fresh-touch/",
    "zIndex": 46,
    "tags": [
      "n12",
      "n24",
      "n27",
      "n11"
    ],
    "image": "/way/uploads/2018/10/img-0330-600x400.webp",
    "hover": "/way/uploads/2018/10/img-0326-400x267.webp",
    "title": "FRESH TOUCH",
    "client": "_ GET"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/galeries-lafayette-summer-break/",
    "zIndex": 45,
    "tags": [
      "n16",
      "n12",
      "n14",
      "n23",
      "n17"
    ],
    "image": "/way/uploads/2019/01/galeries-lafayette-break-x-we-are-young-agencyxx-on-1-600x357.webp",
    "hover": "/way/uploads/2019/01/galeries-lafayette-break-x-we-are-young-agencyxx-off-1-400x238.webp",
    "title": "SUMMER BREAK",
    "client": "_ GALERIES LAFAYETTE"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/adidas-creators-arena/",
    "zIndex": 44,
    "tags": [
      "n18",
      "n16",
      "n12",
      "n14",
      "n15",
      "n11"
    ],
    "image": "/way/uploads/2018/10/goa-4811-600x400.webp",
    "hover": "/way/uploads/2018/09/adidas-creators-arena-we-are-young-agencyxx-400x267.webp",
    "title": "CREATORS ARENA",
    "client": "_ adidas"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/villa-schweppes-bpm-contest/",
    "zIndex": 43,
    "tags": [
      "n14",
      "n15",
      "n27",
      "n42"
    ],
    "image": "/way/uploads/2019/01/bpm-contest-x-way-jlnjlvt-01-600x412.webp",
    "hover": "/way/uploads/2019/01/bpm-contest-x-way-jlnjlvt-02-400x274.webp",
    "title": "BPM CONTEST",
    "client": "_ VILLA SCHWEPPES"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/mort-subite-baraque-a-lambics/",
    "zIndex": 42,
    "tags": [
      "n12",
      "n15",
      "n44",
      "n27",
      "n11"
    ],
    "image": "/way/uploads/2018/10/mort-subite-baraque-axx-lambics-x-we-are-young-agencyxx-029-600x421.webp",
    "hover": "/way/uploads/2018/10/mort-subite-baraque-axx-lambics-x-we-are-young-agencyxx-08-1-400x281.webp",
    "title": "BARAQUE À LAMBICS",
    "client": "_ MORT SUBITE"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/adidas-tango-league-saison-2/",
    "zIndex": 41,
    "tags": [
      "n18",
      "n16",
      "n12",
      "n14",
      "n15",
      "n11"
    ],
    "image": "/way/uploads/2018/10/adidas-tango-league-x-we-are-young-agencyxx-off-600x338.webp",
    "hover": "/way/uploads/2018/10/adidas-tango-league-x-we-are-young-agencyxx-on-400x267.webp",
    "title": "TANGO LEAGUE",
    "client": "_ ADIDAS"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/vans-weatherized/",
    "zIndex": 40,
    "tags": [
      "n16",
      "n12",
      "n14",
      "n17",
      "n11",
      "n26"
    ],
    "image": "/way/uploads/2018/10/vans-citadium-c-nicolas-jacquemin-la-clef-81-1-600x401.webp",
    "hover": "/way/uploads/2018/10/vans-citadium-c-nicolas-jacquemin-la-clef-101-1-400x267.webp",
    "title": "WEATHERIZED",
    "client": "_ VANS"
  },
  {
    "href": "https://www.weareyoung-agency.com/projects/desperados-blacklisted/",
    "zIndex": 39,
    "tags": [
      "n16",
      "n12",
      "n45",
      "n15",
      "n11"
    ],
    "image": "/way/uploads/2018/12/desperados-blacklisted-x-we-are-young-agencyxx14-600x400.webp",
    "hover": "/way/uploads/2018/12/desperados-blacklisted-x-we-are-young-agencyxx5-1-400x267.webp",
    "title": "BLACKLISTED",
    "client": "_ DESPERADOS"
  }
];
