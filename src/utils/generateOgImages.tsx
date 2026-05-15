import satori, { type SatoriOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { type CollectionEntry } from "astro:content";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";

const readFont = (fileName: string) =>
  readFile(
    path.join(
      process.cwd(),
      "node_modules",
      "@fontsource",
      "ibm-plex-mono",
      "files",
      fileName
    )
  );

const loadFonts = async () => {
  const [fontRegular, fontBold] = await Promise.all([
    readFont("ibm-plex-mono-latin-400-normal.woff"),
    readFont("ibm-plex-mono-latin-600-normal.woff"),
  ]);

  return { fontRegular, fontBold };
};

const { fontRegular, fontBold } = await loadFonts();

const options: SatoriOptions = {
  width: 1200,
  height: 630,
  embedFont: true,
  fonts: [
    {
      name: "IBM Plex Mono",
      data: fontRegular,
      weight: 400,
      style: "normal",
    },
    {
      name: "IBM Plex Mono",
      data: fontBold,
      weight: 600,
      style: "normal",
    },
  ],
};

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOgImageForPost(post: CollectionEntry<"blog">) {
  const svg = await satori(postOgImage(post), options);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await satori(siteOgImage(), options);
  return svgBufferToPngBuffer(svg);
}
