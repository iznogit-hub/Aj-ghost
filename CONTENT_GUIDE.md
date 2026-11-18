# Content guide

This site publishes three kinds of pages from files in `content/`. The on-disk shape matches the Month 1 plan in `plans/month-1.json`, plus a few fields that plan does not carry yet. A converter copies a plan into files. It does not publish them.

## Where files go

| Kind | Path | URL |
| --- | --- | --- |
| Landing page | `content/landing/{slug}.json` | `url_path`, for example `/free-thriller/texas/houston/` |
| State directory copy | `content/locations/states.json` | `/free-thriller/texas/` when no state-hub landing is live |
| City coordinates | `content/locations/cities.json` | Used only for the geo hint. Not a page. |
| Micro-book | `content/microbooks/{slug}.md` | `/free-reads/{slug}/` |
| Blog post | `content/blog/{slug}.mdx` | `/blog/{slug}/` |
| Month plan | `plans/month-1.json` | Not rendered |

Free reads are not part of the 50/50 cap. They are the stories landing pages embed.

## Landing pages

Use the plan object as the file. Add `intro`.

| Plan field | Required | What the site does |
| --- | --- | --- |
| `id` | yes | Stable id, such as `LP02`. |
| `type` | yes | `landing_page`. |
| `slug` | yes | Filename is `{slug}.json`. |
| `url_path` | yes | Canonical URL. Must be `/free-thriller/{state}/{city}/` or `/free-thriller/{state}/` for a state hub. |
| `state` | yes | USPS code: `TX`, `AZ`, and the rest of the states. |
| `city` | city pages | Display name, or `null` on a state hub. `San Antonio` becomes `san-antonio`. `The Woodlands` becomes `the-woodlands`. |
| `page_kind` | yes | `city` or `state_hub`. |
| `search_intent` | yes | Shown on the page and available to the next brief. |
| `target_keyword` | yes | Stored and shown as the query the page is for. |
| `title` | yes | `<title>` and social title. 20–110 characters. Unique. |
| `meta_description` | yes | Meta description. 80–200 characters. Unique. |
| `h1` | yes | On-page heading. Unique. City pages must name the city in the title, meta description, h1, and intro. |
| `local_angle.label` | yes | Short label, such as `The drive home after dark`. |
| `local_angle.description` | yes | One or two sentences. At least 8 words. This is not the long intro. |
| `hunted_hook` | yes | `{ manuscript_line, text, source }`. Shown as a short pull quote. |
| `microbook_id` | yes | `MB01` … `MB05`, matching `content/microbooks`. |
| `microbook_title`, `microbook_label` | kept | Copied through so the plan does not need a rename. The rendered story comes from the micro-book file. |
| `cta` | yes | `url` must be `https://dl.bookfunnel.com/j4e3jsxfr6`. A query string on `url_tracked` is allowed. HUNTED never links to Amazon. |
| `secondary_links` | optional | Only Fractured Ground (`https://www.amazon.com/dp/B0H9SXX81F`) and the Digital Ascent ARC (`https://booksprout.co/reviewer/review-copy/view/333083/digital-ascent-book-three-in-the-ryan-kane-series`). |
| `internal_links` | optional | Paths such as `/free-reads/pump-six/`. Links to pages that are not live yet are hidden. |
| `publish_date` | yes | `YYYY-MM-DD`. This is the calendar day used for the monthly cap. |
| `publish_at` | optional | ISO 8601 with an offset, for example `2026-11-20T10:00:00+05:30`. When set, this exact instant is when the page goes live. |
| `status` | yes | See Scheduling. |
| `example` | seed only | `true` shows the example banner. The intro must contain the word "example". |
| `intro` | yes, not in the plan | **150–250 words, unique to this URL.** This is the field that keeps a reused story from becoming a thin page. |

The same micro-book may be embedded on many landings. That is expected. Each landing's canonical tag is its own `url_path`. The story's canonical tag lives only on `/free-reads/{slug}/`. The landing says so in a normal link. JSON-LD for the short story uses the free-read URL. JSON-LD for the article uses the landing URL. Both include Book and BreadcrumbList markup. HUNTED's Book node points at BookFunnel.

## Micro-books

`content/microbooks/streetlight-math.md` (and pump-six, last-run, the-log, vacancy) is the canonical home.

Front matter uses the plan's micro-book fields: `id`, `title`, `slug`, `url_path`, `pov`, `when`, `setting_mood`, `logline`, `canon_notes`, `label`, plus `publish_date`, `publish_at`, and `status`. The story is the markdown body. Do not paste it again into the landing file.

`url_path` must be `/free-reads/{slug}/`.

## Blog posts

Plan fields are the front matter. These extra fields are required because the plan stores an outline, not an essay or a social pack.

