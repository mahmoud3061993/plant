export interface PhotoCredit {
  author: string;
  license: string;
  sourceUrl: string;
}

export const PHOTO_CREDITS: Record<string, PhotoCredit> = {
  pothos: {
    author: "Spnq",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Epipremnum_aureum_(Marble_Queen)_houseplant.png",
  },
  "snake-plant": {
    author: "Mokkie",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Snake_Plant_(Sansevieria_trifasciata_'Laurentii').jpg",
  },
  monstera: {
    author: "Cryptosporella",
    license: "CC BY-SA 3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Monstera_deliciosa_4.jpg",
  },
  "zz-plant": {
    author: "Muago",
    license: "CC0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Millonaria_(Zamioculcas_zamiifolia).jpg",
  },
  "peace-lily": {
    author: "W.carter",
    license: "CC BY-SA 4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Peace_lily_-_1_-_cropped.jpg",
  },
  "spider-plant": {
    author: "Mokkie",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Spider_Plant_(Chlorophytum_comosum).jpg",
  },
  "aloe-vera": {
    author: "Arjun01",
    license: "Public domain",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Potted_Aloe_vera_plant.jpg",
  },
  "rubber-plant": {
    author: "Maja Dumat",
    license: "CC BY 2.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Gummibaum_(Ficus_elastica_Robusta).jpg",
  },
  dracaena: {
    author: "Mokkie",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Corn_Plant_(Dracaena_fragrans_'Massangeana').jpg",
  },
  aglaonema: {
    author: "Aritra Bhawani",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Aglaonema_commutatum_(lipstick).jpg",
  },
  "areca-palm": {
    author: "Ping an Chang",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:散尾葵Dypsis_lutescens_20210511145013_05.jpg",
  },
  "boston-fern": {
    author: "Homer Edward Price",
    license: "CC BY 2.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Boston_Fern_(2873392811).png",
  },
  "heartleaf-philodendron": {
    author: "KENPEI",
    license: "CC BY-SA 3.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Philodendron_scandens_subsp_oxycardium2.jpg",
  },
  "fiddle-leaf-fig": {
    author: "Mokkie",
    license: "CC BY-SA 3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Fiddle_leaf_fig_2.jpg",
  },
  "jade-plant": {
    author: "sannse",
    license: "CC BY-SA 3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Crassula_ovata_700.jpg",
  },
  syngonium: {
    author: "Stephanie cheks",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Syngonium_podophyllum_(_Arrowhead_plant).jpg",
  },
  dieffenbachia: {
    author: "Krzysztof Ziarnek, Kenraiz",
    license: "CC BY-SA 4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Dieffenbachia_oerstedii_kz2.jpg",
  },
  calathea: {
    author: "Supsoph",
    license: "CC BY-SA 4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Houseplant_Calathea_orbifolia.jpg",
  },
  anthurium: {
    author: "Fanghong",
    license: "CC BY 2.5",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:AnthuriumAndraenum.jpg",
  },
  "indoor-cactus": {
    author: "Soumyapatra13",
    license: "CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Mammillaria_cactus_with_flower.jpg",
  },
};

export function getPhotoCredit(slug: string) {
  return PHOTO_CREDITS[slug];
}

export function plantPhotoSrc(slug: string) {
  return `/plants/${slug}.jpg`;
}
