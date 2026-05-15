import { readFile } from "node:fs/promises";
import path from "node:path";

const FONT_FILES: Record<number, string> = {
  400: "ibm-plex-mono-latin-400-normal.woff",
  700: "ibm-plex-mono-latin-700-normal.woff",
};

async function loadLocalFont(weight: number): Promise<ArrayBuffer> {
  const fileName = FONT_FILES[weight];

  if (!fileName) throw new Error(`Missing local font for weight ${weight}`);

  const font = await readFile(
    path.join(
      process.cwd(),
      "node_modules",
      "@fontsource",
      "ibm-plex-mono",
      "files",
      fileName
    )
  );

  return font.buffer.slice(
    font.byteOffset,
    font.byteOffset + font.byteLength
  ) as ArrayBuffer;
}

async function loadGoogleFonts(): Promise<
  Array<{ name: string; data: ArrayBuffer; weight: number; style: string }>
> {
  const fontsConfig = [
    { name: "IBM Plex Mono", weight: 400, style: "normal" },
    { name: "IBM Plex Mono", weight: 700, style: "bold" },
  ];

  const fonts = await Promise.all(
    fontsConfig.map(async ({ name, weight, style }) => {
      const data = await loadLocalFont(weight);
      return { name, data, weight, style };
    })
  );

  return fonts;
}

export default loadGoogleFonts;
