export const SPECIES_DATA = {
  labels: ["Morcego", "Gambá", "Coruja", "Macaco-prego", "Quero-quero", "Jiboia", "Sapo/Rã", "Outros"],
  datasets: {
    "2024": {
      todos:    [312, 198, 156, 87, 134, 43, 201, 116],
      mamifero: [312, 198,   0, 87,   0,  0,   0,  50],
      ave:      [  0,   0, 156,  0, 134,  0,   0,  36],
      reptil:   [  0,   0,   0,  0,   0, 43,   0,  20],
      anfibio:  [  0,   0,   0,  0,   0,  0, 201,  10]
    },
    "2023": {
      todos:    [287, 175, 134, 92, 118, 38, 190, 95],
      mamifero: [287, 175,   0, 92,   0,  0,   0, 40],
      ave:      [  0,   0, 134,  0, 118,  0,   0, 30],
      reptil:   [  0,   0,   0,  0,   0, 38,   0, 15],
      anfibio:  [  0,   0,   0,  0,   0,  0, 190, 10]
    },
    "2022": {
      todos:    [241, 163, 120, 78, 98, 29, 175, 80],
      mamifero: [241, 163,   0, 78,   0,  0,   0, 35],
      ave:      [  0,   0, 120,  0,  98,  0,   0, 25],
      reptil:   [  0,   0,   0,  0,   0, 29,   0, 12],
      anfibio:  [  0,   0,   0,  0,   0,  0, 175,  8]
    }
  }
};

export const MONTHLY_DATA = {
  "2024": {
    labels: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
    values: [82, 74, 95, 103, 118, 125, 98, 87, 104, 112, 131, 118]
  },
  "2023": {
    labels: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
    values: [70, 65, 82, 90, 105, 110, 89, 78, 95, 100, 118, 107]
  },
  "2022": {
    labels: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
    values: [58, 55, 70, 78, 89, 96, 75, 68, 82, 88, 101, 94]
  }
};

export const GROUP_DATA = {
  "2024": { labels: ["Mamíferos", "Aves", "Répteis", "Anfíbios"], values: [647, 326, 63, 211] },
  "2023": { labels: ["Mamíferos", "Aves", "Répteis", "Anfíbios"], values: [594, 282, 53, 200] },
  "2022": { labels: ["Mamíferos", "Aves", "Répteis", "Anfíbios"], values: [517, 243, 41, 183] }
};

// Porto Alegre RMPA occurrence points [lat, lng, label, count, group]
export const MAP_OCCURRENCES = [
  { lat: -30.034,  lng: -51.217, label: "Centro — Porto Alegre",   count: 87,  group: "mamifero" },
  { lat: -30.053,  lng: -51.180, label: "Moinhos de Vento — POA",  count: 42,  group: "ave"      },
  { lat: -30.025,  lng: -51.195, label: "Bom Fim — POA",           count: 38,  group: "mamifero" },
  { lat: -29.988,  lng: -51.161, label: "Parque Farroupilha — POA",count: 120, group: "ave"      },
  { lat: -30.072,  lng: -51.143, label: "Ipanema — POA",           count: 65,  group: "anfibio"  },
  { lat: -30.061,  lng: -51.238, label: "Cristal — POA",           count: 55,  group: "reptil"   },
  { lat: -30.012,  lng: -51.220, label: "Sarandi — POA",           count: 78,  group: "mamifero" },
  { lat: -29.958,  lng: -51.187, label: "Cachoeirinha",            count: 93,  group: "ave"      },
  { lat: -29.920,  lng: -51.145, label: "Gravataí",                count: 112, group: "mamifero" },
  { lat: -29.961,  lng: -51.034, label: "São Leopoldo",            count: 74,  group: "anfibio"  },
  { lat: -29.688,  lng: -51.133, label: "Novo Hamburgo",           count: 58,  group: "mamifero" },
  { lat: -29.986,  lng: -51.278, label: "Alvorada",                count: 82,  group: "ave"      },
  { lat: -30.040,  lng: -51.334, label: "Viamão",                  count: 97,  group: "reptil"   },
  { lat: -30.111,  lng: -51.160, label: "Belém Novo — POA",        count: 105, group: "anfibio"  },
  { lat: -30.149,  lng: -51.296, label: "Eldorado do Sul",         count: 63,  group: "mamifero" },
  { lat: -29.848,  lng: -51.208, label: "Esteio",                  count: 45,  group: "ave"      },
  { lat: -29.798,  lng: -51.127, label: "Campo Bom",               count: 39,  group: "mamifero" },
  { lat: -30.017,  lng: -51.467, label: "Guaíba",                  count: 88,  group: "anfibio"  },
  { lat: -29.915,  lng: -51.368, label: "Canoas",                  count: 134, group: "mamifero" },
  { lat: -30.093,  lng: -51.060, label: "São Jerônimo",            count: 47,  group: "reptil"   }
];
