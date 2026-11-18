import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
    DIGITAL_ASCENT_ARC_URL,
    FORBIDDEN_ASIN,
    FRACTURED_GROUND_KINDLE_URL,
    HUNTED_BOOKFUNNEL_URL,
} from "@/lib/books";
import { geoCatalog, pickGeoHint } from "@/lib/content/geo";
import { publicPaths } from "@/lib/content/paths";
import { isLive } from "@/lib/content/text";
import { monthlyCapErrors, readContent, validateContent } from "@/lib/content/validate";
import { mapBlog, mapLanding } from "./import-month-plan";

const repo = process.cwd();
let failed = 0;

function check(name: string, condition: boolean, detail = "") {
    if (condition) {
        console.log(`PASS ${name}`);
        return;
    }
    failed += 1;
    console.error(`FAIL ${name}${detail ? `: ${detail}` : ""}`);
}

function filler(id: string, count: number): string {
    return Array.from({ length: count }, (_, index) => `${id}w${index}`).join(" ");
}

function writeFixture(dir: string, options: { landings: number; posts: number; month: string }) {
    const content = path.join(dir, "content");
    fs.mkdirSync(path.join(content, "landing"), { recursive: true });
    fs.mkdirSync(path.join(content, "blog"), { recursive: true });
    fs.mkdirSync(path.join(content, "microbooks"), { recursive: true });
    fs.mkdirSync(path.join(content, "locations"), { recursive: true });
    const stateIntro = `Texas ${filler("stateintro", 90)}`;
    fs.writeFileSync(path.join(content, "locations", "states.json"), JSON.stringify({
        texas: {
            name: "Texas",
            code: "TX",
            seoTitle: "Texas fixture shelf for cap tests | AJ Ghost",
            seoDescription: "Texas fixture description used only by the monthly cap test, with enough characters to clear the minimum length.",
            intro: stateIntro,
        },
    }, null, 2));
    fs.writeFileSync(path.join(content, "microbooks", "fixture-story.md"), `---
id: MBFIX
title: Fixture Story
slug: fixture-story
url_path: /free-reads/fixture-story/
pov: fixture
when: fixture night
setting_mood: fixture lot
logline: A fixture story used only to satisfy the microbook reference.
canon_notes: Fixture notes for the cap test and nothing else.
label: Fixture companion story for tests.
publish_date: "2026-01-01"
status: scheduled
example: false
---

${filler("storybody", 420)}
`);
    for (let index = 1; index <= options.landings; index += 1) {
        const nn = String(index).padStart(2, "0");
        const id = `t${nn}`;
        const city = `Metro ${nn}`;
        const landing = {
            id: `LP-${id}`,
            type: "landing_page",
            slug: `fixture-${id}`,
            url_path: `/free-thriller/texas/metro-${nn}/`,
            state: "TX",
            city,
            page_kind: "city",
            search_intent: `${city} readers want a short dark fixture read`,
            target_keyword: `${city} thriller`,
            title: `${city} ${id} night thriller page | AJ Ghost`,
            meta_description: `${city} page ${id} has a free in-page story and then HUNTED free on BookFunnel for local readers tonight.`,
            h1: `${city} ${id} reads after dark`,
            intro: `${city} Texas ${filler(`intro${id}`, 170)}`,
            local_angle: { label: `Night ${id}`, description: `${city} drivers want a short dark read tonight now.` },
            hunted_hook: { manuscript_line: 1, text: "Count. Measure. Document.", source: "fixture" },
            microbook_id: "MBFIX",
            cta: { text: "Get HUNTED Free on BookFunnel", url: HUNTED_BOOKFUNNEL_URL },
            secondary_links: [],
            internal_links: [],
            publish_date: `${options.month}-15`,
            status: "scheduled",
            example: false,
        };
        fs.writeFileSync(path.join(content, "landing", `${landing.slug}.json`), JSON.stringify(landing, null, 2));
    }
    for (let index = 1; index <= options.posts; index += 1) {
        const nn = String(index).padStart(2, "0");
        const id = `b${nn}`;
        const slug = `fixture-note-${id}`;
        const body = `Example ${filler(`post${id}`, 290)}\n\nRead the [story](/free-reads/fixture-story/).\n\n<BookCta />\n`;
        const mdx = `---
id: BL-${id}
type: blog_post
slug: ${slug}
url_path: /blog/${slug}/
title: "Example fixture post ${id} for the cap"
meta_description: "Example ${id} description with enough length for the cap fixture and a note that HUNTED stays on BookFunnel."
target_keyword: "fixture ${id}"
search_intent: "Example intent ${id}"
source_promo: "fixture-${id}"
category: "Field notes"
tags:
  - Example
  - Fixture
hook: "Example hook ${id} for the monthly cap fixture post."
publish_date: "${options.month}-02"
status: scheduled
example: true
cta:
  text: Get HUNTED Free on BookFunnel
  url: ${HUNTED_BOOKFUNNEL_URL}
social:
  xThread:
    - "Example thread ${id} first post for the cap fixture."
    - "Example thread ${id} second post for the cap fixture."
    - "Example thread ${id} third post for the cap fixture."
  carousel:
    - "Example slide ${id} one"
    - "Example slide ${id} two"
    - "Example slide ${id} three"
  shortFormHook: "Example short hook ${id} for the cap fixture."
---

${body}`;
        fs.writeFileSync(path.join(content, "blog", `${slug}.mdx`), mdx);
    }
}

