export type LocalAngle = {
    label: string;
    description: string;
};

export type HuntedHook = {
    manuscriptLine?: number;
    text: string;
    source: string;
};

export type LinkItem = {
    text: string;
    url: string;
    kind?: string;
};

export type Cta = {
    text: string;
    subtext?: string;
    url: string;
    urlTracked?: string;
};

export type StoryPart = {
    id: string;
    title: string;
    body: string;
};

export type MicroBook = {
    id: string;
    title: string;
    slug: string;
    urlPath: string;
    pov: string;
    when: string;
    settingMood: string;
    logline: string;
    canonNotes: string;
    label: string;
    publishDate: string;
    publishAt?: string;
    status: string;
    example: boolean;
    body: string;
    wordCount: number;
    route: string;
    file: string;
};

export type LandingPage = {
    id: string;
    type: "landing_page";
    slug: string;
    urlPath: string;
    stateCode: string;
    stateSlug: string;
    stateName: string;
    cityName: string | null;
    citySlug: string | null;
    pageKind: "state_hub" | "city";
    searchIntent: string;
    targetKeyword: string;
    title: string;
    metaDescription: string;
    h1: string;
    intro: string;
    localAngle: LocalAngle;
    huntedHook: HuntedHook;
    microbookId: string;
    cta: Cta;
    secondaryLinks: LinkItem[];
    internalLinks: string[];
    publishDate: string;
    publishAt?: string;
    status: string;
    example: boolean;
    file: string;
    route: string;
};

export type SocialPack = {
    xThread: string[];
    carousel: string[];
    shortFormHook: string;
};

export type BlogPost = {
    id: string;
    type: "blog_post";
    slug: string;
    urlPath: string;
    title: string;
    metaDescription: string;
    targetKeyword: string;
    searchIntent: string;
    sourcePromo?: string;
    outline: string[];
    internalLinks: LinkItem[];
    cta: Cta;
    publishDate: string;
    publishAt?: string;
    status: string;
    example: boolean;
    category: string;
    categorySlug: string;
    tags: string[];
    tagSlugs: { name: string; slug: string }[];
    hook: string;
    author: string;
    social: SocialPack;
    body: string;
    wordCount: number;
    route: string;
    file: string;
};

export type StateDoc = {
    slug: string;
    name: string;
    code: string;
    seoTitle: string;
    seoDescription: string;
    intro: string;
};

export type CityCoord = {
    stateSlug: string;
    slug: string;
    name: string;
    lat: number;
    lng: number;
};

export type ContentIndex = {
    root: string;
    landings: LandingPage[];
    posts: BlogPost[];
    microbooks: MicroBook[];
    states: StateDoc[];
    cities: CityCoord[];
    problems: string[];
};

export type GeoPlace = {
    state: string;
    stateName: string;
    stateCode: string;
    city: string;
    cityName: string;
    lat: number;
    lng: number;
    href: string;
    label: string;
};

export type GeoState = {
    code: string;
    name: string;
    href: string;
};

export type GeoHint = {
    href: string;
    label: string;
    city: string;
    state: string;
    matchedBy: "city" | "coordinates" | "state";
};
