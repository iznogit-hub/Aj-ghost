import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { monthlyCapErrors } from "@/lib/content/validate";

type PlanLanding = Record<string, unknown> & { url_path?: string; slug?: string; publish_date?: string };
type PlanBlog = Record<string, unknown> & { slug?: string; publish_date?: string; search_intent?: string; target_keyword?: string };
type PlanFile = {
    microbooks?: Record<string, unknown>[];
    landing_pages?: PlanLanding[];
    blogs?: PlanBlog[];
};

export type MappedLanding = PlanLanding & { intro: string };
export type MappedBlog = PlanBlog & {
    category: string;
    tags: string[];
    hook: string;
    social: { xThread: string[]; carousel: string[]; shortFormHook: string };
};

/** Keep every plan field. Add the intro the site requires and the blog fields the plan does not carry. */
export function mapLanding(raw: PlanLanding): MappedLanding {
    return {
        ...raw,
        intro: typeof raw.intro === "string" ? raw.intro : "",
    };
}

export function mapBlog(raw: PlanBlog): MappedBlog {
    const intent = typeof raw.search_intent === "string" ? raw.search_intent : "Notes";
    const category = typeof raw.category === "string" && raw.category.trim()
        ? raw.category.trim()
        : intent.split(":")[0].trim() || "Notes";
    const keyword = typeof raw.target_keyword === "string" ? raw.target_keyword : "thriller";
    const tags = Array.isArray(raw.tags) ? (raw.tags as string[]) : [keyword, "Ryan Kane"];
    const social = (raw.social && typeof raw.social === "object"
        ? raw.social
        : { xThread: [], carousel: [], shortFormHook: "" }) as MappedBlog["social"];
    return {
        ...raw,
        category,
        tags,
        hook: typeof raw.hook === "string" ? raw.hook : "",
        social,
    };
}

export function blogToMdx(raw: PlanBlog): string {
    const mapped = mapBlog(raw);
    const body = [
        "Replace this stub before publishing. The validator requires at least 280 words, a markdown link to /free-thriller/, /free-reads/, or /blog/, and a BookCta component.",
        "",
        ...(Array.isArray(mapped.outline_h2) ? (mapped.outline_h2 as string[]).map((heading) => `## ${heading}`) : []),
        "",
        "<BookCta />",
        "",
    ].join("\n");
    return matter.stringify(body, mapped);
}

function readPlan(file: string): PlanFile {
    return JSON.parse(fs.readFileSync(file, "utf8")) as PlanFile;
}

function main() {
    const args = process.argv.slice(2);
    const write = args.includes("--write");
    const fileFlag = args.find((arg) => arg.startsWith("--plan="));
    const planPath = fileFlag ? fileFlag.slice("--plan=".length) : path.join(process.cwd(), "plans", "month-1.json");
    const outFlag = args.find((arg) => arg.startsWith("--out="));
    const outDir = outFlag ? outFlag.slice("--out=".length) : path.join(process.cwd(), "content");
    const plan = readPlan(planPath);
    const landings = (plan.landing_pages ?? []).map(mapLanding);
    const blogs = plan.blogs ?? [];
    const landingErrors = monthlyCapErrors(landings.map((item) => String(item.publish_date ?? "")), "landing pages");
    const blogErrors = monthlyCapErrors(blogs.map((item) => String(item.publish_date ?? "")), "blog posts");
    console.log(`Plan ${planPath}`);
    console.log(`Landings: ${landings.length}. Blogs: ${blogs.length}. Microbooks: ${plan.microbooks?.length ?? 0}.`);
    console.log("Landing url_path values are kept. Each landing gains an empty intro until you write 150–250 unique words.");
    console.log("Blog files gain category, tags, hook, and an empty social pack. Bodies are stubs until written.");
    for (const error of [...landingErrors, ...blogErrors]) console.error(`- ${error}`);
    if (!write) {
        console.log("Dry run. Pass --write to create files. Imported plan items stay status draft_planned, so they do not go live.");
        if (landingErrors.length || blogErrors.length) process.exit(1);
        return;
    }
    if (landingErrors.length || blogErrors.length) {
        console.error("Refusing to write a plan that breaks the monthly cap.");
        process.exit(1);
    }
    const landingDir = path.join(outDir, "landing");
    const blogDir = path.join(outDir, "blog");
    const microDir = path.join(outDir, "microbooks");
    fs.mkdirSync(landingDir, { recursive: true });
    fs.mkdirSync(blogDir, { recursive: true });
    fs.mkdirSync(microDir, { recursive: true });
    for (const landing of landings) {
        const slug = String(landing.slug);
        fs.writeFileSync(path.join(landingDir, `${slug}.json`), `${JSON.stringify(landing, null, 2)}\n`);
    }
    for (const blog of blogs) {
        const slug = String(blog.slug);
        fs.writeFileSync(path.join(blogDir, `${slug}.mdx`), blogToMdx(blog));
    }
    for (const book of plan.microbooks ?? []) {
        const slug = String(book.slug ?? "");
        const target = path.join(microDir, `${slug}.md`);
        if (fs.existsSync(target)) continue;
        const text = typeof book.text === "string" ? book.text : "";
        const front = { ...book };
        delete front.text;
        fs.writeFileSync(target, matter.stringify(`${text}\n`, front));
    }
    console.log(`Wrote files under ${outDir}. Run npm run validate:content after intros and essays are real.`);
}

if (process.argv[1] && process.argv[1].includes("import-month-plan")) {
    main();
}