function assertOnlyCap(dir: string, kind: string) {
    const errors = validateContent(readContent(dir));
    const cap = errors.filter((error) => error.startsWith("Monthly cap exceeded"));
    check(`${kind} cap error present`, cap.length > 0, errors.join(" | "));
    check(`${kind} failure is only the cap`, errors.length === cap.length, errors.filter((error) => !error.startsWith("Monthly cap exceeded")).join(" | "));
}

const real = readContent(repo);
const realErrors = validateContent(real);
check("seed content passes", realErrors.length === 0, realErrors.join(" | "));

const early = publicPaths(real, new Date("2026-11-11T12:00:00Z")).map((item) => item.path);
check("Nov 11 includes Houston", early.includes("/free-thriller/texas/houston/"));
check("Nov 11 excludes Dallas", !early.includes("/free-thriller/texas/dallas/"));
check("Nov 11 excludes Austin", !early.includes("/free-thriller/texas/austin/"));
check("Nov 11 includes free read", early.includes("/free-reads/streetlight-math/"));
check("Nov 11 includes Houston post", early.includes("/blog/example-houston-night-shift/"));
check("Nov 11 excludes Dallas post", !early.includes("/blog/example-dallas-parked-car/"));

const live = publicPaths(real, new Date("2026-11-18T18:00:00Z")).map((item) => item.path);
check("Nov 18 includes all three cities", ["houston", "dallas", "austin"].every((city) => live.includes(`/free-thriller/texas/${city}/`)));
check("Nov 18 includes all three posts", [
    "/blog/example-houston-night-shift/",
    "/blog/example-dallas-parked-car/",
    "/blog/example-austin-weekly-letter/",
].every((route) => live.includes(route)));
check("sitemap paths are only known routes", live.every((route) => route === "/" || route.startsWith("/free-") || route.startsWith("/blog") || route === "/contact/"));

check("draft_planned stays offline", !isLive({ publishDate: "2020-01-01", publishAt: "2020-01-01T00:00:00Z", status: "draft_planned" }, new Date("2026-11-18T00:00:00Z")));
check("scheduled past date is live", isLive({ publishDate: "2026-11-10", publishAt: "2026-11-10T15:00:00Z", status: "scheduled" }, new Date("2026-11-18T00:00:00Z")));

check("50 dates pass", monthlyCapErrors(Array.from({ length: 50 }, () => "2026-11-01"), "landing pages").length === 0);
check("51 dates fail", monthlyCapErrors(Array.from({ length: 51 }, () => "2026-11-01"), "blog posts").some((error) => error.includes("2026-11") && error.includes("51")));

const overPosts = fs.mkdtempSync(path.join(os.tmpdir(), "pseo-posts-"));
writeFixture(overPosts, { landings: 0, posts: 51, month: "2026-11" });
assertOnlyCap(overPosts, "51 blog posts");

const overLandings = fs.mkdtempSync(path.join(os.tmpdir(), "pseo-landings-"));
writeFixture(overLandings, { landings: 51, posts: 0, month: "2026-11" });
assertOnlyCap(overLandings, "51 landing pages");

