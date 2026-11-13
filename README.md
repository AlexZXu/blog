# blog

The blog at [blog.alexxu.me](https://blog.alexxu.me). Plain Astro, no styling.

```sh
npm install
npm run dev     # localhost:4321, drafts included
npm run build   # static output in dist/
```

## Writing a post

Copy `src/content/blog/_template.md` to `src/content/blog/<slug>.md`. The file name
becomes the URL (`/<slug>/`). Set `kind` to `essay` or `note`, and `draft: false`
to publish. Published posts also go into the RSS feed at `/rss.xml`.

## Deploying

Import this repo into Vercel as its own project (framework preset: Astro) and add
`blog.alexxu.me` under Settings → Domains. If DNS for `alexxu.me` isn't managed by
Vercel, add a CNAME record for `blog` pointing at `cname.vercel-dns.com`.
