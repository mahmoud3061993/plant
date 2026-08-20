#!/usr/bin/env node
/**
 * Download a real Commons photo for every catalog plant missing public/plants/{slug}.jpg
 */
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import path from "node:path";
import { PLANTS } from "../data/plants";
import { PHOTO_CREDITS, type PhotoCredit } from "../data/photo-credits";

const OUT = path.join(process.cwd(), "public/plants");
const CREDITS_FILE = path.join(process.cwd(), "data/photo-credits.ts");
const UA = "PlantCareGuide/1.0 (https://github.com/mahmoud3061993/plant; houseplant education)";

mkdirSync(OUT, { recursive: true });

const FILE_HINTS: Record<string, string> = {
  "scindapsus-pictus": "Scindapsus pictus",
  "english-ivy": "Hedera helix houseplant",
  "tradescantia-zebrina": "Tradescantia zebrina",
  "tradescantia-spathacea": "Tradescantia spathacea",
  "dracaena-marginata": "Dracaena marginata houseplant",
  "dracaena-compacta": "Dracaena compacta",
  "snake-hahnii": "Sansevieria trifasciata Hahnii",
  "sansevieria-cylindrica": "Sansevieria cylindrica",
  aspidistra: "Aspidistra elatior houseplant",
  schefflera: "Schefflera arboricola houseplant",
  "ficus-benjamina": "Ficus benjamina houseplant",
  "ficus-ginseng": "Ficus microcarpa ginseng",
  "money-tree": "Pachira aquatica houseplant",
  yucca: "Yucca elephantipes houseplant",
  "ponytail-palm": "Beaucarnea recurvata houseplant",
  "bird-of-paradise": "Strelitzia nicolai houseplant",
  "lucky-bamboo": "Dracaena sanderiana lucky bamboo",
  croton: "Codiaeum variegatum houseplant",
  coleus: "Coleus scutellarioides houseplant",
  "parlor-palm": "Chamaedorea elegans houseplant",
  "asparagus-fern": "Asparagus setaceus houseplant",
  kalanchoe: "Kalanchoe blossfeldiana",
  phalaenopsis: "Phalaenopsis houseplant",
  haworthia: "Haworthia fasciata",
  echeveria: "Echeveria elegans potted",
  opuntia: "Opuntia microdasys",
  pelargonium: "Pelargonium hortorum potted",
  bougainvillea: "Bougainvillea glabra potted",
  "jasminum-sambac": "Jasminum sambac flower",
  rosemary: "Salvia rosmarinus potted",
  adenium: "Adenium obesum potted",
  "euphorbia-milii": "Euphorbia milii potted",
  "swedish-ivy": "Plectranthus verticillatus",
  thaumatophyllum: "Thaumatophyllum bipinnatifidum",
  "cycas-revoluta": "Cycas revoluta potted",
  cordyline: "Cordyline fruticosa houseplant",
  "hibiscus-rosa": "Hibiscus rosa-sinensis potted",
  impatiens: "Impatiens walleriana potted",
  cyclamen: "Cyclamen persicum potted",
  poinsettia: "Euphorbia pulcherrima potted",
  "phoenix-roebelenii": "Phoenix roebelenii potted",
  "african-violet": "Saintpaulia ionantha",
  "ficus-pumila": "Ficus pumila",
  "pilea-cadierei": "Pilea cadierei",
  hypoestes: "Hypoestes phyllostachya",
  "peperomia-obtusifolia": "Peperomia obtusifolia",
  maranta: "Maranta leuconeura",
  "hoya-carnosa": "Hoya carnosa houseplant",
  "christmas-cactus": "Schlumbergera truncata",
  "grape-ivy": "Cissus rhombifolia",
  fittonia: "Fittonia albivenis",
  caladium: "Caladium bicolor potted",
  "begonia-rex": "Begonia rex",
  "ficus-nitida": "Ficus microcarpa nitida",
  duranta: "Duranta erecta flowers",
  vinca: "Catharanthus roseus potted",
  portulaca: "Portulaca grandiflora potted",
};

