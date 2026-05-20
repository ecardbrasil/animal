// Fonte: SALVE/ICMBio — Lista de Espécies da Fauna Brasileira Ameaçadas de Extinção (20/05/2026)

export const ICMBIO_CATEGORIES = {
  labels: ['Extinta', 'Ext. na Natureza', 'Reg. Extinta', 'Crit. em Perigo', 'Em Perigo', 'Vulnerável', 'Quase Ameaçada'],
  fullLabels: ['Extinta (EX)', 'Extinta na Natureza (EW)', 'Regionalmente Extinta (RE)', 'Criticamente em Perigo (CR)', 'Em Perigo (EN)', 'Vulnerável (VU)', 'Quase Ameaçada (NT)'],
  codes:  ['EX', 'EW', 'RE', 'CR', 'EN', 'VU', 'NT'],
  values: [6, 1, 3, 326, 457, 488, 446],
  colors: ['#000000', '#542344', '#6a0dad', '#d90028', '#fc7f3f', '#f9e814', '#cce226'],
};

const GROUPS = [
  'Aves', 'Mamíferos', 'Répteis', 'Anfíbios',
  'Peixes Continentais', 'Peixes Marinhos', 'Inv. Terrestres',
  'Inv. Água Doce', 'Inv. Marinhos', 'Tubarões e Raias'
];

const GROUP_COLORS = [
  '#1E88E5', '#8D6E63', '#FFB300', '#43A047',
  '#00ACC1', '#1565C0', '#6D4C41',
  '#00897B', '#5C6BC0', '#616161'
];

export const ICMBIO_GROUPS = {
  labels: GROUPS,
  colors: GROUP_COLORS,
  CR:  [32,  11, 10, 37,  86,  5, 83, 26,  3, 33],
  EN:  [77,  41, 62,  9, 107, 14, 94, 36,  7, 10],
  VU:  [131, 50, 51, 12,  62, 35, 90, 23, 12, 22],
  NT:  [54,  33, 20, 53, 151, 11, 85, 23,  5,  3],
  ALL: [240, 102, 123, 58, 255, 54, 267, 85, 22, 65],
};

const BIOMES = ['Mata Atlântica', 'Cerrado', 'Caatinga', 'Amazônia', 'Costeiro-Marinho', 'Pampa', 'Pantanal'];

const BIOME_COLORS = ['#2E7D32', '#F57F17', '#BF360C', '#1B5E20', '#01579B', '#33691E', '#00695C'];

export const ICMBIO_BIOMES = {
  labels: BIOMES,
  colors: BIOME_COLORS,
  CR:  [157,  64, 36,  22, 51,  16,  1],
  EN:  [223, 127, 99,  60, 54,  44,  9],
  VU:  [194, 166, 96, 130, 96,  42, 32],
  NT:  [264, 127, 40,  91, 32,  43, 19],
  ALL: [574, 357, 231, 212, 201, 102, 42],
};

// Dados de resgates locais por espécie (Amigos da Vida Animal / Dom Bosco POA)
export const SPECIES_DATA = {
  labels: ['Gambá', 'Quero-quero', 'Sabiá', 'Sagui', 'Jabuti', 'Gavião', 'Tucano', 'Arara', 'Coruja', 'Capivara'],
  datasets: {
    '2024': {
      todos:    [87, 74, 68, 55, 43, 38, 31, 24, 21, 18],
      mamifero: [87,  0,  0, 55,  0,  0,  0,  0,  0, 18],
      ave:      [ 0, 74, 68,  0,  0, 38, 31, 24, 21,  0],
      reptil:   [ 0,  0,  0,  0, 43,  0,  0,  0,  0,  0],
      anfibio:  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    },
    '2023': {
      todos:    [72, 61, 59, 48, 37, 32, 27, 19, 17, 14],
      mamifero: [72,  0,  0, 48,  0,  0,  0,  0,  0, 14],
      ave:      [ 0, 61, 59,  0,  0, 32, 27, 19, 17,  0],
      reptil:   [ 0,  0,  0,  0, 37,  0,  0,  0,  0,  0],
      anfibio:  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    },
    '2022': {
      todos:    [58, 52, 47, 39, 29, 25, 22, 15, 13, 11],
      mamifero: [58,  0,  0, 39,  0,  0,  0,  0,  0, 11],
      ave:      [ 0, 52, 47,  0,  0, 25, 22, 15, 13,  0],
      reptil:   [ 0,  0,  0,  0, 29,  0,  0,  0,  0,  0],
      anfibio:  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
    },
  }
};

