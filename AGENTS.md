# Repository Guidelines

## Package Manager

- Use `pnpm` only for this project.
- Do not add or regenerate `package-lock.json`, npm scripts, `npm run ...`, or `npx ...` usage.
- Keep `.npmrc` in place. It is used by pnpm for Astro dependency hoisting.
- Prefer `pnpm exec <tool>` for local binaries and `pnpm dlx <tool>` for one-off CLI tools.

## Validation

Run these before handing off changes:

- `pnpm lint`
- `pnpm format:check`
- `pnpm build`

`pnpm build` runs `astro check`, `astro build`, and Pagefind indexing. Treat Astro warnings and Pagefind indexing failures as migration blockers.

## Formatting

- Use the existing Prettier setup via `pnpm format`.
- Do not add the removed Prettier `--plugin-search-dir` option; Prettier 3 reports it as unknown.
- Expect `pnpm format` to normalize older Markdown and config files.
- This repo uses AstroPaper v5's Prettier config in `.prettierrc.mjs`, including `prettier-plugin-astro` and `prettier-plugin-tailwindcss`.

## Content Images

- Blog content lives in `src/data/blog` through Astro 5's content layer config at `src/content.config.ts`.
- Blog images should use relative asset links from the Markdown file, for example:
  `![Alt text](../../assets/images/example/image.png)`.
- Do not use raw HTML paths like `<img src="/src/assets/...">`; Astro's content image pipeline and Pagefind output should see resolved assets.
- Avoid spaces in asset filenames. Use URL-safe names such as `attention-network-80-1.png`.
- Always include useful alt text for Markdown images.
- Post URLs are based on Markdown filenames. Preserve existing slug filenames when editing or migrating posts.

## OpenGraph Images

- Generated OG images are built in `src/utils/generateOgImages.ts`.
- Keep OG image generation offline/deterministic. Do not fetch fonts from remote URLs during build.
- Fonts for OG rendering should come from pnpm-managed local dependencies, currently `@fontsource/ibm-plex-mono`.

## Theme Stack

- This repo tracks AstroPaper v5 patterns: Astro 5 content collections, Tailwind 4 via `@tailwindcss/vite`, Pagefind search, and ESLint 9 flat config.
- Do not reintroduce React/Fuse search or the old `@astrojs/tailwind` integration unless explicitly requested.