const under = fs.mkdtempSync(path.join(os.tmpdir(), "pseo-ok-"));
writeFixture(under, { landings: 50, posts: 50, month: "2026-12" });
const underErrors = validateContent(readContent(under));
check("50/50 in one month passes", underErrors.length === 0, underErrors.slice(0, 8).join(" | "));

const plan = JSON.parse(fs.readFileSync(path.join(repo, "plans", "month-1.json"), "utf8")) as {
    landing_pages: Record<string, unknown>[];
    blogs: Record<string, unknown>[];
    microbooks: { slug: string; url_path: string }[];
};
const mapped = plan.landing_pages.map((item) => mapLanding(item));
check("plan has 50 landings", mapped.length === 50);
check("plan has 50 blogs", plan.blogs.length === 50);
check("plan has 5 microbooks", plan.microbooks.length === 5);
check("plan landing cap passes", monthlyCapErrors(mapped.map((item) => String(item.publish_date)), "landing pages").length === 0);
check("plan blog cap passes", monthlyCapErrors(plan.blogs.map((item) => String(item.publish_date)), "blog posts").length === 0);
const houston = mapped.find((item) => item.slug === "free-thriller-houston-tx");
check("Houston url_path kept", houston?.url_path === "/free-thriller/texas/houston/");
check("Houston gains intro key", houston != null && "intro" in houston);
check("microbook canonical paths", plan.microbooks.every((book) => book.url_path === `/free-reads/${book.slug}/`));
const mappedBlog = mapBlog(plan.blogs[0]);
check("blog keeps slug", mappedBlog.slug === plan.blogs[0].slug);
check("blog gains category from intent", typeof mappedBlog.category === "string" && mappedBlog.category.length > 0);

const catalog = geoCatalog(real, new Date("2026-11-18T18:00:00Z"));
const houstonHint = pickGeoHint({ country: "US", region: "TX", city: "Houston", latitude: 29.76, longitude: -95.37 }, catalog.places, catalog.states);
check("Houston header matches Houston", houstonHint?.href === "/free-thriller/texas/houston/");
const sanAntonio = pickGeoHint({ country: "US", region: "TX", city: null, latitude: 29.4241, longitude: -98.4936 }, catalog.places, catalog.states);
check("San Antonio coordinates suggest Austin", sanAntonio?.href === "/free-thriller/texas/austin/");
const chicago = pickGeoHint({ country: "US", region: "IL", city: "Chicago", latitude: 41.8781, longitude: -87.6298 }, catalog.places, catalog.states);
check("Chicago gets no city page", chicago == null);
const stateOnly = pickGeoHint({ country: "US", region: "TX", city: "El Paso", latitude: null, longitude: null }, catalog.places, catalog.states);
check("Texas region without a city match suggests the state hub", stateOnly?.href === "/free-thriller/texas/");

const books = fs.readFileSync(path.join(repo, "src", "lib", "books.ts"), "utf8");
check("BookFunnel constant", books.includes(HUNTED_BOOKFUNNEL_URL));
check("Fractured Ground constant", books.includes(FRACTURED_GROUND_KINDLE_URL));
check("Digital Ascent constant", books.includes(DIGITAL_ASCENT_ARC_URL));
check("books.ts does not recommend the retired ASIN as a link", !books.includes(`amazon.com/dp/${FORBIDDEN_ASIN}`));

const tainted = fs.mkdtempSync(path.join(os.tmpdir(), "pseo-asin-"));
fs.cpSync(path.join(repo, "content"), path.join(tainted, "content"), { recursive: true });
const taintedFile = path.join(tainted, "content", "landing", "free-thriller-houston-tx.json");
const taintedJson = JSON.parse(fs.readFileSync(taintedFile, "utf8"));
taintedJson.note = FORBIDDEN_ASIN;
fs.writeFileSync(taintedFile, JSON.stringify(taintedJson));
check("forbidden ASIN fails validation", validateContent(readContent(tainted)).some((error) => error.includes(FORBIDDEN_ASIN)));

if (failed) {
    console.error(`\n${failed} check(s) failed.`);
    process.exit(1);
}
console.log("\nAll content checks passed.");