type Hit = { title: string; url: string; thumb: string; mime: string; author: string; license: string; page: string };

async function wiki(url: string) {
  const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

async function search(query: string): Promise<Hit | null> {
  const api =
    "https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|mime|size|extmetadata&iiurlwidth=1400&format=json&gsrsearch=" +
    encodeURIComponent(query);
  const data = await wiki(api);
  const pages = Object.values((data.query?.pages ?? {}) as Record<string, any>);
  pages.sort((a: any, b: any) => (a.index ?? 99) - (b.index ?? 99));
  for (const page of pages) {
    const info = page.imageinfo?.[0];
    if (!info) continue;
    const mime = String(info.mime || "");
    if (!mime.includes("jpeg") && !mime.includes("png") && !mime.includes("webp")) continue;
    if ((info.size ?? 0) < 20000) continue;
    const meta = info.extmetadata || {};
    const license = String(meta.LicenseShortName?.value || meta.License?.value || "Wikimedia");
    const author = String(meta.Artist?.value || "Wikimedia Commons").replace(/<[^>]+>/g, "").slice(0, 80);
    return {
      title: page.title,
      url: info.url,
      thumb: info.thumburl || info.url,
      mime,
      author: author || "Wikimedia Commons",
      license,
      page: info.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title)}`,
    };
  }
  return null;
}

async function download(url: string, dest: string) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`download ${res.status} ${url}`);
  await pipeline(Readable.fromWeb(res.body as any), createWriteStream(dest));
}

function writeCredits(credits: Record<string, PhotoCredit>) {
  const entries = Object.entries(credits)
    .map(([slug, credit]) => {
      return `  ${JSON.stringify(slug)}: {
    author: ${JSON.stringify(credit.author)},
    license: ${JSON.stringify(credit.license)},
    sourceUrl: ${JSON.stringify(credit.sourceUrl)},
  }`;
    })
    .join(",\n");
  writeFileSync(
    CREDITS_FILE,
    `export interface PhotoCredit {
  author: string;
  license: string;
  sourceUrl: string;
}

export const PHOTO_CREDITS: Record<string, PhotoCredit> = {
${entries},
};

export function getPhotoCredit(slug: string) {
  return PHOTO_CREDITS[slug];
}

export function plantPhotoSrc(slug: string) {
  return \`/plants/\${slug}.jpg\`;
}
`,
  );
}

async function main() {
  const credits: Record<string, PhotoCredit> = { ...PHOTO_CREDITS };
  const missing = PLANTS.filter((p) => !existsSync(path.join(OUT, `${p.slug}.jpg`)));
  console.log(`Need photos for ${missing.length} / ${PLANTS.length} plants`);

  for (const plant of missing) {
    const queries = [
      FILE_HINTS[plant.slug],
      `${plant.scientificName} houseplant`,
      `${plant.scientificName} potted`,
      plant.scientificName,
      `${plant.englishName} plant`,
    ].filter(Boolean) as string[];
    let hit: Hit | null = null;
    for (const q of queries) {
      try {
        hit = await search(q);
      } catch (err) {
        console.warn("search fail", plant.slug, q, err);
      }
      if (hit) break;
      await new Promise((r) => setTimeout(r, 400));
    }
    if (!hit) {
      console.error("NO PHOTO", plant.slug, plant.scientificName);
      continue;
    }
    const dest = path.join(OUT, `${plant.slug}.jpg`);
    try {
      await download(hit.thumb || hit.url, dest);
      credits[plant.slug] = { author: hit.author, license: hit.license, sourceUrl: hit.page };
      console.log("ok", plant.slug, hit.title);
    } catch (err) {
      console.error("dl fail", plant.slug, err);
    }
    await new Promise((r) => setTimeout(r, 500));
  }

  writeCredits(credits);
  console.log("credits written", Object.keys(credits).length);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

