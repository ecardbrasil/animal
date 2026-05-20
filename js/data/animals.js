export const ANIMALS = [
  {
    id: "morcego",
    name: "Morcego",
    scientificName: "Ordem Chiroptera",
    group: "mamifero",
    riskLevel: "danger",
    emoji: "🦇",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Lyle%27s_flying_fox_2.jpg/640px-Lyle%27s_flying_fox_2.jpg",
    summary: "Não toque. Chame profissionais para remoção segura.",
    dos: [
      "Mantenha distância segura e não entre no cômodo",
      "Feche a porta do ambiente e acione o CRAS ou Bombeiros (193)",
      "Observe se há filhotes próximos e informe aos resgatadores",
      "Aguarde a equipe profissional no lado de fora"
    ],
    donts: [
      "Não toque no animal com as mãos nuas — jamais",
      "Não tente capturá-lo com toalhas, redes ou vassouras",
      "Não bata ou tente afugentá-lo com violência",
      "Não tente alimentá-lo ou dar água",
      "Não o solte em área aberta por conta própria"
    ],
    contacts: [
      { name: "Corpo de Bombeiros", number: "193" },
      { name: "CRAS POA — SMAMS", number: "(51) 3289-7500" },
      { name: "IBAMA Linha Verde", number: "0800 618 4080" }
    ],
    funFact: "Os morcegos representam 25% de todas as espécies de mamíferos do Brasil. São os maiores polinizadores noturnos do país e fundamentais para a regeneração de florestas."
  },
  {
    id: "macaco-prego",
    name: "Macaco-prego",
    scientificName: "Sapajus nigritus",
    group: "mamifero",
    riskLevel: "caution",
    emoji: "🐒",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sapajus_nigritus_-_Parque_Estadual_Intervales_-_Sao_Paulo_-_Brazil.jpg/640px-Sapajus_nigritus_-_Parque_Estadual_Intervales_-_Sao_Paulo_-_Brazil.jpg",
    summary: "Não alimente com comida humana. Observe de longe.",
    dos: [
      "Observe da distância — são curiosos e fascinantes",
      "Fotografe sem flash e sem se aproximar demais",
      "Se ferido, ligue imediatamente para o CRAS",
      "Preserve as áreas de mata onde vivem"
    ],
    donts: [
      "Não ofereça comida humana — biscoitos, pão e doces causam doenças",
      "Não tente acariciar ou pegar no colo — podem morder se assustados",
      "Não os encurrale ou bloqueie a rota de fuga",
      "Não os capture mesmo que pareçam mansos"
    ],
    contacts: [
      { name: "CRAS POA — SMAMS", number: "(51) 3289-7500" },
      { name: "Polícia Ambiental", number: "190" }
    ],
    funFact: "O macaco-prego é considerado o primata mais inteligente das Américas, com uso de ferramentas documentado há mais de 700 anos. Eles usam pedras para quebrar frutos e até espinhos para retirar larvas de troncos."
  },
  {
    id: "gamba",
    name: "Gambá",
    scientificName: "Didelphis aurita / D. albiventris",
    group: "mamifero",
    riskLevel: "safe",
    emoji: "🐀",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Didelphis_aurita.jpg/640px-Didelphis_aurita.jpg",
    summary: "Inofensivo e benéfico. Respeite a presença dele.",
    dos: [
      "Respeite sua presença — ele é aliado no controle de pragas",
      "Se houver filhotes órfãos no marsúpio, contate o CRAS",
      "Preserve quintais com árvores que servem de abrigo",
      "Observe de longe — é um marsupial fascinante"
    ],
    donts: [
      "Não tente enxotá-lo com violência ou objetos",
      "Não use veneno — é crime ambiental e prejudica toda a fauna",
      "Não capture nem tente criar como pet",
      "Não confunda com rato — são espécies completamente diferentes"
    ],
    contacts: [
      { name: "CRAS POA — SMAMS", number: "(51) 3289-7500" }
    ],
    funFact: "O gambá é imune ao veneno de cobras, incluindo a jararaca. Além disso, consome até 5.000 carrapatos por semana, sendo um aliado natural no controle de parasitas que afetam humanos e animais domésticos."
  },
  {
    id: "coruja",
    name: "Coruja",
    scientificName: "Famílias Strigidae e Tytonidae",
    group: "ave",
    riskLevel: "safe",
    emoji: "🦉",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Bubo_virginianus_06.jpg/640px-Bubo_virginianus_06.jpg",
    summary: "Controladora natural de roedores. Não perturbe.",
    dos: [
      "Admire de longe — são aves noturnas belíssimas",
      "Se ferida, embrulhe em pano escuro (sem apertar) e contate o CRAS",
      "Preserve árvores antigas que servem de abrigo e local de nidificação",
      "Reduza o uso de raticidas — afetam toda a cadeia alimentar"
    ],
    donts: [
      "Não capture — é crime ambiental com multa",
      "Não afaste do ninho com filhotes — os pais voltam",
      "Não use luz direta nos olhos durante a noite",
      "Não acredite em mitos — corujas não trazem mau agouro"
    ],
    contacts: [
      { name: "CRAS POA — SMAMS", number: "(51) 3289-7500" }
    ],
    funFact: "Uma coruja-da-mata pode capturar mais de 1.000 roedores por ano. Diferente dos raticidas, ela age de forma precisa sem contaminar o ambiente. Vários municípios instalaram caixas-ninho para atrair corujas e controlar pragas naturalmente."
  },
  {
    id: "jiboia",
    name: "Jiboia",
    scientificName: "Boa constrictor",
    group: "reptil",
    riskLevel: "danger",
    emoji: "🐍",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Boa_constrictor%2C_Va%C3%A1rzea_Grande.jpg/640px-Boa_constrictor%2C_Va%C3%A1rzea_Grande.jpg",
    summary: "Não é venenosa, mas não manipule. Chame profissionais.",
    dos: [
      "Mantenha distância segura — mínimo de 3 metros",
      "Feche o ambiente se estiver dentro de casa",
      "Ligue para o Corpo de Bombeiros (193) ou CRAS",
      "Observe sem estressar o animal — ela provavelmente está passando"
    ],
    donts: [
      "Não tente capturar, matar ou ferir — é crime ambiental",
      "Não use objetos cortantes ou perfurantes",
      "Não bloqueie a rota de fuga dela",
      "Não erre por ela ser uma cobra venenosa — a jiboia é constritora"
    ],
    contacts: [
      { name: "Corpo de Bombeiros", number: "193" },
      { name: "CRAS POA — SMAMS", number: "(51) 3289-7500" },
      { name: "Polícia Ambiental", number: "190" }
    ],
    funFact: "A jiboia não possui veneno — ela é uma serpente constritora que age envolvendo a presa. Adultas chegam a 3–4 metros e são excelentes controladoras de roedores. Sua presença indica um ecossistema saudável."
  },
  {
    id: "sapo",
    name: "Sapo / Rã",
    scientificName: "Ordem Anura (várias espécies)",
    group: "anfibio",
    riskLevel: "safe",
    emoji: "🐸",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Rhinella_marina_in_Dar_es_Salaam.jpg/640px-Rhinella_marina_in_Dar_es_Salaam.jpg",
    summary: "Bioindicador ambiental valioso. Deixe no ambiente natural.",
    dos: [
      "Deixe no ambiente natural — ele está no lugar certo",
      "Se necessário mover, use luvas ou pano úmido (sem produto químico)",
      "Preserve corpos d'água limpos próximos à sua casa",
      "Reduza o uso de produtos químicos em jardins"
    ],
    donts: [
      "Não mate — é crime e desequilibra todo o ecossistema",
      "Não use pesticidas perto de áreas úmidas ou lagos",
      "Não toque nos olhos ou boca após manusear sem lavar as mãos",
      "Não leve para dentro de casa como pet"
    ],
    contacts: [
      { name: "CRAS POA — SMAMS", number: "(51) 3289-7500" }
    ],
    funFact: "Anfíbios são altamente sensíveis à poluição do ar e da água, funcionando como alarmes naturais do estado do meio ambiente. O desaparecimento de sapos e rãs de uma área é sinal de degradação ambiental grave."
  },
  {
    id: "quero-quero",
    name: "Quero-quero",
    scientificName: "Vanellus chilensis",
    group: "ave",
    riskLevel: "caution",
    emoji: "🐦",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Vanellus_chilensis_-_Quero-quero.jpg/640px-Vanellus_chilensis_-_Quero-quero.jpg",
    summary: "Ave territorial do RS. Não se aproxime do ninho.",
    dos: [
      "Respeite a distância quando estiver em período reprodutivo",
      "Observe de longe — são aves carismáticas e muito inteligentes",
      "Se houver ovos no chão, sinalize a área e aguarde",
      "Fotografe com teleobjetiva sem aproximar"
    ],
    donts: [
      "Não se aproxime do ninho — os pais ficam em guarda constante",
      "Não tente tocar nos ovos ou filhotes",
      "Não afugente com violência",
      "Não confunda o bico esporão como ataque — é defesa do território"
    ],
    contacts: [
      { name: "CRAS POA — SMAMS", number: "(51) 3289-7500" }
    ],
    funFact: "O quero-quero é um dos símbolos do Rio Grande do Sul. Ele nidifica diretamente no chão em campos abertos e usa seus gritos alarmantes como defesa do ninho — chegando a afugentar até predadores maiores que ele."
  },
  {
    id: "sagui",
    name: "Sagui",
    scientificName: "Callithrix jacchus / C. penicillata",
    group: "mamifero",
    riskLevel: "caution",
    emoji: "🐒",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Common_marmoset_%28Callithrix_jacchus%29.jpg/640px-Common_marmoset_%28Callithrix_jacchus%29.jpg",
    summary: "Não alimente. Pode transmitir raiva e herpes B.",
    dos: [
      "Observe de longe — são encantadores mas selvagens",
      "Se ferido, contate o CRAS imediatamente",
      "Preserve áreas verdes que servem de corredor ecológico",
      "Reporte ao IBAMA se encontrar criação ilegal"
    ],
    donts: [
      "Não alimente — perdem o instinto de sobrevivência",
      "Não tente capturar ou criar — é crime com pena de 1 a 3 anos",
      "Não toque com as mãos nuas — podem transmitir raiva e herpes B",
      "Não confunda com animal doméstico — sofrem em cativeiro"
    ],
    contacts: [
      { name: "CRAS POA — SMAMS", number: "(51) 3289-7500" },
      { name: "IBAMA Linha Verde", number: "0800 618 4080" }
    ],
    funFact: "O sagui é o primata mais comum nas cidades brasileiras. Apesar de fofinhos, são animais selvagens que sofrem enormemente em cativeiro. Um sagui adulto de vida livre pode percorrer até 2 km por dia em busca de alimento."
  },
  {
    id: "gaviao",
    name: "Gavião-carijó",
    scientificName: "Rupornis magnirostris",
    group: "ave",
    riskLevel: "caution",
    emoji: "🦅",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Rupornis_magnirostris_-_Roadside_Hawk.jpg/640px-Rupornis_magnirostris_-_Roadside_Hawk.jpg",
    summary: "Rapinante protegido. Nunca interfira no voo ou ninho.",
    dos: [
      "Admire de longe — é o gavião mais comum do Brasil",
      "Se ferido, embrulhe em pano escuro e chame o CRAS",
      "Preserve árvores altas para nidificação",
      "Reduza uso de rodenticidas que envenenam a cadeia alimentar"
    ],
    donts: [
      "Não se aproxime do ninho — os pais podem atacar",
      "Não tente capturar — é crime federal, multa de R$ 5.000",
      "Não use rodenticidas — matam os gaviões por bioacumulação",
      "Não afugente com objetos — são animais protegidos por lei"
    ],
    contacts: [
      { name: "CRAS POA — SMAMS", number: "(51) 3289-7500" },
      { name: "IBAMA RS", number: "(51) 3288-2200" }
    ],
    funFact: "O gavião-carijó é a ave de rapina mais urbana do Brasil. Ele se adaptou perfeitamente às cidades, usando postes e antenas como poleiros de caça. Sua presença indica um ecossistema urbano ainda equilibrado."
  }
];

export const RISK_LABELS = {
  danger:  "Atenção: Risco",
  caution: "Cuidado",
  safe:    "Seguro"
};

export const GROUP_LABELS = {
  mamifero: "Mamífero",
  ave:      "Ave",
  reptil:   "Réptil",
  anfibio:  "Anfíbio"
};
