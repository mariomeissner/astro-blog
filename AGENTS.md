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

`pnpm build` runs Astro and then Jampack. Treat Jampack "Issues" output as something to fix, even if the build exits successfully.

## Formatting

- Use the existing Prettier setup via `pnpm format`.
- Do not add the removed Prettier `--plugin-search-dir` option; Prettier 3 reports it as unknown.
- Expect `pnpm format` to normalize older Markdown and config files.

## Content Images

- Blog images should use Astro-resolved asset links, for example:
  `![Alt text](@assets/images/example/image.png)`
- Do not use raw HTML paths like `<img src="/src/assets/...">`; Jampack cannot resolve them from built HTML.
- Avoid spaces in asset filenames. Use URL-safe names such as `attention-network-80-1.png`.
- Always include useful alt text for Markdown images.

## OpenGraph Images

- Generated OG images are built in `src/utils/generateOgImages.tsx`.
- Keep OG image generation offline/deterministic. Do not fetch fonts from remote URLs during build.
- Fonts for OG rendering should come from pnpm-managed local dependencies, currently `@fontsource/ibm-plex-mono`.