export const MONTHLY_DATA = {
  '2024': {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    values: [98, 112, 134, 118, 105, 87, 79, 92, 108, 127, 143, 156],
  },
  '2023': {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    values: [82, 95, 118, 101, 89, 71, 64, 78, 93, 110, 124, 138],
  },
  '2022': {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    values: [67, 79, 97, 84, 73, 58, 51, 63, 77, 92, 108, 121],
  },
};

export const GROUP_DATA = {
  '2024': {
    labels: ['Mamíferos', 'Aves', 'Répteis', 'Anfíbios'],
    values: [312, 487, 98, 62],
  },
  '2023': {
    labels: ['Mamíferos', 'Aves', 'Répteis', 'Anfíbios'],
    values: [267, 415, 81, 53],
  },
  '2022': {
    labels: ['Mamíferos', 'Aves', 'Répteis', 'Anfíbios'],
    values: [218, 342, 65, 44],
  },
};

// Porto Alegre RMPA occurrence points [lat, lng, label, count, group]
export const MAP_OCCURRENCES = [
  { lat: -30.034,  lng: -51.217, label: "Centro — Porto Alegre",    count: 87,  group: "mamifero" },
  { lat: -30.053,  lng: -51.180, label: "Moinhos de Vento — POA",   count: 42,  group: "ave"      },
  { lat: -30.025,  lng: -51.195, label: "Bom Fim — POA",            count: 38,  group: "mamifero" },
  { lat: -29.988,  lng: -51.161, label: "Parque Farroupilha — POA", count: 120, group: "ave"      },
  { lat: -30.072,  lng: -51.143, label: "Ipanema — POA",            count: 65,  group: "anfibio"  },
  { lat: -30.061,  lng: -51.238, label: "Cristal — POA",            count: 55,  group: "reptil"   },
  { lat: -30.012,  lng: -51.220, label: "Sarandi — POA",            count: 78,  group: "mamifero" },
  { lat: -29.958,  lng: -51.187, label: "Cachoeirinha",             count: 93,  group: "ave"      },
  { lat: -29.920,  lng: -51.145, label: "Gravataí",                 count: 112, group: "mamifero" },
  { lat: -29.961,  lng: -51.034, label: "São Leopoldo",             count: 74,  group: "anfibio"  },
  { lat: -29.688,  lng: -51.133, label: "Novo Hamburgo",            count: 58,  group: "mamifero" },
  { lat: -29.986,  lng: -51.278, label: "Alvorada",                 count: 82,  group: "ave"      },
  { lat: -30.040,  lng: -51.334, label: "Viamão",                   count: 97,  group: "reptil"   },
  { lat: -30.111,  lng: -51.160, label: "Belém Novo — POA",         count: 105, group: "anfibio"  },
  { lat: -30.149,  lng: -51.296, label: "Eldorado do Sul",          count: 63,  group: "mamifero" },
  { lat: -29.848,  lng: -51.208, label: "Esteio",                   count: 45,  group: "ave"      },
  { lat: -29.798,  lng: -51.127, label: "Campo Bom",                count: 39,  group: "mamifero" },
  { lat: -30.017,  lng: -51.467, label: "Guaíba",                   count: 88,  group: "anfibio"  },
  { lat: -29.915,  lng: -51.368, label: "Canoas",                   count: 134, group: "mamifero" },
  { lat: -30.093,  lng: -51.060, label: "São Jerônimo",             count: 47,  group: "reptil"   }
];