| Plan field | Site field | Notes |
| --- | --- | --- |
| `id`, `type`, `slug`, `url_path` | same | `url_path` must be `/blog/{slug}/`. |
| `title` | title | Also the H1. |
| `meta_description` | meta description and Open Graph | |
| `target_keyword`, `search_intent` | same | |
| `source_promo` | campaign id | The MailerLite / promo id. `sourceCampaignId` is accepted as an alias. |
| `outline_h2` | outline | Headings for the writer. Not a substitute for the body. |
| `internal_links` | `{ text, url, kind }` | |
| `cta.url` | BookFunnel | Same HUNTED rule as landings. |
| `publish_date`, `publish_at`, `status` | same | |

Also required:

- `hook` — the headline line from the email.
- `category` — the converter defaults this to the text before the colon in `search_intent` when the plan omits it.
- `tags` — 2 to 6. The converter defaults to the target keyword plus `Ryan Kane`.
- `social.xThread` — 3 to 8 posts, each 20–280 characters.
- `social.carousel` — 3 to 8 slides, each 10–200 characters.
- `social.shortFormHook` — the line used on the X share button.
- Body — at least 280 words of MDX. Include a markdown link to `/free-thriller/…`, `/free-reads/…`, or `/blog/…`, and `<BookCta />` (optional `place="Houston"`).

Open Graph and Twitter cards use the title, meta description, and short-form hook. Related posts prefer the same category and shared tags. `/blog/rss.xml` lists only live posts.

## Scheduling

A file is live only when both of these are true:

1. `status` is not `draft` or `draft_planned`.
2. `publish_at` is in the past, or, if `publish_at` is omitted, the UTC date is on or after `publish_date`.

`draft_planned` is what the Month 1 plan uses. Those files can sit in the repo and will not render, enter the sitemap, or enter the RSS feed. Change `status` to `scheduled` when the intro (and, for a post, the essay and social pack) are real. The date then publishes them.

The cap counts every landing file and every blog file with a `publish_date`, including drafts and future dates. Free reads are not counted. No calendar month may contain more than **50 landing pages** or more than **50 blog posts**. November 2026 and December 2026 are separate months. The Month 1 plan is 19 and 31 in those two months, which is under the cap. A 51st file in either kind fails `npm run validate:content` and `npm run build`.

`PSEO_NOW=2026-12-01` previews the schedule locally. It is ignored when `VERCEL_ENV=production`.

## How a content agent adds a page

1. Prefer `npm run import:plan` (dry run) against `plans/month-1.json` or a newer plan with the same keys.
2. `npm run import:plan -- --write` writes landing JSON, blog stubs, and any missing micro-books into `content/`. It refuses to write if a month would exceed 50. Imported items keep `status: draft_planned`.
3. Write a unique `intro` of 150–250 words on each landing. Do not swap the city name through one paragraph.
4. Replace each blog stub with the essay, hook, and social pack from that week's email.
5. Set `status` to `scheduled`.
6. Run `npm run validate:content`. Fix every line it prints.
7. Commit. A push to the production branch builds immediately. Future `publish_at` values stay invisible until the daily rebuild described below.

Do not add the retired ASIN anywhere under `content/`. The validator rejects it.

## What goes live without a manual deploy

Pages are static. `generateStaticParams` runs at build time, and unknown URLs 404. A new file, or a `publish_at` that arrives overnight, is not visible until the site is built again.

Two things build it:

- A push to the production branch, which Vercel already deploys.
- A Vercel Cron (`vercel.json`, `15 0 * * *`, 00:15 UTC) that calls `GET /api/cron/publish/`. The trailing slash matches `trailingSlash: true`. That route POSTs to a deploy hook, which rebuilds the same commit. Anything whose `publish_at` has passed, and whose status is `scheduled`, becomes static HTML and enters the sitemap and RSS. Anything still in the future is left out.

Set these in the Vercel project before relying on the cron. Do not set `PSEO_NOW` in Production.

| Variable | Purpose |
| --- | --- |
| `CRON_SECRET` | Vercel sends `Authorization: Bearer <CRON_SECRET>`. The route rejects any other caller. |
| `VERCEL_DEPLOY_HOOK_URL` | Deploy Hook for the production branch (Project → Settings → Git → Deploy Hooks). |
| `NEXT_PUBLIC_SITE_URL` | Optional. Defaults to `https://ajghost.com`. Used for canonicals, Open Graph, sitemap, and RSS. |

Create the deploy hook for the branch that should go live, usually `main`, after this work is merged. The cron does not run in a pull request preview.

The geo hint is a separate request to `/api/geo-hint`. It reads Vercel's `x-vercel-ip-*` headers and may suggest a live city page. The HTML of every landing, story, and post is still static and indexable without that request.

`/sitemap.xml` is a sitemap index. It splits into numbered files if the URL list passes 1,000. Only live URLs are included. `/robots.txt` allows the site and disallows `/api/`.
