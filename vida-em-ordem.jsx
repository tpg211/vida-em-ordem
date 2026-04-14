import { useState, useRef, useEffect } from "react";

// ── CONSTANTS ──────────────────────────────────────────────────────────────────
const AFFIRM = [
  "Sou atleta, arquiteta e parceira presente.",
  "Eu sou forte, disciplinada e capaz de conquistar tudo que me proponho.",
  "Meu corpo e minha mente estao alinhados com meus objetivos.",
  "Eu escolho ser grata por cada dia e cada conquista.",
  "Eu sou digna de amor, saude e prosperidade.",
  "Hoje eu escolho a coragem. O medo nao me define.",
  "Eu confio no processo. Cada passo me leva mais perto do meu melhor.",
  "Minha disciplina de hoje e a liberdade de amanha.",
  "Eu sou uma mulher de proposito, focada e determinada.",
  "Eu mereco descansar sem culpa e celebrar cada vitoria.",
  "Eu cuido do meu corpo com amor — ele me leva aonde eu quero ir.",
  "Eu sou uma parceira presente, uma profissional excelente e uma atleta dedicada.",
  "Hoje eu sou 1% melhor do que ontem.",
  "Eu transformo obstaculos em oportunidades.",
  "Minha mente esta calma, meu coracao esta em paz, meu corpo esta pronto.",
  "Eu sou grata pelo meu casamento, minha saude e minha carreira.",
  "Eu nao preciso ser perfeita. Eu preciso ser consistente.",
  "Minha energia e minha. Eu escolho onde investir.",
  "Eu sou a arquiteta da minha propria vida.",
  "Hoje eu faco o que e importante, nao o que e urgente.",
  "Eu confio em Deus e no Seu tempo para a minha vida.",
  "Eu sou capaz de equilibrar performance e presenca.",
  "Cada treino me torna mais forte — por dentro e por fora.",
  "Eu escolho a simplicidade. Menos e mais.",
  "Minha fe e maior que meus medos.",
  "Eu sou luz para quem esta ao meu redor.",
  "Hoje e um novo dia cheio de possibilidades.",
  "Eu celebro minha evolucao e cada progresso conquistado.",
  "Eu honro meu corpo com alimentacao, treino e descanso.",
  "Eu sou completa em Cristo e caminho com proposito.",
  "Gratidao e meu superpoder. Eu vejo o bom em tudo.",
];
const getAffirm = () => { const d=new Date(); const n=Math.floor((d-new Date(d.getFullYear(),0,0))/(864e5)); return AFFIRM[n % AFFIRM.length]; };

const DEVO = [
  {v:"Tudo posso naquele que me fortalece.",r:"Filipenses 4:13"},
  {v:"O Senhor e o meu pastor; nada me faltara.",r:"Salmos 23:1"},
  {v:"Porque Deus nao nos deu espirito de covardia, mas de poder, de amor e de equilibrio.",r:"2 Timoteo 1:7"},
  {v:"Entrega o teu caminho ao Senhor; confia nele, e ele agira.",r:"Salmos 37:5"},
  {v:"Sejam fortes e corajosos. Nao tenham medo. O Senhor vai com voces.",r:"Deuteronomio 31:6"},
  {v:"Eu sei os planos que tenho para voces, planos de paz e nao de mal, para dar-lhes futuro e esperanca.",r:"Jeremias 29:11"},
  {v:"Busquem primeiro o Reino de Deus, e todas essas coisas lhes serao acrescentadas.",r:"Mateus 6:33"},
  {v:"O Senhor e a minha luz e a minha salvacao; de quem terei medo?",r:"Salmos 27:1"},
  {v:"Os que esperam no Senhor renovam as suas forcas. Voam alto como aguias.",r:"Isaias 40:31"},
  {v:"Nao se preocupem com nada, mas em tudo apresentem seus pedidos a Deus.",r:"Filipenses 4:6"},
  {v:"O amor e paciente, o amor e bondoso. Nao inveja, nao se vangloria.",r:"1 Corintios 13:4"},
  {v:"Deus e o nosso refugio e fortaleza, socorro bem presente na angustia.",r:"Salmos 46:1"},
  {v:"Em tudo dai gracas, porque esta e a vontade de Deus para voces.",r:"1 Tessalonicenses 5:18"},
  {v:"Lancando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vos.",r:"1 Pedro 5:7"},
  {v:"Alegrem-se sempre no Senhor. Novamente direi: alegrem-se!",r:"Filipenses 4:4"},
  {v:"Confie no Senhor de todo o seu coracao e nao se apoie em seu proprio entendimento.",r:"Proverbios 3:5"},
  {v:"O Senhor e fiel; ele os fortalecera e os protegera do Maligno.",r:"2 Tessalonicenses 3:3"},
  {v:"Nao temas, porque eu sou contigo; nao te assombres, porque eu sou o teu Deus.",r:"Isaias 41:10"},
  {v:"A fe e a certeza daquilo que esperamos e a prova das coisas que nao vemos.",r:"Hebreus 11:1"},
  {v:"O fruto do Espirito e amor, alegria, paz, paciencia, amabilidade, bondade, fidelidade.",r:"Galatas 5:22"},
  {v:"Deus faz todas as coisas cooperarem para o bem daqueles que o amam.",r:"Romanos 8:28"},
  {v:"Eu vim para que tenham vida, e a tenham plenamente.",r:"Joao 10:10"},
  {v:"Aquele que comecou a boa obra em voces vai completa-la ate o dia de Cristo Jesus.",r:"Filipenses 1:6"},
  {v:"O Senhor e bom, um refugio em tempos de angustia. Ele cuida dos que nele confiam.",r:"Naum 1:7"},
  {v:"Voce e obra maravilhosa de Deus.",r:"Salmos 139:14"},
  {v:"Pois onde estiver o seu tesouro, ai estara tambem o seu coracao.",r:"Mateus 6:21"},
  {v:"Deem gracas ao Senhor porque ele e bom; o seu amor dura para sempre.",r:"Salmos 107:1"},
  {v:"Bem-aventurados os pacificadores, pois serao chamados filhos de Deus.",r:"Mateus 5:9"},
  {v:"Voce e a luz do mundo. Nao se pode esconder uma cidade sobre um monte.",r:"Mateus 5:14"},
  {v:"A graca te basta, porque o meu poder se aperfeicooa na fraqueza.",r:"2 Corintios 12:9"},
  {v:"Ainda que eu ande pelo vale da sombra da morte, nao temerei mal algum, porque tu estas comigo.",r:"Salmos 23:4"},
];
const getDevo = () => { const d=new Date(); const n=Math.floor((d-new Date(d.getFullYear(),0,0))/(864e5)); return DEVO[n % DEVO.length]; };

const TRAINING_TYPES = {
  corrida:    { label:"Corrida",    emoji:"🏃‍♀️", color:"#E8845A", nutrition:"Carbo antes + proteína pós" },
  natação:    { label:"Natação",    emoji:"🏊‍♀️", color:"#5A8EC4", nutrition:"Proteína + carbo complexo pós" },
  ciclismo:   { label:"Ciclismo",   emoji:"🚴‍♀️", color:"#8E7CC4", nutrition:"Carbo antes + eletrólitos" },
  musculação: { label:"Musculação", emoji:"💪",   color:"#C47C5A", nutrition:"Proteína elevada — whey pós" },
  descanso:   { label:"Descanso",   emoji:"😴",   color:"#A0A090", nutrition:"Refeição leve e equilibrada" },
};
const INTENSITY = ["leve","moderado","forte","competição"];

const DEFAULT_TRAININGS = {
  segunda:[{ type:"corrida",    duration:45, intensity:"moderado", desc:"Fartlek" }],
  terca:  [{ type:"musculação", duration:60, intensity:"moderado", personal:true }],
  quarta: [{ type:"corrida",    duration:50, intensity:"forte",    desc:"Intervalado pesado" },{ type:"musculação", duration:60, intensity:"moderado", personal:true }],
  quinta: [{ type:"musculação", duration:60, intensity:"moderado", personal:true }],
  sexta:  [{ type:"corrida",    duration:40, intensity:"leve",     desc:"Corrida leve" }],
  sabado: [{ type:"corrida",    duration:90, intensity:"moderado", desc:"Longão" }],
  domingo:[{ type:"descanso",   duration:0,  intensity:"leve" }],
};

const WEEK_DAYS = [
  { key:"segunda", label:"Segunda", short:"Seg", jsDay:1 },
  { key:"terca",   label:"Terça",   short:"Ter", jsDay:2 },
  { key:"quarta",  label:"Quarta",  short:"Qua", jsDay:3 },
  { key:"quinta",  label:"Quinta",  short:"Qui", jsDay:4 },
  { key:"sexta",   label:"Sexta",   short:"Sex", jsDay:5 },
  { key:"sabado",  label:"Sábado",  short:"Sáb", jsDay:6 },
  { key:"domingo", label:"Domingo", short:"Dom", jsDay:0 },
];

const MEALS = ["Pós-treino","Café da manhã","Almoço","Sobremesa","Lanche","Jantar"];
const MEAL_EMOJI = { "Pós-treino":"🏋️","Café da manhã":"☕","Almoço":"🍽️","Sobremesa":"🍰","Lanche":"🍎","Jantar":"🌙" };
const DAYS_FULL  = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];
const DAYS_SHORT = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
const DAY_KEY_MAP = {0:"domingo",1:"segunda",2:"terca",3:"quarta",4:"quinta",5:"sexta",6:"sabado"};

// Carb cycling: LOW CARB on lighter days, CARBO on heavy days
const LOW_CARB_DAYS = ["segunda","sexta","domingo"];
const CARBO_DAYS = ["terca","quarta","quinta","sabado"];
const getCarbType = (dayKey) => LOW_CARB_DAYS.includes(dayKey) ? "LOW CARB" : "CARBO";
const getCarbColor = (dayKey) => LOW_CARB_DAYS.includes(dayKey) ? "#E8845A" : "#5A8EC4";

// Plano alimentar — ciclagem de carbo (personalize no código)
const DIETA_LOW = {
  "Pós-treino": "Liquidz 1 sachê (dias de corrida)",
  "Café da manhã": "Panqueca banana c/ whey: 1 col aveia + 1 ovo + banana + muçarela + whey 20g + canela + café + creatina 5g",
  "Almoço": "80g arroz/batata + 1 col feijão 70g + 100g frango/85g carne/160g tilápia + folhosos 40g + verduras 60g + legumes 80g",
  "Sobremesa": "2 tabletes chocolate 70% ou 1 laranja/2 kiwis",
  "Lanche": "Whey DUX 30g + água + 2 porções fruta + leite pó 10g",
  "Jantar": "Proteína + salada leve. Ceia: Koala Sleep 1 dosador",
};
const DIETA_CARB = {
  "Pós-treino": "Liquidz 1 sachê (dias de corrida)",
  "Café da manhã": "Panqueca banana c/ whey + creatina 5g + café (porção maior carbo)",
  "Almoço": "Arroz/batata/macarrão porção maior + feijão + 100g proteína + salada + legumes",
  "Sobremesa": "Fruta ou chocolate 70%",
  "Lanche": "Whey DUX 30g + fruta ou sanduíche natural (pão+frango+requeijão+muçarela)",
  "Jantar": "Arroz 80g ou abóbora 210g + proteína + salada. Ceia: Koala Sleep",
};

const EVENT_TYPES = {
  trabalho: { label:"Trabalho", color:"#5A7DC4", emoji:"💼" },
  reunião:  { label:"Reunião",  color:"#8E5AC4", emoji:"📊" },
  treino:   { label:"Treino",   color:"#E8845A", emoji:"🏃‍♀️" },
  casa:     { label:"Casa",     color:"#7C9E8E", emoji:"🏡" },
  casal:    { label:"Casal",    color:"#C47C9E", emoji:"❤️" },
  saúde:    { label:"Saúde",    color:"#5AC48E", emoji:"🏥" },
  lazer:    { label:"Lazer",    color:"#D4C44A", emoji:"🎉" },
  outro:    { label:"Outro",    color:"#9A9082", emoji:"📌" },
};

const STATUS_COLOR = { ok:"#7C9E8E", baixo:"#C4956A", acabou:"#C46A6A" };

const DEFAULT_STOCK = [
  {id:1,  name:"Arroz",            qty:2,   unit:"kg", category:"despensa",   status:"ok"    },
  {id:2,  name:"Feijão",           qty:1,   unit:"kg", category:"despensa",   status:"ok"    },
  {id:3,  name:"Azeite",           qty:1,   unit:"un", category:"despensa",   status:"baixo" },
  {id:4,  name:"Ovos",             qty:6,   unit:"un", category:"geladeira",  status:"baixo" },
  {id:5,  name:"Leite",            qty:2,   unit:"L",  category:"geladeira",  status:"ok"    },
  {id:6,  name:"Frango congelado", qty:1.5, unit:"kg", category:"congelador", status:"ok"    },
  {id:7,  name:"Pasta de amendoim",qty:1,   unit:"un", category:"despensa",   status:"ok"    },
  {id:8,  name:"Whey protein",     qty:500, unit:"g",  category:"despensa",   status:"baixo" },
  {id:9,  name:"Iogurte grego",    qty:2,   unit:"un", category:"geladeira",  status:"baixo" },
  {id:10, name:"Banana",           qty:3,   unit:"un", category:"geladeira",  status:"acabou"},
];

const CHECKLIST_DATA = {
  quinta: ["Guardar objetos fora do lugar","Deixar acesso a todos os cômodos","Verificar produtos de limpeza","Retirar lixos dos quartos","Deixar lista de prioridades para a diarista"],
  sabado: ["Verificar o que está faltando na geladeira","Checar despensa e estoque","Conferir semana das carnes","Listar hortifruti da semana","Verificar higiene e limpeza"],
};

// ── WHEEL AREAS ────────────────────────────────────────────────────────────────
const WHEEL_AREAS = [
  { key:"treinos",     label:"Treinos",     shortLabel:"Treinos",   emoji:"🏃‍♀️", color:"#5DCAA5" },
  { key:"casamento",   label:"Casamento",   shortLabel:"Casal",     emoji:"❤️",  color:"#D4537E" },
  { key:"trabalho",    label:"Trabalho",    shortLabel:"Trabalho",  emoji:"💼",  color:"#378ADD" },
  { key:"casa",        label:"Casa",        shortLabel:"Casa",      emoji:"🏡",  color:"#7C9E8E" },
  { key:"nutricao",    label:"Nutrição",    shortLabel:"Nutrição",  emoji:"🥗",  color:"#639922" },
  { key:"descanso",    label:"Descanso",    shortLabel:"Descanso",  emoji:"😴",  color:"#7F77DD" },
  { key:"crescimento", label:"Crescimento", shortLabel:"Crescim.",  emoji:"📚",  color:"#BA7517" },
  { key:"social",      label:"Social",      shortLabel:"Social",    emoji:"👯‍♀️", color:"#D85A30" },
];

const DEFAULT_SCORES = { treinos:8, casamento:7, trabalho:8, casa:7, nutricao:7, descanso:5, crescimento:6, social:6 };

const PRIORITY_COLORS = [
  { key:"treinos",     label:"Treinos",     color:"#5DCAA5" },
  { key:"casamento",   label:"Casamento",   color:"#D4537E" },
  { key:"trabalho",    label:"Trabalho",    color:"#378ADD" },
  { key:"casa",        label:"Casa",        color:"#7C9E8E" },
  { key:"saude",       label:"Saúde",       color:"#5AC48E" },
  { key:"pessoal",     label:"Pessoal",     color:"#BA7517" },
];

const CAPTURE_URGENCY = [
  { key:"ideia",    label:"💡 Ideia",    color:"#BA7517", bg:"rgba(186,117,23,0.1)"  },
  { key:"pendente", label:"📌 Pendente", color:"#5A7DC4", bg:"rgba(90,125,196,0.1)"  },
  { key:"urgente",  label:"⚡ Urgente",  color:"#C46A6A", bg:"rgba(196,106,106,0.1)" },
];

// ── EXAMES DATA ──────────────────────────────────────────────────────────────
const EXAMES = [
  { nome:"Hemoglobina", val:"13,1", unit:"g/dl", ref:"12,0-16,0", status:"ok", cat:"Hemograma" },
  { nome:"Hematócrito", val:"36,8", unit:"%", ref:"36,0-46,0", status:"ok", cat:"Hemograma" },
  { nome:"Plaquetas", val:"263.000", unit:"/mm3", ref:"150-450mil", status:"ok", cat:"Hemograma" },
  { nome:"Vitamina B12", val:"966", unit:"pg/mL", ref:"181-906", status:"alto", cat:"Fígado/Vitaminas" },
  { nome:"Ferro sérico", val:"180", unit:"mcg/dL", ref:"65-175", status:"alto", cat:"Fígado/Vitaminas" },
  { nome:"Ferritina", val:"276", unit:"ng/mL", ref:"20-300", status:"ok", cat:"Fígado/Vitaminas" },
  { nome:"Hemoglobina Glicada", val:"4,7", unit:"%", ref:"<5,7", status:"ok", cat:"Metabólico" },
  { nome:"Glicose", val:"94", unit:"mg/dL", ref:"60-99", status:"ok", cat:"Metabólico" },
  { nome:"Insulina", val:"6,6", unit:"µUI/mL", ref:"2,0-25,0", status:"ok", cat:"Metabólico" },
  { nome:"HOMA IR", val:"1,53", unit:"", ref:"<2,7", status:"ok", cat:"Metabólico" },
  { nome:"TSH", val:"0,91", unit:"µUI/mL", ref:"0,35-4,94", status:"ok", cat:"Hormônios" },
  { nome:"Vitamina D", val:"34,3", unit:"ng/mL", ref:"20-60", status:"ok", cat:"Fígado/Vitaminas" },
  { nome:"TGO", val:"21", unit:"U/L", ref:"≤33", status:"ok", cat:"Fígado/Vitaminas" },
  { nome:"TGP", val:"12", unit:"U/L", ref:"≤34", status:"ok", cat:"Fígado/Vitaminas" },
  { nome:"Gama GT", val:"19", unit:"U/L", ref:"<38", status:"ok", cat:"Fígado/Vitaminas" },
  { nome:"FSH", val:"4,01", unit:"mUI/mL", ref:"3,03-8,08", status:"ok", cat:"Hormônios" },
  { nome:"Estradiol", val:"17", unit:"pg/mL", ref:"21-251", status:"baixo", cat:"Hormônios" },
  { nome:"SHBG", val:"43,6", unit:"nmol/L", ref:"11,7-155,2", status:"ok", cat:"Hormônios" },
  { nome:"Testosterona Total", val:"34", unit:"ng/dL", ref:"13-53", status:"ok", cat:"Hormônios" },
  { nome:"Testosterona Livre", val:"0,52", unit:"ng/dL", ref:"0,09-1,56", status:"ok", cat:"Hormônios" },
];

const EXAME_CATS = ["Hemograma","Metabólico","Hormônios","Fígado/Vitaminas"];

// ── BODY EVOLUTION DATA ──────────────────────────────────────────────────────
const BODY_2022 = { peso:64.1, gordura:31.6, magra:43.84, imc:24.42, cintura:74.5, abdomen:83.5, quadril:104 };
const BODY_2025 = { peso:59.45, gordura:22.88, magra:45.85, imc:23.22, cintura:67, abdomen:76, quadril:100, musculo:25.78 };
// InBody 31/03/2026
const BODY_2026 = { peso:59.9, gordura:24.5, magra:45.2, gorduraKg:14.7, musculo:24.5, imc:22.8, rcq:0.81, tmb:1346, agua:33.1, metaGordura:-1.2, kcalDia:1800 };

// ── PROFISSIONAIS ────────────────────────────────────────────────────────────
const PROFISSIONAIS = [
  { nome:"Nutricionista (preencha com o seu)", emoji:"🥗" },
  { nome:"Médica Clínica (preencha com a sua)", emoji:"👩‍⚕️" },
  { nome:"A definir", cargo:"Ginecologista", registro:"", emoji:"🏥" },
  { nome:"A definir", cargo:"Psiquiatra", registro:"", emoji:"🧠" },
  { nome:"A definir", cargo:"Fisioterapeuta", registro:"", emoji:"🦴" },
];

// ── FASE 2: HÁBITOS ───────────────────────────────────────────────────────────
const DEFAULT_HABITS = [
  {id:"h1",name:"Proteína pós-treino",emoji:"🥤",category:"treinos",color:"#5DCAA5",days:[1,2,3,4,5,6],target:6},
  {id:"h2",name:"Hidratação 2L",      emoji:"💧",category:"saude",  color:"#378ADD",days:[0,1,2,3,4,5,6],target:7},
  {id:"h3",name:"Alongamento",        emoji:"🧘‍♀️",category:"treinos",color:"#8E7CC4",days:[1,2,3,4,5,6],target:6},
  {id:"h4",name:"Momento casal",      emoji:"❤️", category:"casal",  color:"#D4537E",days:[0,3,6],target:3},
  {id:"h5",name:"Leitura 15min",      emoji:"📚", category:"mente",  color:"#BA7517",days:[0,1,2,3,4,5,6],target:7},
  {id:"h6",name:"Sem celular cedo",   emoji:"📵", category:"saude",  color:"#7F77DD",days:[1,2,3,4,5],target:5},
];

// ── FASE 2: REVISÃO SEMANAL ────────────────────────────────────────────────────
const REVIEW_STEPS = [
  {id:"s1",icon:"📥",title:"Esvaziar o Inbox",desc:"Processe cada item capturado esta semana. O que fazer, delegar ou descartar?",action:"Revisar capturas"},
  {id:"s2",icon:"🎯",title:"Prioridade da Semana",desc:"A prioridade foi cumprida? O que ficou pendente segue ou descarta?",action:"Avaliar prioridade"},
  {id:"s3",icon:"🎡",title:"Roda da Vida",desc:"Atualize as notas de cada área. Algo mudou esta semana?",action:"Atualizar roda"},
  {id:"s4",icon:"🏅",title:"Hábitos da Semana",desc:"Quantos dias você manteve cada hábito? Celebre as sequências!",action:"Ver hábitos"},
  {id:"s5",icon:"🔮",title:"Prioridade da Próxima Semana",desc:"Uma coisa só — o que se feito tornará tudo o resto mais fácil?",action:"Definir prioridade"},
  {id:"s6",icon:"✅",title:"Revisão Concluída",desc:"Semana revisada com clareza. Mente livre, pronta para criar.",action:"Finalizar"},
];

const REVIEW_P = `Você é um coach de revisão semanal usando GTD + Essentialism + Atomic Habits + Roda da Vida. Analise os dados da semana da usuária e gere um relatório de revisão conciso, encorajador e honesto. Inclua: o que foi bem, o que merece atenção, e UMA sugestão prática para a próxima semana. Português informal. Máx 250 palavras. Seja direto como uma amiga de confiança que conhece bem a rotina dela.`;

// ── FASE 2: BUFFERS ────────────────────────────────────────────────────────────
const BUFFER_TYPES = [
  {key:"recuperacao",label:"Recuperação",emoji:"🔋",color:"#7F77DD",desc:"Após treino pesado ou dia intenso"},
  {key:"transicao",  label:"Transição",  emoji:"⏱",  color:"#378ADD",desc:"Entre trabalho e vida pessoal"},
  {key:"casal",      label:"Casal",      emoji:"❤️", color:"#D4537E",desc:"Tempo protegido a dois"},
  {key:"foco",       label:"Foco",       emoji:"🎯", color:"#5DCAA5",desc:"Trabalho profundo sem interrupção"},
  {key:"livre",      label:"Livre",      emoji:"✨",  color:"#BA7517",desc:"Sem agenda — recuperação mental"},
];
const DEF_BUFFERS = [
  {id:"b1",day:"segunda",time:"19:30",duration:30,type:"recuperacao",note:"Pós-treino: alongar, proteína, descansar"},
  {id:"b2",day:"sexta",  time:"18:00",duration:60,type:"transicao",  note:"Fechar semana de trabalho antes do fim de semana"},
  {id:"b3",day:"domingo",time:"19:00",duration:90,type:"casal",      note:"Jantar e tempo de qualidade — sem celular"},
];

// ── AI PROMPTS ────────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `Você é o assistente integrado de casa, treinos, roda da vida e rotina de um casal.
SOBRE A USUÁRIA: Atleta e profissional de alta performance. Triatleta: corrida (Seg/Qua/Sex/Sáb), musculação com personal (Ter/Qui). Compras sábado, limpeza quinta. Marido parceiro.
IDENTIDADE: "Sou atleta, profissional e parceira presente."
METODOLOGIAS que você conhece: GTD (capture + revisão semanal), Atomic Habits (identidade + 1% melhor), Essentialism (UMA prioridade), Roda da Vida (8 áreas, equilíbrio).
TOM: Prático, carinhoso, objetivo. Português brasileiro informal. Fale como parceira estratégica da rotina dela.`;

const SHOPPING_PROMPT = `Assistente de compras de uma atleta. Gere lista baseada em CARDÁPIO + ESTOQUE + TREINOS.
REGRAS: Porções 2 pessoas. Não liste itens "ok" no estoque. "baixo"=repor, "acabou"=urgente. Treino pesado→carbo+proteína. Categorias: 🥬Hortifruti|🥛Laticínios|🥩Carnes|🍞Padaria|🫙Mercearia|🏋️Suplementos|🧴Higiene|🧹Limpeza.
Responda APENAS JSON puro: {"categorias":[{"nome":"Hortifruti","emoji":"🥬","itens":["banana"]}],"observacoes":"dica","alertas":["urgente"]}`;

// ── API CONFIG ────────────────────────────────────────────────────────────────
const isLocal = typeof window !== "undefined" && window.location.hostname === "localhost";
const API = isLocal ? "http://localhost:3001" : "";

// ── RADAR CHART ────────────────────────────────────────────────────────────────
function RadarChart({ scores, size = 300, compact = false }) {
  const vw = 500, vh = 360;
  const cx = 250, cy = 180;
  const maxR = compact ? 88 : 105;
  const labelR = compact ? 118 : 140;
  const n = WHEEL_AREAS.length;

  const pt = (idx, score) => {
    const angle = (idx * 2 * Math.PI / n) - Math.PI / 2;
    const r = (Math.max(0.3, Math.min(10, score || 0)) / 10) * maxR;
    return { x: +(cx + r * Math.cos(angle)).toFixed(1), y: +(cy + r * Math.sin(angle)).toFixed(1) };
  };
  const gridPt = (idx, ring) => {
    const angle = (idx * 2 * Math.PI / n) - Math.PI / 2;
    const r = (ring / 5) * maxR;
    return { x: +(cx + r * Math.cos(angle)).toFixed(1), y: +(cy + r * Math.sin(angle)).toFixed(1) };
  };
  const labelPt = (idx) => {
    const angle = (idx * 2 * Math.PI / n) - Math.PI / 2;
    const cosA = Math.cos(angle);
    return {
      x: +(cx + labelR * cosA).toFixed(1),
      y: +(cy + labelR * Math.sin(angle)).toFixed(1),
      anchor: Math.abs(cosA) < 0.25 ? "middle" : cosA > 0 ? "start" : "end",
    };
  };

  const filledPts = WHEEL_AREAS.map((a, i) => { const p = pt(i, scores[a.key]); return `${p.x},${p.y}`; }).join(" ");
  const avgScore = (Object.values(scores).reduce((a, b) => a + b, 0) / 8).toFixed(1);

  return (
    <svg width={size} viewBox={`0 0 ${vw} ${vh}`} style={{ display:"block", width:"100%", maxWidth:size }}>
      {[1,2,3,4,5].map(ring => {
        const pts = WHEEL_AREAS.map((_, i) => { const p = gridPt(i, ring); return `${p.x},${p.y}`; }).join(" ");
        return <polygon key={ring} points={pts} fill="none" stroke="rgba(44,44,42,0.08)" strokeWidth={ring===5?"1":"0.5"}/>;
      })}
      {WHEEL_AREAS.map((_, i) => {
        const outer = gridPt(i, 5);
        return <line key={i} x1={cx} y1={cy} x2={outer.x} y2={outer.y} stroke="rgba(44,44,42,0.08)" strokeWidth="0.5"/>;
      })}
      <polygon points={filledPts} fill="rgba(93,202,165,0.15)" stroke="#5DCAA5" strokeWidth="2" strokeLinejoin="round"/>
      {WHEEL_AREAS.map((area, i) => {
        const p = pt(i, scores[area.key]);
        return <circle key={i} cx={p.x} cy={p.y} r="5" fill={area.color} stroke="white" strokeWidth="1.5"/>;
      })}
      <text x={cx} y={cy-8} textAnchor="middle" fontSize="18" fontFamily="'DM Sans',sans-serif" fill="rgba(44,44,42,0.5)" fontWeight="600">{avgScore}</text>
      <text x={cx} y={cy+10} textAnchor="middle" fontSize="9" fontFamily="'DM Sans',sans-serif" fill="rgba(44,44,42,0.35)">média</text>
      {!compact && WHEEL_AREAS.map((area, i) => {
        const lp = labelPt(i);
        return (
          <text key={i} x={lp.x} y={lp.y} textAnchor={lp.anchor} fontSize="11" fontFamily="'DM Sans',sans-serif" fill="rgba(44,44,42,0.65)" dominantBaseline="central">
            {area.emoji} {area.shortLabel}
          </text>
        );
      })}
    </svg>
  );
}

// ── STREAK FLAME ──────────────────────────────────────────────────────────────
function Flame({ streak: s }) {
  if (s < 2) return null;
  return <span className="flame" style={{ fontSize:13, marginLeft:3 }} title={`${s} dias seguidos`}>🔥</span>;
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────────
export default function VidaEmOrdem() {
  const today = new Date().getDay();
  const todayKey = DAY_KEY_MAP[today];

  // ── NAVIGATION state ──
  const [mainTab, setMainTab] = useState("euHoje");
  const [subTab, setSubTab] = useState("");

  // ── existing state ──
  const [trainings,  setTrainings]  = useState(DEFAULT_TRAININGS);
  const [meals,      setMeals]      = useState(() => { const o={}; WEEK_DAYS.forEach(d=>{ const isLow=LOW_CARB_DAYS.includes(d.key); const dieta=isLow?DIETA_LOW:DIETA_CARB; const m={}; MEALS.forEach(ml=>{ m[ml]=dieta[ml]||""; }); o[d.key]=m; }); return o; });
  const [meatWeek,   setMeatWeek]   = useState(1);
  const [stock,      setStock]      = useState(DEFAULT_STOCK);
  const [newStockItem, setNewStockItem] = useState({ name:"", qty:1, unit:"un", category:"despensa" });
  const [routine,    setRoutine]    = useState(() => { const o={}; WEEK_DAYS.forEach(d=>{ o[d.key]=[]; }); return o; });
  const [newEvent,   setNewEvent]   = useState({ day:"segunda", time:"09:00", title:"", type:"trabalho", person:"thaynara" });
  const [generatedList, setGeneratedList] = useState(null);
  const [generatingList,setGeneratingList]= useState(false);
  const [listObs,    setListObs]    = useState("");
  const [listAlertas,setListAlertas]= useState([]);
  const [checkedItems,setCheckedItems]= useState({});
  const [manualItems, setManualItems] = useState([]);
  const [newManual,  setNewManual]  = useState("");
  const [newManualCat,setNewManualCat]= useState("Hortifruti");
  const [checklist,  setChecklist]  = useState({ quinta:Array(5).fill(false), sabado:Array(5).fill(false) });
  const [messages,   setMessages]   = useState([{ role:"assistant", content:"Olá! 🏡 Sou seu assistente integrado — casa, treinos, roda da vida e rotina. O que precisamos organizar hoje?" }]);
  const [chatInput,  setChatInput]  = useState("");
  const [chatLoading,setChatLoading]= useState(false);
  const chatEndRef = useRef(null);

  // ── Wheel/GTD state ──
  const [wheelScores,   setWheelScoresState] = useState(DEFAULT_SCORES);
  const [wheelHistory,  setWheelHistoryState]= useState([]);
  const [priority,      setPriorityState]    = useState({ text:"", area:"trabalho", note:"", saved:false });
  const [captures,      setCapturesState]    = useState([]);
  const [captureInput,  setCaptureInput]     = useState("");
  const [captureUrgency,setCaptureUrgency]   = useState("pendente");
  const [showCapture,   setShowCapture]      = useState(false);
  const [storageLoaded, setStorageLoaded]    = useState(false);
  const [weekLabel,     setWeekLabel]        = useState(() => {
    const d = new Date();
    const week = Math.ceil(d.getDate() / 7);
    return `Semana ${week} · ${d.toLocaleString("pt-BR",{month:"short"})}/${d.getFullYear()}`;
  });

  // ── Calendar state ──
  const [calMonth, setCalMonth] = useState(() => new Date().getMonth());
  const [calYear, setCalYear] = useState(() => new Date().getFullYear());
  const [calSelectedDay, setCalSelectedDay] = useState(null);

  // ── Garmin state ──
  const [garminData, setGarminData] = useState(null);
  const [garminLoading, setGarminLoading] = useState(false);

  // ── Strava state ──
  const [stravaAuth, setStravaAuth] = useState(false);
  const [stravaAthlete, setStravaAthlete] = useState(null);
  const [stravaStats, setStravaStats] = useState(null);
  const [stravaActivities, setStravaActivities] = useState([]);
  const [stravaWeekly, setStravaWeekly] = useState([]);
  const [stravaLoading, setStravaLoading] = useState(false);
  const [stravaError, setStravaError] = useState(null);
  const [stravaView, setStravaView] = useState("painel");

  // ── Saude sub-tab state ──
  const [saudeTab, setSaudeTab] = useState("exames");

  // ── Fase 2: Hábitos ──
  const [habits, setHabits] = useState(DEFAULT_HABITS);
  const [habitLog, setHabitLog] = useState({});
  const [newHabit, setNewHabit] = useState({name:"",emoji:"⭐",category:"saude",color:"#5DCAA5",days:[0,1,2,3,4,5,6],target:7});
  const [showAddHabit, setShowAddHabit] = useState(false);

  // ── Fase 2: Revisão Semanal ──
  const [reviewStep, setReviewStep] = useState(0);
  const [reviewNotes, setReviewNotes] = useState({});
  const [reviewAI, setReviewAI] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewDone, setReviewDone] = useState(false);
  const [lastReview, setLastReview] = useState(null);

  // ── Fase 2: Buffers ──
  const [buffers, setBuffers] = useState(DEF_BUFFERS);
  const [newBuf, setNewBuf] = useState({day:"segunda",time:"19:00",duration:30,type:"recuperacao",note:""});

  // ── Estudos (Multi-curso) ──
  const [cursos, setCursos] = useState([
    { id: "mba", nome: "MBA Gestao de Projetos e Metodologias Ageis", emoji: "\u{1F4CA}", cor: "#BA7517" },
  ]);
  const [cursoAtivo, setCursoAtivo] = useState("mba");
  const [aulas, setAulas] = useState({});  // { "mba": [...], "curso2": [...] }
  const [newAula, setNewAula] = useState({modulo:"",titulo:"",data:"",notas:""});
  const [diarioEntries, setDiarioEntries] = useState({}); // { "mba": [...] }
  const [newDiario, setNewDiario] = useState({titulo:"",conteudo:"",tags:""});
  const [showAddCurso, setShowAddCurso] = useState(false);
  const [newCurso, setNewCurso] = useState({ nome: "", emoji: "\u{1F4DA}", cor: "#BA7517" });
  const [estudosView, setEstudosView] = useState("aulas"); // "aulas" or "diario"

  // ── Devocional / Diario Espiritual ──
  const [devoLog, setDevoLog] = useState({});  // {"2026-03-22": "Senti paz..."}
  const [devoInput, setDevoInput] = useState("");

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  // ── STORAGE: load on mount ──
  useEffect(() => {
    const load = async () => {
      try {
        const ps = await window.storage.get("priority");
        if (ps) setPriorityState(JSON.parse(ps.value));
        const ws = await window.storage.get("wheelScores");
        if (ws) setWheelScoresState(JSON.parse(ws.value));
        const wh = await window.storage.get("wheelHistory");
        if (wh) setWheelHistoryState(JSON.parse(wh.value));
        const caps = await window.storage.get("captures");
        if (caps) setCapturesState(JSON.parse(caps.value));
        // Phase 2 storage
        const hl = await window.storage.get("nc_habitlog");
        if (hl) setHabitLog(JSON.parse(hl.value));
        const hb = await window.storage.get("nc_habits");
        if (hb) setHabits(JSON.parse(hb.value));
        const bf = await window.storage.get("nc_buffers");
        if (bf) setBuffers(JSON.parse(bf.value));
        const rv = await window.storage.get("nc_lastreview");
        if (rv) setLastReview(JSON.parse(rv.value));
        const cr = await window.storage.get("nc_cursos");
        if (cr) setCursos(JSON.parse(cr.value));
        const au = await window.storage.get("nc_aulas");
        if (au) setAulas(JSON.parse(au.value));
        const di = await window.storage.get("nc_diario");
        if (di) setDiarioEntries(JSON.parse(di.value));
        const dl = await window.storage.get("nc_devolog");
        if (dl) setDevoLog(JSON.parse(dl.value));
      } catch(e) { /* first time */ }
      setStorageLoaded(true);
    };
    load();
  }, []);

  // ── Garmin: load on mount ──
  useEffect(() => {
    const loadGarmin = async () => {
      try {
        const url = isLocal ? `${API}/api/garmin/data` : `/api/garmin-data`;
        const res = await fetch(url);
        if (res.ok) { const d = await res.json(); setGarminData(d); }
      } catch(e) { /* no garmin */ }
    };
    loadGarmin();
  }, []);

  // ── Strava: check auth on mount ──
  useEffect(() => {
    const checkStrava = async () => {
      try {
        const url = isLocal ? `${API}/auth/status` : `/api/strava-status`;
        const res = await fetch(url);
        if (res.ok) {
          const d = await res.json();
          setStravaAuth(d.authenticated || false);
        }
      } catch(e) { /* no strava */ }
    };
    checkStrava();
  }, []);

  // ── STORAGE: save helpers ──
  const sv = async (key, val) => { try { await window.storage.set(key, JSON.stringify(val)); } catch(e) {} };

  const savePriority = async (val) => {
    setPriorityState(val);
    try { await window.storage.set("priority", JSON.stringify(val)); } catch(e){}
  };
  const saveWheelScores = async (val) => {
    setWheelScoresState(val);
    try { await window.storage.set("wheelScores", JSON.stringify(val)); } catch(e){}
  };
  const saveWheelHistory = async (val) => {
    setWheelHistoryState(val);
    try { await window.storage.set("wheelHistory", JSON.stringify(val)); } catch(e){}
  };
  const saveCaptures = async (val) => {
    setCapturesState(val);
    try { await window.storage.set("captures", JSON.stringify(val)); } catch(e){}
  };

  // ── WHEEL functions ──
  const updateScore = (key, val) => saveWheelScores({ ...wheelScores, [key]: Number(val) });

  const saveWeek = async () => {
    const entry = { label: weekLabel, scores: { ...wheelScores }, date: new Date().toISOString() };
    const newHist = [entry, ...wheelHistory].slice(0, 8);
    await saveWheelHistory(newHist);
  };

  const lowAreas = WHEEL_AREAS.filter(a => (wheelScores[a.key] || 0) <= 5);
  const avgScore = (Object.values(wheelScores).reduce((a,b)=>a+b,0)/8).toFixed(1);

  // ── CAPTURE functions ──
  const addCapture = async () => {
    if (!captureInput.trim()) return;
    const item = { id: Date.now(), text: captureInput.trim(), urgency: captureUrgency, done: false, date: new Date().toISOString() };
    const newCaps = [item, ...captures];
    await saveCaptures(newCaps);
    setCaptureInput("");
    setShowCapture(false);
  };

  const toggleCapture = async (id) => {
    const updated = captures.map(c => c.id === id ? { ...c, done: !c.done } : c);
    await saveCaptures(updated);
  };

  const removeCapture = async (id) => {
    const updated = captures.filter(c => c.id !== id);
    await saveCaptures(updated);
  };

  const pendingCaptures = captures.filter(c => !c.done);
  const urgentCaptures  = captures.filter(c => !c.done && c.urgency === "urgente");

  // ── HABIT helpers ──
  const todayStr = () => new Date().toISOString().slice(0,10);
  const habitKey = (hid, dateStr) => `${hid}:${dateStr}`;
  const togHabit = async (hid, dateStr) => { const k = habitKey(hid, dateStr); const nl = {...habitLog, [k]: !habitLog[k]}; setHabitLog(nl); sv("nc_habitlog", nl); };
  const isChecked = (hid, dateStr) => !!habitLog[habitKey(hid, dateStr)];

  const streak = (hid) => { let s=0, d=new Date(); for(let i=0;i<90;i++){ const ds=d.toISOString().slice(0,10); if(habitLog[habitKey(hid,ds)]){s++;}else if(i>0){break;} d.setDate(d.getDate()-1); } return s; };

  const weekDates = () => { const now=new Date(); const day=now.getDay(); return Array.from({length:7},(_,i)=>{const d=new Date(now);d.setDate(now.getDate()-day+i);return d.toISOString().slice(0,10);}); };
  const habitWeekPct = (hid) => { const h=habits.find(x=>x.id===hid); if(!h)return 0; const wd=weekDates(); const due=wd.filter((_,i)=>h.days.includes(i)); const done=due.filter(d=>isChecked(hid,d)).length; return due.length>0?Math.round((done/due.length)*100):0; };

  const addHabit = async () => { if(!newHabit.name.trim())return; const h={...newHabit,id:"h"+Date.now()}; const nh=[...habits,h]; setHabits(nh); sv("nc_habits",nh); setNewHabit({name:"",emoji:"⭐",category:"saude",color:"#5DCAA5",days:[0,1,2,3,4,5,6],target:7}); setShowAddHabit(false); };
  const removeHabit = async (id) => { const nh=habits.filter(h=>h.id!==id); setHabits(nh); sv("nc_habits",nh); };
  const toggleDay = (dayIdx) => { const d=newHabit.days.includes(dayIdx)?newHabit.days.filter(x=>x!==dayIdx):[...newHabit.days,dayIdx]; setNewHabit(p=>({...p,days:d,target:d.length})); };

  // ── Buffer helpers ──
  const addBuffer = async () => { if(!newBuf.note&&!newBuf.type)return; const b={...newBuf,id:"b"+Date.now()}; const nb=[...buffers,b]; setBuffers(nb); sv("nc_buffers",nb); setNewBuf({day:"segunda",time:"19:00",duration:30,type:"recuperacao",note:""}); };
  const removeBuffer = async (id) => { const nb=buffers.filter(b=>b.id!==id); setBuffers(nb); sv("nc_buffers",nb); };

  // ── Estudos helpers ──
  const addAula = async () => {
    if (!newAula.titulo.trim()) return;
    const a = { ...newAula, id: Date.now(), criadoEm: new Date().toISOString() };
    const cursoAulas = aulas[cursoAtivo] || [];
    const na = { ...aulas, [cursoAtivo]: [a, ...cursoAulas] };
    setAulas(na); sv("nc_aulas", na);
    setNewAula({modulo:"",titulo:"",data:"",notas:""});
  };
  const removeAula = async (id) => {
    const cursoAulas = (aulas[cursoAtivo] || []).filter(a => a.id !== id);
    const na = { ...aulas, [cursoAtivo]: cursoAulas };
    setAulas(na); sv("nc_aulas", na);
  };
  const addDiario = async () => {
    if (!newDiario.conteudo.trim()) return;
    const d = { ...newDiario, id: Date.now(), data: new Date().toISOString() };
    const cursoDiario = diarioEntries[cursoAtivo] || [];
    const nd = { ...diarioEntries, [cursoAtivo]: [d, ...cursoDiario] };
    setDiarioEntries(nd); sv("nc_diario", nd);
    setNewDiario({titulo:"",conteudo:"",tags:""});
  };
  const removeDiario = async (id) => {
    const cursoDiario = (diarioEntries[cursoAtivo] || []).filter(d => d.id !== id);
    const nd = { ...diarioEntries, [cursoAtivo]: cursoDiario };
    setDiarioEntries(nd); sv("nc_diario", nd);
  };
  const addCurso = async () => {
    if (!newCurso.nome.trim()) return;
    const c = { ...newCurso, id: "c" + Date.now() };
    const nc = [...cursos, c];
    setCursos(nc); sv("nc_cursos", nc);
    setCursoAtivo(c.id);
    setNewCurso({ nome: "", emoji: "\u{1F4DA}", cor: "#BA7517" });
    setShowAddCurso(false);
  };
  const removeCurso = async (id) => {
    if (id === "mba") return; // Can't remove default
    const nc = cursos.filter(c => c.id !== id);
    setCursos(nc); sv("nc_cursos", nc);
    if (cursoAtivo === id) setCursoAtivo("mba");
  };

  // ── Revisão Semanal AI ──
  const runReviewAI = async () => {
    setReviewLoading(true); setReviewAI("");
    const avg = (Object.values(wheelScores).reduce((a,b)=>a+b,0)/8).toFixed(1);
    const lows = WHEEL_AREAS.filter(w=>wheelScores[w.key]<=5).map(w=>`${w.label}(${wheelScores[w.key]})`).join(", ");
    const highs = WHEEL_AREAS.filter(w=>wheelScores[w.key]>=8).map(w=>`${w.label}(${wheelScores[w.key]})`).join(", ");
    const habStrs = habits.map(h=>`${h.name}: ${habitWeekPct(h.id)}% da semana`).join(", ");
    const pending = captures.filter(c=>!c.done).length;
    const ctx = `DADOS DA SEMANA:
Roda da Vida (média ${avg}/10): Pontos fortes: ${highs||"nenhum acima de 8"}. Atenção: ${lows||"tudo ok"}.
Hábitos: ${habStrs}
Prioridade da semana: "${priority.text||"não definida"}"
Capturas pendentes no inbox: ${pending}
Notas da revisão: ${Object.values(reviewNotes).filter(Boolean).join(" | ")||"nenhuma"}`;
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:600,system:REVIEW_P,messages:[{role:"user",content:ctx}]})});
      const d = await r.json(); const txt = d.content?.map(b=>b.text||"").join("")||"Erro."; setReviewAI(txt);
    } catch { setReviewAI("Erro ao conectar."); }
    setReviewLoading(false);
  };

  const finishReview = async () => {
    const rev = {date:new Date().toISOString(),summary:reviewAI,scores:{...wheelScores},habitsPct:habits.map(h=>({id:h.id,name:h.name,pct:habitWeekPct(h.id)}))};
    setLastReview(rev); sv("nc_lastreview",rev); setReviewDone(true);
  };

  // ── Computed Phase 2 ──
  const wd = weekDates();
  const todayBufs = buffers.filter(b=>b.day===todayKey).sort((a,z)=>a.time.localeCompare(z.time));
  const totalHabitPct = habits.length>0 ? Math.round(habits.reduce((s,h)=>s+habitWeekPct(h.id),0)/habits.length) : 0;

  // ── TRAINING helpers ──
  const updTrain = (day, idx, field, val) => setTrainings(p => {
    const arr = [...(p[day]||[])];
    arr[idx] = { ...arr[idx], [field]: val };
    return { ...p, [day]: arr };
  });
  const addTrainToDay = (day) => setTrainings(p => ({ ...p, [day]: [...(p[day]||[]), { type:"corrida", duration:30, intensity:"moderado" }] }));
  const removeTrainFromDay = (day, idx) => setTrainings(p => {
    const arr = (p[day]||[]).filter((_,i)=>i!==idx);
    return { ...p, [day]: arr.length>0?arr:[{ type:"descanso", duration:0, intensity:"leve" }] };
  });
  const weekStats = () => {
    const counts = {}; let totalMin = 0;
    Object.values(trainings).forEach(arr => {
      (arr||[]).forEach(t => {
        if (t.type !== "descanso") { counts[t.type] = (counts[t.type]||0)+1; totalMin += t.duration||0; }
      });
    });
    return { counts, totalMin };
  };

  // ── MEAL helpers ──
  const updMeal = (day, meal, val) => setMeals(p => ({ ...p, [day]: { ...p[day], [meal]: val } }));

  // ── STOCK helpers ──
  const updStockStatus = (id, status) => setStock(p => p.map(i => i.id===id ? {...i,status} : i));
  const removeStock = id => setStock(p => p.filter(i => i.id!==id));
  const addStock = () => {
    if (!newStockItem.name.trim()) return;
    setStock(p => [...p, { ...newStockItem, id:Date.now(), status:"ok" }]);
    setNewStockItem({ name:"", qty:1, unit:"un", category:"despensa" });
  };

  // ── ROUTINE helpers ──
  const addEvent = () => {
    if (!newEvent.title.trim()) return;
    setRoutine(p => ({ ...p, [newEvent.day]: [...(p[newEvent.day]||[]), { ...newEvent, id:Date.now() }].sort((a,b)=>a.time.localeCompare(b.time)) }));
    setNewEvent(p => ({ ...p, title:"" }));
  };
  const removeEvent = (day, id) => setRoutine(p => ({ ...p, [day]: p[day].filter(e=>e.id!==id) }));

  // ── SHOPPING ──
  const buildCtx = () => {
    let txt = "CARDÁPIO + TREINOS:\n\n";
    WEEK_DAYS.forEach(({key,label}) => {
      const d = meals[key]; const tarr = trainings[key]||[];
      const trainLabels = tarr.filter(t=>t.type!=="descanso").map(t=>{ const tt=TRAINING_TYPES[t.type]; return `${tt.label} ${t.duration>0?t.duration+"min "+t.intensity:""}`; }).join(" + ") || "Descanso";
      txt += `${label} [${trainLabels}] [${getCarbType(key)}]:\n`;
      MEALS.forEach(m => { if (d[m]?.trim()) txt += `  ${m}: ${d[m]}\n`; });
      txt += "\n";
    });
    txt += "\nESTOQUE:\n";
    const acabou = stock.filter(i=>i.status==="acabou");
    const baixo  = stock.filter(i=>i.status==="baixo");
    const ok     = stock.filter(i=>i.status==="ok");
    if (acabou.length) txt += `ACABOU: ${acabou.map(i=>i.name).join(", ")}\n`;
    if (baixo.length)  txt += `BAIXO: ${baixo.map(i=>`${i.name}(${i.qty}${i.unit})`).join(", ")}\n`;
    if (ok.length)     txt += `OK: ${ok.map(i=>i.name).join(", ")}\n`;
    txt += meatWeek===1 ? "\nSemana 1 carnes — comprar para 2 semanas.\n" : "\nSemana 2 carnes — usar congelado.\n";
    return txt;
  };

  const generateList = async () => {
    setGeneratingList(true); setGeneratedList(null);
    setMainTab("casa"); setSubTab("compras");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000,
          system: SHOPPING_PROMPT, messages:[{ role:"user", content: buildCtx() }] })
      });
      const data = await res.json();
      const raw  = data.content?.map(b=>b.text||"").join("")||"{}";
      const parsed = JSON.parse(raw.replace(/```json|```/g,"").trim());
      setGeneratedList(parsed.categorias||[]);
      setListObs(parsed.observacoes||"");
      setListAlertas(parsed.alertas||[]);
      setCheckedItems({});
    } catch { setGeneratedList([]); setListObs("Erro ao gerar."); }
    setGeneratingList(false);
  };

  const toggleCheck = (ci, ii) => {
    const k = `${ci}-${ii}`;
    setCheckedItems(p => ({ ...p, [k]: !p[k] }));
  };

  const totalItems = (generatedList||[]).reduce((a,c)=>a+c.itens.length,0) + manualItems.length;
  const doneItems  = Object.values(checkedItems).filter(Boolean).length + manualItems.filter(i=>i.done).length;
  const pct        = totalItems>0 ? Math.round((doneItems/totalItems)*100) : 0;

  // ── GARMIN helpers ──
  const syncGarmin = async () => {
    setGarminLoading(true);
    try {
      const url = isLocal ? `${API}/api/garmin/sync` : `/api/garmin-data`;
      const res = await fetch(url);
      if (res.ok) { const d = await res.json(); setGarminData(d); }
    } catch(e) { /* garmin error */ }
    setGarminLoading(false);
  };

  const gSleep = garminData?.sleep?.dailySleepDTO;
  const gHR = garminData?.hr || garminData?.heartRate;
  const gSteps = garminData?.steps;
  const gHRV = garminData?.sleep?.avgOvernightHrv;
  const gBB = garminData?.sleep?.bodyBatteryChange;
  const gSleepScore = gSleep?.sleepScores?.overall?.value;
  const gSleepH = gSleep ? Math.floor((gSleep.sleepTimeSeconds || 0) / 3600) : null;
  const gSleepM = gSleep ? Math.round(((gSleep.sleepTimeSeconds || 0) % 3600) / 60) : null;
  const gDeep = gSleep ? Math.round((gSleep.deepSleepSeconds || 0) / 60) : null;
  const gREM = gSleep ? Math.round((gSleep.remSleepSeconds || 0) / 60) : null;
  const gRestHR = gHR?.restingHeartRate || garminData?.sleep?.restingHeartRate;

  // ── STRAVA helpers ──
  const loadStravaData = async () => {
    setStravaLoading(true);
    setStravaError(null);
    try {
      const athleteUrl = isLocal ? `${API}/api/strava/athlete` : `/api/strava-data?endpoint=athlete`;
      const activitiesUrl = isLocal ? `${API}/api/strava/activities` : `/api/strava-data?endpoint=activities`;
      const weeklyUrl = isLocal ? `${API}/api/strava/weekly-analysis` : `/api/strava-data?endpoint=weekly-analysis`;
      const [aRes, actRes, wRes] = await Promise.all([fetch(athleteUrl), fetch(activitiesUrl), fetch(weeklyUrl)]);
      if (aRes.ok) { const a = await aRes.json(); setStravaAthlete(a); }
      if (actRes.ok) { const acts = await actRes.json(); setStravaActivities(Array.isArray(acts) ? acts : []); }
      if (wRes.ok) { const w = await wRes.json(); setStravaWeekly(Array.isArray(w) ? w : []); }
    } catch(e) { setStravaError("Erro ao carregar dados do Strava"); }
    setStravaLoading(false);
  };

  const getHRZone = (avgHR) => {
    if (!avgHR) return { zone:"--", color:"#9A9082" };
    if (avgHR < 120) return { zone:"Z1", color:"#7C9E8E" };
    if (avgHR < 140) return { zone:"Z2", color:"#5DCAA5" };
    if (avgHR < 155) return { zone:"Z3", color:"#D4C44A" };
    if (avgHR < 170) return { zone:"Z4", color:"#E8845A" };
    return { zone:"Z5", color:"#C46A6A" };
  };

  const calcWeeklyScore = () => {
    if (!stravaActivities.length) return 0;
    const now = new Date();
    const weekAgo = new Date(now - 7*24*60*60*1000);
    const weekActs = stravaActivities.filter(a => new Date(a.start_date) >= weekAgo);
    const totalKm = weekActs.reduce((s,a) => s + (a.distance||0)/1000, 0);
    const totalCal = weekActs.reduce((s,a) => s + (a.calories||0), 0);
    const days = new Set(weekActs.map(a => new Date(a.start_date).toDateString())).size;
    const volumeScore = Math.min(40, (totalKm / 40) * 40);
    const consistencyScore = Math.min(30, (days / 5) * 30);
    const calScore = Math.min(30, (totalCal / 3000) * 30);
    return Math.round(volumeScore + consistencyScore + calScore);
  };

  // ── CHAT ──
  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const um = { role:"user", content: chatInput };
    const hist = [...messages, um];
    setMessages(hist); setChatInput(""); setChatLoading(true);
    try {
      const habStr = habits.map(h=>`${h.name}:${streak(h.id)}dias streak`).join(", ");
      const ctx = `ESTADO ATUAL: Treinos: ${Object.entries(trainings).map(([d,t])=>`${d}=${TRAINING_TYPES[t.type].label} ${t.duration}min`).join(", ")}. Roda da vida: ${WHEEL_AREAS.map(a=>`${a.label}=${wheelScores[a.key]}`).join(", ")}. Capturas pendentes: ${pendingCaptures.length}. Prioridade da semana: "${priority.text||"não definida"}". Hábitos: ${habStr}.`;
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000,
          system: SYSTEM_PROMPT+"\n\n"+ctx,
          messages: hist.map(m=>({ role:m.role, content:m.content })) })
      });
      const data = await res.json();
      const txt  = data.content?.map(b=>b.text||"").join("")||"Desculpe, tente novamente.";
      setMessages([...hist, { role:"assistant", content:txt }]);
    } catch { setMessages([...hist, { role:"assistant", content:"Erro ao conectar." }]); }
    setChatLoading(false);
  };

  // ── Calendar helpers ──
  const getCalDays = () => {
    const first = new Date(calYear, calMonth, 1);
    const startDay = first.getDay();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < startDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
  };

  const getTrainingForDate = (day) => {
    const d = new Date(calYear, calMonth, day);
    const key = DAY_KEY_MAP[d.getDay()];
    return trainings[key] || [];
  };

  const getEventsForDate = (day) => {
    const d = new Date(calYear, calMonth, day);
    const key = DAY_KEY_MAP[d.getDay()];
    return routine[key] || [];
  };

  // ── STYLES ──
  const todayTrains = trainings[todayKey] || [];
  const todayTrain = todayTrains[0];
  const todayTT    = TRAINING_TYPES[todayTrain?.type];
  const todayHasRealTraining = todayTrains.some(t => t.type !== "descanso");
  const { counts: trainCounts, totalMin } = weekStats();

  const inputSt = (extra={}) => ({
    border:"1.5px solid rgba(44,44,42,0.12)", borderRadius:"9px", padding:"7px 10px",
    fontSize:"12px", fontFamily:"'DM Sans',sans-serif", background:"rgba(255,255,255,0.82)", color:"#2C2C2A", ...extra
  });

  // ── MAIN TAB DEFINITIONS ──
  const MAIN_TABS = [
    { id:"euHoje",     label:"Hoje",       icon:"🏠" },
    { id:"calendario", label:"Calendario", icon:"📅" },
    { id:"casa",       label:"Casa",       icon:"🏡" },
    { id:"treinos",    label:"Treinos",    icon:"💪" },
    { id:"saude",      label:"Saude",      icon:"❤️" },
    { id:"estudos",    label:"Estudos",    icon:"📚" },
  ];

  const SUB_TABS = {
    casa:    [{ id:"rotina", label:"Rotina" },{ id:"estoque", label:"Estoque" },{ id:"compras", label:"Compras" },{ id:"checklist", label:"Checklist" },{ id:"chat", label:"Assistente" }],
    treinos: [{ id:"plano", label:"Plano" },{ id:"cardapio", label:"Cardapio" },{ id:"strava", label:"Strava" },{ id:"roda", label:"Roda da Vida" },{ id:"habitos", label:"Habitos" },{ id:"buffers", label:"Buffers" }],
    saude:   [{ id:"exames", label:"Exames" },{ id:"evolucao", label:"Evolucao" },{ id:"profissionais", label:"Profissionais" },{ id:"revisao", label:"Revisao" }],
    estudos: [],
  };

  const getActiveSubTab = () => {
    const subs = SUB_TABS[mainTab];
    if (!subs) return null;
    if (subTab && subs.find(s => s.id === subTab)) return subTab;
    return subs[0].id;
  };

  const activeSubTab = getActiveSubTab();

  const bottomNavItemSt = id => ({
    display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
    gap:2, border:"none", background:"transparent",
    color: mainTab===id?"#C4956A":"#8A8578",
    cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:"10px",
    fontWeight: mainTab===id?"600":"400",
    transition:"all 0.2s", flex:1, padding:"6px 0",
  });

  const subTabSt = id => ({
    padding:"6px 14px", border:"none",
    background: activeSubTab===id?"#C4956A":"rgba(0,0,0,0.04)",
    color: activeSubTab===id?"#FFFFFF":"#8A8578",
    borderRadius:"20px", cursor:"pointer",
    fontFamily:"'DM Sans',sans-serif", fontSize:"12px",
    fontWeight: activeSubTab===id?"600":"400",
    transition:"all 0.15s", whiteSpace:"nowrap",
  });

  // ── Smart Alerts (Eu Hoje) ──
  const smartAlerts = [];
  if (gSleepScore && gSleepScore < 60) smartAlerts.push({ text:"Sono abaixo de 60 — considere reduzir intensidade do treino", color:"#C46A6A" });
  if (gBB && gBB < 30) smartAlerts.push({ text:"Body Battery baixo — priorize recuperação ativa", color:"#C46A6A" });
  const stockAlerts = stock.filter(i => i.status === "acabou" || i.status === "baixo");

  // ── RENDER ────────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html, body { overscroll-behavior:none; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-thumb { background:#C9BFA8; border-radius:4px; }
        textarea:focus, input:focus, select:focus { outline:none; }
        .meal-ta:focus { border-color:#7C9E8E !important; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .bubble { animation:fadeUp 0.3s ease; }
        @keyframes blink { 0%,100%{opacity:0.25} 50%{opacity:1} }
        .d1{animation:blink 1.2s 0s infinite} .d2{animation:blink 1.2s .2s infinite} .d3{animation:blink 1.2s .4s infinite}
        .card { background:#FFFFFF; border-radius:16px; box-shadow:0 2px 8px rgba(0,0,0,0.04); padding:16px; border:none; }
        .card:hover { box-shadow:0 4px 16px rgba(0,0,0,0.07) !important; }
        .shop-row:hover { background:rgba(255,255,255,0.9) !important; }
        .chk-row:hover { background:rgba(124,158,142,0.08); }
        .gen-btn:hover:not(:disabled){ transform:translateY(-1px); box-shadow:0 6px 20px rgba(124,158,142,0.35)!important; }
        .gen-btn:disabled { opacity:0.55; cursor:not-allowed; }
        input[type=range] { -webkit-appearance:none; height:4px; border-radius:2px; background:rgba(44,44,42,0.12); }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:14px; height:14px; border-radius:50%; background:currentColor; cursor:pointer; }
        .cap-row:hover { background:rgba(255,255,255,0.8) !important; }
        @keyframes pulse-ring { 0%{opacity:1;transform:scale(1)} 70%{opacity:0;transform:scale(1.4)} 100%{opacity:0;transform:scale(1.4)} }
        .pulse-dot::after { content:''; position:absolute; top:-3px; left:-3px; right:-3px; bottom:-3px; border-radius:50%; border:2px solid #C46A6A; animation:pulse-ring 1.8s ease-out infinite; }
        .cal-cell:hover { background:rgba(124,158,142,0.12) !important; }
        .cal-cell-today { box-shadow:inset 0 0 0 2px #1A1A18 !important; }
        @keyframes streakPop{0%{transform:scale(1)}50%{transform:scale(1.3)}100%{transform:scale(1)}}
        .flame{animation:streakPop 0.4s ease;}
        .hov:hover{background:rgba(255,255,255,0.85)!important;}
        .step-card{transition:all 0.2s;} .step-card:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,0,0,0.06)!important;}
        .buf-card{transition:all 0.2s;} .buf-card:hover{box-shadow:0 4px 14px rgba(0,0,0,0.06)!important;}

        /* Mobile-first defaults */
        .grid-2col { grid-template-columns:1fr; }
        .grid-cards { grid-template-columns:1fr 1fr; }
        .grid-7col { grid-template-columns:repeat(7,1fr); }
        .eu-hoje-grid { grid-template-columns:1fr; }
        .garmin-grid { grid-template-columns:repeat(2,1fr); }
        .panel-content { padding:16px; }

        .bottom-nav { position:fixed; bottom:0; left:0; right:0; height:56px; background:#FFFFFF; border-top:1px solid #EDE9E3; display:flex; align-items:center; justify-content:space-around; z-index:100; padding:0 4px; }
        .bottom-nav button { -webkit-tap-highlight-color:transparent; }
        .fixed-header { position:fixed; top:0; left:0; right:0; height:50px; background:#FFFFFF; border-bottom:1px solid #EDE9E3; display:flex; align-items:center; justify-content:space-between; padding:0 16px; z-index:100; }
        .sub-tabs-bar { display:flex; gap:8px; padding:8px 16px; overflow-x:auto; -webkit-overflow-scrolling:touch; background:#F5F3EE; }
        .sub-tabs-bar::-webkit-scrollbar { display:none; }
        .app-content { padding-top:50px; padding-bottom:70px; min-height:100vh; }

        /* Tablet / desktop enhancements */
        @media (min-width:768px) {
          .grid-2col { grid-template-columns:1fr 1fr; }
          .grid-cards { grid-template-columns:repeat(3,1fr); }
          .eu-hoje-grid { grid-template-columns:1fr 1fr; }
          .garmin-grid { grid-template-columns:repeat(4,1fr); }
          .panel-content { padding:20px; }
          .app-content { max-width:980px; margin:0 auto; }
          .bottom-nav { left:50%; transform:translateX(-50%); max-width:980px; border-radius:16px 16px 0 0; box-shadow:0 -2px 12px rgba(0,0,0,0.06); }
        }
      `}</style>

      <div style={{ minHeight:"100vh", background:"#F5F3EE", fontFamily:"'DM Sans',sans-serif" }}>

        {/* ── Fixed Header ── */}
        <div className="fixed-header">
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:18, color:"#1A1A18", fontWeight:600 }}>Vida em Ordem</h1>
            <span style={{ fontSize:11, color:"#B8B0A4" }}>{DAYS_FULL[today]}</span>
            {todayHasRealTraining && <span style={{ fontSize:13 }}>{todayTrains.filter(t=>t.type!=="descanso").map(t=>TRAINING_TYPES[t.type].emoji).join("")}</span>}
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            {urgentCaptures.length > 0 && (
              <span style={{ background:"rgba(196,106,106,0.12)", borderRadius:12, padding:"2px 8px", fontSize:10, color:"#C46A6A", fontWeight:600 }}>
                {urgentCaptures.length}
              </span>
            )}
            <button onClick={()=>setShowCapture(p=>!p)} style={{ display:"flex", alignItems:"center", justifyContent:"center", width:32, height:32, background:showCapture?"#1A1A18":"#C4956A", color:"#FFFFFF", border:"none", borderRadius:12, cursor:"pointer", fontSize:18, fontWeight:500, fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s" }}>
              {showCapture?"✕":"+"}
            </button>
          </div>
        </div>

        {/* ── App Content ── */}
        <div className="app-content" style={{ padding:"0 16px" }}>

          {/* Capture panel (slides under header) */}
          {showCapture && (
            <div style={{ marginTop:8, marginBottom:8, background:"#FFFFFF", borderRadius:16, padding:"14px 16px", boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize:11, color:"#8A8578", fontWeight:600, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.6px" }}>Capture agora</div>
              <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
                <input value={captureInput} onChange={e=>setCaptureInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addCapture()} placeholder="Ideia, tarefa, preocupacao..." style={{ ...inputSt(), flex:1, minWidth:180, fontSize:13 }} autoFocus />
                <div style={{ display:"flex", gap:5 }}>
                  {CAPTURE_URGENCY.map(u => (
                    <button key={u.key} onClick={()=>setCaptureUrgency(u.key)} style={{ padding:"7px 11px", border:"none", borderRadius:8, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:captureUrgency===u.key?700:400, background:captureUrgency===u.key?u.bg:"rgba(44,44,42,0.05)", color:captureUrgency===u.key?u.color:"#6A6258", transition:"all 0.15s" }}>{u.label}</button>
                  ))}
                </div>
                <button onClick={addCapture} style={{ background:"#C4956A", color:"#FFFFFF", border:"none", borderRadius:12, padding:"7px 16px", cursor:"pointer", fontSize:12, fontWeight:600, fontFamily:"'DM Sans',sans-serif" }}>Salvar</button>
              </div>
            </div>
          )}

          {/* Sub Tabs (pill/chip bar) */}
          {SUB_TABS[mainTab]?.length > 0 && (
            <div className="sub-tabs-bar" style={{ marginBottom:8, borderRadius:12, marginTop:8 }}>
              {SUB_TABS[mainTab].map(({id,label}) => <button key={id} style={subTabSt(id)} onClick={()=>setSubTab(id)}>{label}</button>)}
            </div>
          )}

          {/* ── Content Area ── */}
          <div>

          {/* ════════════════════════════════════════════════════════════════════════
               EU HOJE
             ════════════════════════════════════════════════════════════════════════ */}
          {mainTab==="euHoje" && (
            <div className="panel-content" style={{ display:"flex", flexDirection:"column", gap:12 }}>

              {/* Devocional + Afirmacao — full-width hero card */}
              {(() => { const dv = getDevo(); const af = getAffirm(); const todayKey2 = new Date().toISOString().slice(0,10); const todayDevoNote = devoLog[todayKey2] || ""; return (<>
                <div style={{ background:"linear-gradient(135deg,#1A1A18 0%,#2C2C2A 50%,#3E3D38 100%)", borderRadius:16, padding:"22px 20px", marginBottom:0 }}>
                  <div style={{ fontSize:9, fontWeight:600, color:"rgba(245,238,216,0.35)", textTransform:"uppercase", letterSpacing:"1.2px", marginBottom:10 }}>Devocional do dia</div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:17, color:"#F5EED8", fontStyle:"italic", lineHeight:1.7, marginBottom:6 }}>&ldquo;{dv.v}&rdquo;</div>
                  <div style={{ fontSize:11, color:"#C4956A", fontWeight:600, marginBottom:14 }}>{dv.r}</div>
                  <div style={{ borderTop:"1px solid rgba(245,238,216,0.08)", paddingTop:12 }}>
                    <div style={{ fontSize:9, fontWeight:600, color:"rgba(245,238,216,0.35)", textTransform:"uppercase", letterSpacing:"1.2px", marginBottom:6 }}>Afirmacao do dia</div>
                    <div style={{ fontSize:14, color:"#F5EED8", lineHeight:1.5 }}>&ldquo;{af}&rdquo;</div>
                  </div>
                </div>
                <div className="card" style={{ marginBottom:0 }}>
                  <div style={{ fontSize:10, fontWeight:700, color:"#7C9E8E", textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:8 }}>Diario espiritual</div>
                  <textarea value={devoInput || todayDevoNote} onChange={e=>setDevoInput(e.target.value)} placeholder="O que esse versiculo significou pra mim hoje?..." rows={3} style={{ width:"100%", resize:"none", border:"1.5px solid #EDE9E3", borderRadius:12, padding:"10px 12px", fontSize:13, fontFamily:"'DM Sans',sans-serif", background:"#F5F3EE", color:"#1A1A18", lineHeight:1.6 }} />
                  {(devoInput && devoInput !== todayDevoNote) && (
                    <button onClick={async()=>{ const nl={...devoLog,[todayKey2]:devoInput}; setDevoLog(nl); sv("nc_devolog",nl); }} style={{ marginTop:8, background:"#7C9E8E", color:"#fff", border:"none", borderRadius:10, padding:"8px 16px", cursor:"pointer", fontSize:12, fontWeight:600, fontFamily:"'DM Sans',sans-serif" }}>Salvar reflexao</button>
                  )}
                  {todayDevoNote && !devoInput && <div style={{ fontSize:11, color:"#7C9E8E", marginTop:4 }}>Reflexao salva hoje</div>}
                </div>
              </>); })()}

              {/* Smart Alerts */}
              {smartAlerts.length > 0 && (
                <div style={{ marginBottom:16 }}>
                  {smartAlerts.map((a,i) => (
                    <div key={i} style={{ background:`${a.color}14`, border:`1px solid ${a.color}30`, borderRadius:10, padding:"10px 14px", marginBottom:6, display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ fontSize:16 }}>⚠️</span>
                      <span style={{ fontSize:12, color:a.color, fontWeight:600 }}>{a.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Garmin Data Cards */}
              <div style={{ marginBottom:16 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                  <div style={{ fontSize:10, fontWeight:700, color:"#9A9082", textTransform:"uppercase", letterSpacing:"0.7px" }}>⌚ Garmin — Dados de Hoje</div>
                  <button onClick={syncGarmin} disabled={garminLoading} style={{ background:"#2C2C2A", color:"#F5EED8", border:"none", borderRadius:8, padding:"5px 12px", cursor:"pointer", fontSize:11, fontWeight:600, fontFamily:"'DM Sans',sans-serif", opacity:garminLoading?0.5:1 }}>
                    {garminLoading?"⏳ Sincronizando...":"🔄 Sincronizar Garmin"}
                  </button>
                </div>
                <div className="garmin-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
                  {[
                    { label:"Sono", value:gSleepH!==null?`${gSleepH}h${String(gSleepM).padStart(2,"0")}`:"--", sub:gSleepScore?`Score: ${gSleepScore}`:"", emoji:"😴", color:"#7F77DD" },
                    { label:"FC Repouso", value:gRestHR?`${gRestHR} bpm`:"--", sub:"", emoji:"❤️", color:"#C46A6A" },
                    { label:"HRV", value:gHRV?`${gHRV} ms`:"--", sub:"", emoji:"📈", color:"#5DCAA5" },
                    { label:"Body Battery", value:gBB?`${gBB}%`:"--", sub:"", emoji:"🔋", color:gBB&&gBB<30?"#C46A6A":"#5AC48E" },
                    { label:"Passos", value:gSteps?gSteps.toLocaleString("pt-BR"):"--", sub:"", emoji:"🚶", color:"#378ADD" },
                    { label:"Peso", value:garminData?.weight?`${garminData.weight} kg`:(BODY_2026.peso?`${BODY_2026.peso} kg`:"--"), sub:"", emoji:"⚖️", color:"#BA7517" },
                  ].map((card,i) => (
                    <div key={i} style={{ background:"rgba(255,255,255,0.65)", borderRadius:12, padding:"12px 14px", borderLeft:`3px solid ${card.color}` }}>
                      <div style={{ fontSize:10, color:"#9A9082", fontWeight:600, marginBottom:4 }}>{card.emoji} {card.label}</div>
                      <div style={{ fontSize:18, fontWeight:700, color:"#2C2C2A" }}>{card.value}</div>
                      {card.sub && <div style={{ fontSize:10, color:card.color, marginTop:2 }}>{card.sub}</div>}
                    </div>
                  ))}
                </div>
                {/* Sleep phases bar */}
                {(gDeep || gREM) && (
                  <div style={{ marginTop:10, background:"rgba(255,255,255,0.6)", borderRadius:10, padding:"10px 14px" }}>
                    <div style={{ fontSize:10, fontWeight:600, color:"#9A9082", marginBottom:6 }}>Fases do Sono</div>
                    <div style={{ display:"flex", borderRadius:6, overflow:"hidden", height:16 }}>
                      {gDeep>0 && <div style={{ flex:gDeep, background:"#3E3D87", display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ fontSize:8, color:"#fff" }}>{gDeep}m</span></div>}
                      {gREM>0 && <div style={{ flex:gREM, background:"#7F77DD", display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ fontSize:8, color:"#fff" }}>{gREM}m</span></div>}
                      <div style={{ flex:Math.max(0, (gSleepH||0)*60+(gSleepM||0)-((gDeep||0)+(gREM||0))), background:"#B0A5D4", display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ fontSize:8, color:"#fff" }}>Leve</span></div>
                    </div>
                    <div style={{ display:"flex", gap:12, marginTop:6 }}>
                      <span style={{ fontSize:10, color:"#3E3D87" }}>● Profundo</span>
                      <span style={{ fontSize:10, color:"#7F77DD" }}>● REM</span>
                      <span style={{ fontSize:10, color:"#B0A5D4" }}>● Leve</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="eu-hoje-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>

                {/* UMA PRIORIDADE */}
                <div style={{ gridColumn:"1/-1", background:priority.saved&&priority.text ? `linear-gradient(135deg,${PRIORITY_COLORS.find(p=>p.key===priority.area)?.color||"#7C9E8E"}18,${PRIORITY_COLORS.find(p=>p.key===priority.area)?.color||"#7C9E8E"}08)` : "rgba(255,255,255,0.6)", borderRadius:16, padding:"16px 18px", border:`1.5px solid ${priority.saved&&priority.text?(PRIORITY_COLORS.find(p=>p.key===priority.area)?.color||"#7C9E8E")+"40":"rgba(44,44,42,0.1)"}` }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                    <div>
                      <div style={{ fontSize:10, fontWeight:700, color:"#9A9082", textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:3 }}>🎯 UMA Prioridade — {weekLabel}</div>
                      <div style={{ fontSize:11, color:"#B0A592", fontStyle:"italic" }}>"O que, se feito, torna tudo o resto mais fácil?"</div>
                    </div>
                    {priority.saved && priority.text && (
                      <button onClick={()=>savePriority({...priority,saved:false})} style={{ fontSize:10, color:"#9A9082", background:"none", border:"none", cursor:"pointer" }}>✏️ editar</button>
                    )}
                  </div>
                  {priority.saved && priority.text ? (
                    <div>
                      <div style={{ fontSize:18, fontFamily:"'Playfair Display',serif", color:"#2C2C2A", lineHeight:1.4, marginBottom:8 }}>{priority.text}</div>
                      {priority.note && <div style={{ fontSize:12, color:"#6A6258", fontStyle:"italic" }}>{priority.note}</div>}
                      <div style={{ marginTop:8, display:"inline-flex", alignItems:"center", gap:6, background:`${PRIORITY_COLORS.find(p=>p.key===priority.area)?.color||"#7C9E8E"}18`, borderRadius:6, padding:"4px 10px" }}>
                        <div style={{ width:6, height:6, borderRadius:"50%", background:PRIORITY_COLORS.find(p=>p.key===priority.area)?.color||"#7C9E8E" }} />
                        <span style={{ fontSize:11, fontWeight:600, color:PRIORITY_COLORS.find(p=>p.key===priority.area)?.color||"#7C9E8E" }}>{PRIORITY_COLORS.find(p=>p.key===priority.area)?.label}</span>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                      <textarea value={priority.text} onChange={e=>setPriorityState(p=>({...p,text:e.target.value}))} placeholder="Ex: Finalizar projeto Porsche, treinar para o duathlon..." rows={2} style={{ ...inputSt(), width:"100%", resize:"none", fontSize:13, lineHeight:1.5 }} />
                      <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
                        <input value={priority.note} onChange={e=>setPriorityState(p=>({...p,note:e.target.value}))} placeholder="Nota opcional..." style={{ ...inputSt(), flex:1, minWidth:100 }} />
                        <select value={priority.area} onChange={e=>setPriorityState(p=>({...p,area:e.target.value}))} style={inputSt()}>
                          {PRIORITY_COLORS.map(pc=><option key={pc.key} value={pc.key}>{pc.label}</option>)}
                        </select>
                        <button onClick={()=>savePriority({...priority,saved:true})} disabled={!priority.text.trim()} style={{ background:"#2C2C2A", color:"#F5EED8", border:"none", borderRadius:9, padding:"7px 16px", cursor:"pointer", fontSize:12, fontWeight:600, fontFamily:"'DM Sans',sans-serif", opacity:priority.text.trim()?1:0.5 }}>Salvar</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Habits summary (Phase 2) */}
                <div style={{ background:"rgba(255,255,255,0.6)", borderRadius:14, padding:"14px 16px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                    <div style={{ fontSize:10, fontWeight:700, color:"#9A9082", textTransform:"uppercase", letterSpacing:"0.7px" }}>🏅 Hábitos · esta semana</div>
                    <button onClick={()=>{setMainTab("treinos");setSubTab("habitos");}} style={{ fontSize:10, color:"#7C9E8E", background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>ver todos →</button>
                  </div>
                  <div style={{ marginBottom:8 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}><span style={{ fontSize:12, color:"#5A5248", fontWeight:500 }}>Média geral</span><span style={{ fontSize:12, fontWeight:700, color:"#5DCAA5" }}>{totalHabitPct}%</span></div>
                    <div style={{ height:6, background:"rgba(44,44,42,0.08)", borderRadius:3 }}><div style={{ height:"100%", width:`${totalHabitPct}%`, background:"linear-gradient(90deg,#5DCAA5,#3A8C70)", borderRadius:3, transition:"width 0.5s" }}/></div>
                  </div>
                  {habits.slice(0,3).map(h => { const s=streak(h.id); const hpct=habitWeekPct(h.id); return (
                    <div key={h.id} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
                      <span style={{ fontSize:14 }}>{h.emoji}</span>
                      <span style={{ flex:1, fontSize:12, color:"#2C2C2A" }}>{h.name}</span>
                      {s>=2 && <Flame streak={s} />}
                      {s>=2 && <span style={{ fontSize:10, color:"#BA7517", fontWeight:600 }}>{s}d</span>}
                      <div style={{ width:40, height:4, background:"rgba(44,44,42,0.08)", borderRadius:2 }}><div style={{ height:"100%", width:`${hpct}%`, background:h.color, borderRadius:2 }}/></div>
                    </div>
                  ); })}
                  {/* Today's habits */}
                  <div style={{ marginTop:8, paddingTop:8, borderTop:"1px solid rgba(44,44,42,0.06)" }}>
                    <div style={{ fontSize:10, color:"#9A9082", fontWeight:600, marginBottom:6 }}>HOJE</div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                      {habits.filter(h=>h.days.includes(today)).map(h => { const checked=isChecked(h.id,todayStr()); return (
                        <button key={h.id} onClick={()=>togHabit(h.id,todayStr())} style={{ display:"flex", alignItems:"center", gap:5, padding:"4px 10px", border:`1.5px solid ${checked?h.color:"rgba(44,44,42,0.12)"}`, borderRadius:8, background:checked?`${h.color}15`:"rgba(255,255,255,0.7)", cursor:"pointer", fontSize:11, fontFamily:"'DM Sans',sans-serif", color:checked?h.color:"#5A5248", fontWeight:checked?600:400, transition:"all 0.15s" }}>
                          {checked && <span style={{ fontSize:10, fontWeight:700 }}>✓</span>}{h.emoji} {h.name}
                        </button>
                      ); })}
                    </div>
                  </div>
                </div>

                {/* Today training + Buffers */}
                <div style={{ background:"rgba(255,255,255,0.6)", borderRadius:14, padding:"14px 16px" }}>
                  <div style={{ fontSize:10, fontWeight:700, color:"#9A9082", textTransform:"uppercase", letterSpacing:"0.7px", marginBottom:10 }}>📍 Treino de Hoje — {DAYS_FULL[today]}</div>
                  {todayHasRealTraining ? (
                    todayTrains.filter(t=>t.type!=="descanso").map((tr,ti) => {
                      const trTT = TRAINING_TYPES[tr.type];
                      return (
                        <div key={ti} style={{ background:`${trTT.color}12`, borderRadius:10, padding:"10px 12px", marginBottom:8, borderLeft:`3px solid ${trTT.color}` }}>
                          <div style={{ fontSize:14, fontWeight:700, color:trTT.color }}>{trTT.emoji} {trTT.label}</div>
                          <div style={{ fontSize:11, color:"#6A6258", marginTop:2 }}>{tr.duration}min · {tr.intensity}{tr.personal?" · Personal":""}</div>
                          {tr.desc && <div style={{ fontSize:12, color:trTT.color, marginTop:4, fontWeight:600 }}>{tr.desc}</div>}
                          {tr.planilha && <div style={{ fontSize:11, color:"#5A5248", marginTop:4, background:"rgba(44,44,42,0.05)", borderRadius:6, padding:"4px 8px", whiteSpace:"pre-wrap" }}>📋 {tr.planilha}</div>}
                          <div style={{ fontSize:11, color:trTT.color, marginTop:4 }}>🥗 {trTT.nutrition}</div>
                          <div style={{ marginTop:6, display:"inline-block", padding:"2px 8px", borderRadius:5, fontSize:10, fontWeight:700, background:getCarbColor(todayKey)+"20", color:getCarbColor(todayKey) }}>{getCarbType(todayKey)}</div>
                        </div>
                      );
                    })
                  ) : (
                    <div style={{ background:"rgba(44,44,42,0.04)", borderRadius:10, padding:"10px 12px", marginBottom:8 }}>
                      <div style={{ fontSize:13, color:"#6A6258" }}>😴 Dia de descanso — recuperação ativa</div>
                    </div>
                  )}
                  {today===4&&<div style={{ fontSize:11, color:"#7C9E8E", fontWeight:600 }}>🧹 Diarista hoje — casa preparada?</div>}
                  {today===6&&<div style={{ fontSize:11, color:"#C4956A", fontWeight:600 }}>🛒 Dia de compras — lista pronta?</div>}
                  {/* Today's Buffers (Phase 2) */}
                  {todayBufs.length > 0 && (
                    <div style={{ marginTop:8 }}>
                      <div style={{ fontSize:10, color:"#9A9082", fontWeight:600, marginBottom:5 }}>BUFFERS PROTEGIDOS</div>
                      {todayBufs.map(b => { const bt=BUFFER_TYPES.find(x=>x.key===b.type); return (
                        <div key={b.id} style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 9px", background:`${bt.color}10`, borderRadius:8, borderLeft:`3px solid ${bt.color}`, marginBottom:4 }}>
                          <span style={{ fontSize:13 }}>{bt.emoji}</span>
                          <div><div style={{ fontSize:11, fontWeight:700, color:bt.color }}>{b.time} · {b.duration}min {bt.label}</div>
                          {b.note && <div style={{ fontSize:10, color:"#6A6258" }}>{b.note}</div>}</div>
                        </div>
                      ); })}
                    </div>
                  )}
                </div>

                {/* Today diet */}
                <div style={{ background:"rgba(255,255,255,0.6)", borderRadius:14, padding:"14px 16px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                    <div style={{ fontSize:10, fontWeight:700, color:"#9A9082", textTransform:"uppercase", letterSpacing:"0.7px" }}>🥗 Alimentação Hoje</div>
                    <span style={{ fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:5, background:getCarbColor(todayKey)+"20", color:getCarbColor(todayKey) }}>{getCarbType(todayKey)}</span>
                  </div>
                  {MEALS.map(meal => (
                    <div key={meal} style={{ marginBottom:4, fontSize:12 }}>
                      <span style={{ color:"#9A9082", fontSize:10, fontWeight:600 }}>{MEAL_EMOJI[meal]} {meal}: </span>
                      <span style={{ color:meals[todayKey]?.[meal]?"#2C2C2A":"#C9BFA8" }}>{meals[todayKey]?.[meal] || "Não preenchido"}</span>
                    </div>
                  ))}
                </div>

                {/* Today events & reminders */}
                <div style={{ background:"rgba(255,255,255,0.6)", borderRadius:14, padding:"14px 16px" }}>
                  <div style={{ fontSize:10, fontWeight:700, color:"#9A9082", textTransform:"uppercase", letterSpacing:"0.7px", marginBottom:8 }}>📅 Compromissos & Lembretes</div>
                  {(routine[todayKey]||[]).length > 0 ? (
                    (routine[todayKey]||[]).map(evt => {
                      const et = EVENT_TYPES[evt.type];
                      return (
                        <div key={evt.id} style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 8px", background:`${et.color}12`, borderRadius:7, borderLeft:`3px solid ${et.color}`, marginBottom:4 }}>
                          <span style={{ fontSize:11 }}>{et.emoji}</span>
                          <div style={{ fontSize:11, fontWeight:600, color:et.color }}>{evt.time} {evt.title}</div>
                          <span style={{ fontSize:10, color:"#9A9082" }}>{evt.person==="thaynara"?"Thaynara":evt.person==="guilherme"?"Guilherme":"Ambos"}</span>
                        </div>
                      );
                    })
                  ) : (
                    <div style={{ fontSize:12, color:"#C9BFA8" }}>Nenhum compromisso agendado</div>
                  )}
                  <div style={{ marginTop:8 }}>
                    {today===4 && <div style={{ fontSize:11, color:"#7C9E8E", marginBottom:3 }}>🧹 Quinta: preparar casa para diarista</div>}
                    {today===6 && <div style={{ fontSize:11, color:"#C4956A", marginBottom:3 }}>🛒 Sábado: dia de compras</div>}
                    {stockAlerts.length > 0 && <div style={{ fontSize:11, color:"#C46A6A", marginBottom:3 }}>📦 Estoque: {stockAlerts.map(i => `${i.name} (${i.status})`).join(", ")}</div>}
                  </div>
                </div>

                {/* Mini wheel */}
                <div style={{ background:"rgba(255,255,255,0.6)", borderRadius:14, padding:"14px 16px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                    <div style={{ fontSize:10, fontWeight:700, color:"#9A9082", textTransform:"uppercase", letterSpacing:"0.7px" }}>🎯 Roda da Vida</div>
                    <button onClick={()=>{setMainTab("treinos");setSubTab("roda");}} style={{ fontSize:10, color:"#7C9E8E", background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>ver completa →</button>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <RadarChart scores={wheelScores} size={120} compact={true} />
                    <div>
                      <div style={{ fontSize:20, fontWeight:700, color:"#2C2C2A" }}>{avgScore}<span style={{ fontSize:11, color:"#9A9082", fontWeight:400 }}>/10</span></div>
                      <div style={{ fontSize:11, color:"#9A9082", marginBottom:6 }}>média geral</div>
                      {lowAreas.length > 0 && (
                        <div style={{ fontSize:11, color:"#C46A6A" }}>⚠ {lowAreas.map(a=>a.shortLabel).join(", ")} abaixo de 6</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* GTD inbox preview */}
                <div style={{ background:"rgba(255,255,255,0.6)", borderRadius:14, padding:"14px 16px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                    <div style={{ fontSize:10, fontWeight:700, color:"#9A9082", textTransform:"uppercase", letterSpacing:"0.7px" }}>📥 GTD Inbox</div>
                    <span style={{ fontSize:11, fontWeight:600, color:"#9A9082" }}>{pendingCaptures.length} pendente{pendingCaptures.length!==1?"s":""}</span>
                  </div>
                  {captures.slice(0,3).map(cap => {
                    const urg = CAPTURE_URGENCY.find(u=>u.key===cap.urgency)||CAPTURE_URGENCY[1];
                    return (
                      <div key={cap.id} style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 8px", marginBottom:3, borderRadius:7, background:cap.done?"rgba(124,158,142,0.07)":"rgba(255,255,255,0.5)" }}>
                        <div onClick={()=>toggleCapture(cap.id)} style={{ width:14, height:14, borderRadius:4, border:`2px solid ${cap.done?"#7C9E8E":"#D0C8BC"}`, background:cap.done?"#7C9E8E":"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, cursor:"pointer" }}>
                          {cap.done&&<span style={{ color:"#fff", fontSize:9, fontWeight:700 }}>✓</span>}
                        </div>
                        <span style={{ flex:1, fontSize:11, color:cap.done?"#9A9082":"#2C2C2A", textDecoration:cap.done?"line-through":"none" }}>{cap.text}</span>
                        <span style={{ fontSize:9, color:urg.color, fontWeight:600, padding:"1px 5px", background:urg.bg, borderRadius:4 }}>{urg.label}</span>
                      </div>
                    );
                  })}
                  {captures.length > 3 && <div style={{ textAlign:"center", fontSize:10, color:"#9A9082", marginTop:4 }}>+ {captures.length-3} mais</div>}
                </div>
              </div>

              {/* Last Review summary (Phase 2) */}
              {lastReview && (
                <div style={{ background:"rgba(93,202,165,0.06)", borderRadius:14, padding:"12px 15px", border:"1px solid rgba(93,202,165,0.2)" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                    <div style={{ fontSize:10, fontWeight:700, color:"#5A7D6E", textTransform:"uppercase", letterSpacing:"0.7px" }}>🔄 Última Revisão Semanal</div>
                    <span style={{ fontSize:10, color:"#9A9082" }}>{new Date(lastReview.date).toLocaleDateString("pt-BR")}</span>
                  </div>
                  <p style={{ fontSize:12, color:"#3C5A4E", lineHeight:1.6 }}>{lastReview.summary?.slice(0,200)}...</p>
                  <button onClick={()=>{setMainTab("revisao");}} style={{ marginTop:7, fontSize:11, color:"#5DCAA5", background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>Fazer nova revisão →</button>
                </div>
              )}
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════════
               CALENDARIO
             ════════════════════════════════════════════════════════════════════════ */}
          {mainTab==="calendario" && (
            <div className="panel-content" style={{ padding:0 }}>
              {/* Navigation */}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                <button onClick={()=>{ if(calMonth===0){setCalMonth(11);setCalYear(y=>y-1);}else setCalMonth(m=>m-1); setCalSelectedDay(null); }} style={{ background:"rgba(44,44,42,0.06)", border:"none", borderRadius:8, padding:"6px 12px", cursor:"pointer", fontSize:14, fontFamily:"'DM Sans',sans-serif" }}>←</button>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:600, color:"#2C2C2A" }}>
                    {new Date(calYear, calMonth).toLocaleString("pt-BR",{month:"long"})} {calYear}
                  </div>
                </div>
                <div style={{ display:"flex", gap:6 }}>
                  <button onClick={()=>{ const n=new Date(); setCalMonth(n.getMonth()); setCalYear(n.getFullYear()); setCalSelectedDay(n.getDate()); }} style={{ background:"#2C2C2A", color:"#F5EED8", border:"none", borderRadius:8, padding:"6px 12px", cursor:"pointer", fontSize:11, fontWeight:600, fontFamily:"'DM Sans',sans-serif" }}>Hoje</button>
                  <button onClick={()=>{ if(calMonth===11){setCalMonth(0);setCalYear(y=>y+1);}else setCalMonth(m=>m+1); setCalSelectedDay(null); }} style={{ background:"rgba(44,44,42,0.06)", border:"none", borderRadius:8, padding:"6px 12px", cursor:"pointer", fontSize:14, fontFamily:"'DM Sans',sans-serif" }}>→</button>
                </div>
              </div>

              {/* Calendar grid */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:2, marginBottom:16 }}>
                {DAYS_SHORT.map(d => <div key={d} style={{ textAlign:"center", fontSize:10, fontWeight:700, color:"#9A9082", padding:"4px 0" }}>{d}</div>)}
                {getCalDays().map((day, i) => {
                  if (day === null) return <div key={`e${i}`} />;
                  const d = new Date(calYear, calMonth, day);
                  const dKey = DAY_KEY_MAP[d.getDay()];
                  const tarr = trainings[dKey]||[];
                  const evts = routine[dKey] || [];
                  const isToday = d.getDate()===new Date().getDate() && d.getMonth()===new Date().getMonth() && d.getFullYear()===new Date().getFullYear();
                  const isSelected = calSelectedDay === day;

                  return (
                    <div key={i} className={`cal-cell ${isToday?"cal-cell-today":""}`} onClick={()=>setCalSelectedDay(day===calSelectedDay?null:day)}
                      style={{ background:isSelected?"rgba(124,158,142,0.15)":"rgba(255,255,255,0.5)", borderRadius:8, padding:"6px 4px", minHeight:60, cursor:"pointer", border:isToday?"2px solid #2C2C2A":"1.5px solid transparent", transition:"all 0.15s" }}>
                      <div style={{ fontSize:12, fontWeight:isToday?700:400, color:isToday?"#2C2C2A":"#6A6258", textAlign:"center" }}>{day}</div>
                      <div style={{ textAlign:"center", marginTop:2 }}>
                        {tarr.filter(t=>t.type!=="descanso").map((t,ti)=><span key={ti} style={{ fontSize:10 }}>{TRAINING_TYPES[t.type]?.emoji}</span>)}
                        {d.getDay()===4 && <span style={{ fontSize:8 }}>🧹</span>}
                        {d.getDay()===6 && <span style={{ fontSize:8 }}>🛒</span>}
                      </div>
                      {evts.length > 0 && <div style={{ textAlign:"center" }}><div style={{ width:4, height:4, borderRadius:"50%", background:"#5A7DC4", display:"inline-block" }} /></div>}
                      {meals[dKey] && Object.values(meals[dKey]).some(v=>v) && <div style={{ textAlign:"center" }}><span style={{ fontSize:7, color:"#639922" }}>🥗</span></div>}
                    </div>
                  );
                })}
              </div>

              {/* Selected day detail */}
              {calSelectedDay && (() => {
                const d = new Date(calYear, calMonth, calSelectedDay);
                const dKey = DAY_KEY_MAP[d.getDay()];
                const tarr = trainings[dKey]||[];
                const evts = routine[dKey] || [];
                const dayMeals = meals[dKey] || {};
                const dayStockAlerts = stock.filter(i => i.status === "acabou" || i.status === "baixo");

                return (
                  <div style={{ background:"rgba(255,255,255,0.7)", borderRadius:14, padding:"16px 18px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                      <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:"#2C2C2A" }}>
                        {d.toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"})}
                      </h3>
                      <span style={{ fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:5, background:getCarbColor(dKey)+"20", color:getCarbColor(dKey) }}>{getCarbType(dKey)}</span>
                    </div>
                    {tarr.filter(t=>t.type!=="descanso").map((t,ti) => {
                      const tt = TRAINING_TYPES[t.type];
                      return (
                        <div key={ti} style={{ background:`${tt.color}12`, borderRadius:10, padding:"10px 12px", marginBottom:10, borderLeft:`3px solid ${tt.color}` }}>
                          <div style={{ fontSize:13, fontWeight:700, color:tt.color }}>{tt.emoji} {tt.label} — {t.duration}min · {t.intensity}</div>
                          {t.desc && <div style={{ fontSize:11, color:tt.color, marginTop:2 }}>{t.desc}</div>}
                          {t.planilha && <div style={{ fontSize:10, color:"#5A5248", marginTop:2 }}>📋 {t.planilha}</div>}
                        </div>
                      );
                    })}
                    {evts.length > 0 && (
                      <div style={{ marginBottom:10 }}>
                        <div style={{ fontSize:10, fontWeight:700, color:"#9A9082", marginBottom:4 }}>COMPROMISSOS</div>
                        {evts.map(evt => {
                          const et = EVENT_TYPES[evt.type];
                          return (
                            <div key={evt.id} style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 8px", background:`${et.color}12`, borderRadius:7, borderLeft:`3px solid ${et.color}`, marginBottom:3 }}>
                              <span style={{ fontSize:11 }}>{et.emoji}</span>
                              <span style={{ fontSize:11, fontWeight:600, color:et.color }}>{evt.time} {evt.title}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <div style={{ marginBottom:10 }}>
                      <div style={{ fontSize:10, fontWeight:700, color:"#9A9082", marginBottom:4 }}>REFEIÇÕES</div>
                      {MEALS.map(meal => (
                        <div key={meal} style={{ fontSize:11, marginBottom:2 }}>
                          <span style={{ color:"#9A9082" }}>{MEAL_EMOJI[meal]} {meal}: </span>
                          <span style={{ color:dayMeals[meal]?"#2C2C2A":"#C9BFA8" }}>{dayMeals[meal] || "Não preenchido"}</span>
                        </div>
                      ))}
                    </div>
                    {dayStockAlerts.length > 0 && (
                      <div style={{ fontSize:10, color:"#C46A6A" }}>📦 Alerta estoque: {dayStockAlerts.map(i=>i.name).join(", ")}</div>
                    )}
                    <div style={{ display:"flex", gap:6, marginTop:10 }}>
                      <button onClick={()=>{setMainTab("casa");setSubTab("rotina");}} style={{ fontSize:10, background:"rgba(90,125,196,0.12)", color:"#5A7DC4", border:"none", borderRadius:6, padding:"5px 10px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>+ Evento</button>
                      <button onClick={()=>{setMainTab("treinos");setSubTab("cardapio");}} style={{ fontSize:10, background:"rgba(99,153,34,0.12)", color:"#639922", border:"none", borderRadius:6, padding:"5px 10px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>Editar Cardápio</button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ════ CASA > ROTINA ════ */}
          {mainTab==="casa" && activeSubTab==="rotina" && (
            <div className="panel-content" style={{ padding:0 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12, flexWrap:"wrap", gap:10 }}>
                <div>
                  <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:"#2C2C2A", marginBottom:2 }}>Rotina do Casal</h2>
                  <p style={{ fontSize:11, color:"#9A9082" }}>Treinos aparecem automático — adicione compromissos dos dois</p>
                </div>
                <div style={{ display:"flex", gap:5, flexWrap:"wrap", alignItems:"center" }}>
                  <select value={newEvent.day} onChange={e=>setNewEvent(p=>({...p,day:e.target.value}))} style={inputSt()}>
                    {WEEK_DAYS.map(d=><option key={d.key} value={d.key}>{d.label}</option>)}
                  </select>
                  <input type="time" value={newEvent.time} onChange={e=>setNewEvent(p=>({...p,time:e.target.value}))} style={inputSt({width:82})} />
                  <input value={newEvent.title} onChange={e=>setNewEvent(p=>({...p,title:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addEvent()} placeholder="Reunião, médico..." style={inputSt({width:155})} />
                  <select value={newEvent.type} onChange={e=>setNewEvent(p=>({...p,type:e.target.value}))} style={inputSt()}>
                    {Object.entries(EVENT_TYPES).map(([k,v])=><option key={k} value={k}>{v.emoji} {v.label}</option>)}
                  </select>
                  <select value={newEvent.person} onChange={e=>setNewEvent(p=>({...p,person:e.target.value}))} style={inputSt()}>
                    <option value="thaynara">Thaynara</option><option value="guilherme">Guilherme</option><option value="ambos">Ambos</option>
                  </select>
                  <button onClick={addEvent} style={{ background:"#2C2C2A",color:"#F5EED8",border:"none",borderRadius:8,padding:"7px 14px",cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"'DM Sans',sans-serif" }}>+ Add</button>
                </div>
              </div>
              <div className="grid-cards" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(185px,1fr))", gap:9 }}>
                {WEEK_DAYS.map(({key,label}) => {
                  const tarr = trainings[key]||[]; const evts = routine[key]||[];
                  return (
                    <div key={key} className="card" style={{ background:"rgba(255,255,255,0.65)",borderRadius:12,overflow:"hidden",boxShadow:"0 2px 8px rgba(44,44,42,0.05)",transition:"box-shadow 0.2s" }}>
                      <div style={{ padding:"8px 11px",background:key==="quinta"?"rgba(124,158,142,0.12)":key==="sabado"?"rgba(196,149,106,0.12)":"rgba(44,44,42,0.03)",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                        <span style={{ fontWeight:600,fontSize:12,color:"#2C2C2A" }}>{label}</span>
                        <div style={{ display:"flex",gap:4 }}>
                          {key==="quinta"&&<span style={{ fontSize:8,color:"#7C9E8E",fontWeight:700 }}>🧹 DIARISTA</span>}
                          {key==="sabado"&&<span style={{ fontSize:8,color:"#C4956A",fontWeight:700 }}>🛒 COMPRAS</span>}
                        </div>
                      </div>
                      <div style={{ padding:"8px 10px",display:"flex",flexDirection:"column",gap:4,minHeight:50 }}>
                        {tarr.filter(t=>t.type!=="descanso").map((t,ti)=>{
                          const tt=TRAINING_TYPES[t.type];
                          return (
                          <div key={ti} style={{ display:"flex",alignItems:"center",gap:6,padding:"5px 8px",background:`${tt.color}14`,borderRadius:7,borderLeft:`3px solid ${tt.color}` }}>
                            <span style={{ fontSize:12 }}>{tt.emoji}</span>
                            <div><div style={{ fontSize:11,fontWeight:700,color:tt.color }}>{tt.label}</div><div style={{ fontSize:10,color:"#9A9082" }}>{t.duration}min · {t.intensity}</div></div>
                          </div>
                          );
                        })}
                        {evts.map(evt => {
                          const et = EVENT_TYPES[evt.type];
                          return (
                            <div key={evt.id} style={{ display:"flex",alignItems:"center",gap:6,padding:"5px 8px",background:`${et.color}12`,borderRadius:7,borderLeft:`3px solid ${et.color}` }}>
                              <span style={{ fontSize:11 }}>{et.emoji}</span>
                              <div style={{ flex:1,minWidth:0 }}>
                                <div style={{ fontSize:11,fontWeight:600,color:et.color,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{evt.time} {evt.title}</div>
                                <div style={{ fontSize:10,color:"#9A9082" }}>{evt.person==="thaynara"?"Thaynara":evt.person==="guilherme"?"Guilherme":"Ambos"}</div>
                              </div>
                              <button onClick={()=>removeEvent(key,evt.id)} style={{ background:"none",border:"none",cursor:"pointer",color:"#C4A882",fontSize:14 }}>×</button>
                            </div>
                          );
                        })}
                        {tarr.every(t=>t.type==="descanso")&&evts.length===0&&<div style={{ fontSize:11,color:"#C9BFA8",textAlign:"center",padding:"6px 0" }}>😴 Descanso</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ════ CASA > ESTOQUE ════ */}
          {mainTab==="casa" && activeSubTab==="estoque" && (
            <div className="panel-content" style={{ padding:0 }}>
              <div style={{ marginBottom:12 }}>
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:"#2C2C2A", marginBottom:2 }}>Estoque da Casa</h2>
                <p style={{ fontSize:11, color:"#9A9082" }}>Marque o status — a lista de compras desconta o que já tem</p>
              </div>
              <div style={{ display:"flex", gap:7, marginBottom:14 }}>
                {[["ok","✓ Ok"],["baixo","⚠ Baixo"],["acabou","✗ Acabou"]].map(([s,l])=>{
                  const cnt = stock.filter(i=>i.status===s).length;
                  return (
                    <div key={s} style={{ flex:1,background:`${STATUS_COLOR[s]}14`,borderRadius:10,padding:"9px 12px",textAlign:"center",border:`1px solid ${STATUS_COLOR[s]}28` }}>
                      <div style={{ fontSize:20,fontWeight:700,color:STATUS_COLOR[s] }}>{cnt}</div>
                      <div style={{ fontSize:11,color:"#6A6258" }}>{l}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ display:"flex", gap:5, marginBottom:14, flexWrap:"wrap" }}>
                <input value={newStockItem.name} onChange={e=>setNewStockItem(p=>({...p,name:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addStock()} placeholder="Ex: whey, banana..." style={inputSt({flex:1,minWidth:130})} />
                <input type="number" value={newStockItem.qty} onChange={e=>setNewStockItem(p=>({...p,qty:Number(e.target.value)}))} style={inputSt({width:54,textAlign:"center"})} />
                <select value={newStockItem.unit} onChange={e=>setNewStockItem(p=>({...p,unit:e.target.value}))} style={inputSt()}>
                  {["un","kg","g","L","ml","cx","pct"].map(u=><option key={u}>{u}</option>)}
                </select>
                <select value={newStockItem.category} onChange={e=>setNewStockItem(p=>({...p,category:e.target.value}))} style={inputSt()}>
                  {["geladeira","despensa","congelador","higiene","limpeza"].map(c=><option key={c}>{c}</option>)}
                </select>
                <button onClick={addStock} style={{ background:"#7C9E8E",color:"#fff",border:"none",borderRadius:9,padding:"7px 14px",cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"'DM Sans',sans-serif" }}>+ Add</button>
              </div>
              {["geladeira","congelador","despensa","higiene","limpeza"].map(cat=>{
                const items = stock.filter(i=>i.category===cat);
                if (!items.length) return null;
                const catEmoji = {geladeira:"🧊",congelador:"❄️",despensa:"🫙",higiene:"🧴",limpeza:"🧹"}[cat];
                return (
                  <div key={cat} style={{ marginBottom:14 }}>
                    <div style={{ fontSize:10,fontWeight:700,color:"#6A6258",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:6 }}>{catEmoji} {cat}</div>
                    {items.map(item=>(
                      <div key={item.id} style={{ display:"flex",alignItems:"center",gap:9,padding:"8px 11px",borderRadius:10,marginBottom:4,background:item.status==="acabou"?"rgba(196,106,106,0.07)":item.status==="baixo"?"rgba(196,149,106,0.07)":"rgba(255,255,255,0.55)",border:`1px solid ${STATUS_COLOR[item.status]}22` }}>
                        <div style={{ width:8,height:8,borderRadius:"50%",background:STATUS_COLOR[item.status],flexShrink:0 }} />
                        <span style={{ flex:1,fontSize:13,color:"#2C2C2A" }}>{item.name}</span>
                        <span style={{ fontSize:11,color:"#9A9082" }}>{item.qty}{item.unit}</span>
                        <div style={{ display:"flex",gap:3 }}>
                          {["ok","baixo","acabou"].map(s=>(
                            <button key={s} onClick={()=>updStockStatus(item.id,s)} style={{ padding:"3px 7px",border:"none",borderRadius:5,fontSize:10,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:item.status===s?700:400,background:item.status===s?STATUS_COLOR[s]:"rgba(44,44,42,0.07)",color:item.status===s?"#fff":"#6A6258" }}>
                              {s==="ok"?"✓":s==="baixo"?"⚠":"✗"}
                            </button>
                          ))}
                        </div>
                        <button onClick={()=>removeStock(item.id)} style={{ background:"none",border:"none",cursor:"pointer",color:"#C4A882",fontSize:16 }}>×</button>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}

          {/* ════ CASA > COMPRAS ════ */}
          {mainTab==="casa" && activeSubTab==="compras" && (
            <div className="panel-content" style={{ padding:0 }}>
              {!generatedList && !generatingList && (
                <div style={{ textAlign:"center",padding:"60px 20px",color:"#9A9082" }}>
                  <div style={{ fontSize:48,marginBottom:12 }}>🛒</div>
                  <div style={{ fontSize:15,fontWeight:600,color:"#5A5248",marginBottom:6 }}>Lista ainda não gerada</div>
                  <p style={{ fontSize:12,marginBottom:20 }}>Preencha o cardápio → clique <strong>"Gerar Lista"</strong>.<br/>O estoque, treinos e semana das carnes são considerados.</p>
                  <button onClick={()=>{setMainTab("treinos");setSubTab("cardapio");}} style={{ background:"#7C9E8E",color:"#fff",border:"none",borderRadius:10,padding:"10px 22px",cursor:"pointer",fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:600 }}>Ir para o Cardápio →</button>
                </div>
              )}
              {generatingList && (
                <div style={{ textAlign:"center",padding:"70px 20px" }}>
                  <div style={{ fontSize:44,marginBottom:14 }}>🛍️</div>
                  <div style={{ fontSize:13,color:"#7C9E8E",fontWeight:600,marginBottom:10 }}>Analisando cardápio, treinos e estoque...</div>
                  <div style={{ display:"flex",justifyContent:"center",gap:6 }}>
                    {["d1","d2","d3"].map(c=><div key={c} className={c} style={{ width:9,height:9,background:"#7C9E8E",borderRadius:"50%" }} />)}
                  </div>
                </div>
              )}
              {generatedList && !generatingList && (<>
                <div style={{ background:meatWeek===1?"linear-gradient(135deg,#C4956A,#A97848)":"rgba(44,44,42,0.05)", borderRadius:12,padding:"12px 15px",marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                  <div>
                    <div style={{ fontWeight:600,fontSize:13,color:meatWeek===1?"#fff":"#5A5248",marginBottom:2 }}>🥩 {meatWeek===1?"Semana 1 — comprar carnes para 2 semanas!":"Semana 2 — usar carnes do freezer"}</div>
                    {listObs&&<div style={{ fontSize:11,color:meatWeek===1?"rgba(255,255,255,0.85)":"#8A8275" }}>{listObs}</div>}
                  </div>
                  <button onClick={generateList} style={{ background:meatWeek===1?"rgba(255,255,255,0.25)":"rgba(44,44,42,0.08)",border:"none",borderRadius:7,padding:"5px 11px",cursor:"pointer",fontSize:11,fontWeight:600,fontFamily:"'DM Sans',sans-serif",color:meatWeek===1?"#fff":"#5A5248" }}>↻ Regerar</button>
                </div>
                {listAlertas.length>0&&(
                  <div style={{ background:"rgba(196,106,106,0.08)",border:"1px solid rgba(196,106,106,0.18)",borderRadius:10,padding:"9px 13px",marginBottom:12 }}>
                    <div style={{ fontSize:11,fontWeight:700,color:"#C46A6A",marginBottom:5 }}>⚠ URGENTE:</div>
                    {listAlertas.map((a,i)=><div key={i} style={{ fontSize:12,color:"#5A2A2A",marginBottom:2 }}>• {a}</div>)}
                  </div>
                )}
                <div style={{ marginBottom:14 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:5 }}>
                    <span style={{ fontSize:12,color:"#5A5248",fontWeight:500 }}>{doneItems} de {totalItems} itens</span>
                    <span style={{ fontSize:12,color:"#7C9E8E",fontWeight:700 }}>{pct}%</span>
                  </div>
                  <div style={{ height:5,background:"rgba(44,44,42,0.08)",borderRadius:3 }}>
                    <div style={{ height:"100%",width:`${pct}%`,background:"linear-gradient(90deg,#7C9E8E,#5A8070)",borderRadius:3,transition:"width 0.3s" }} />
                  </div>
                </div>
                {generatedList.map((cat,ci)=>(
                  <div key={ci} style={{ marginBottom:15 }}>
                    <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:7 }}>
                      <span style={{ fontSize:15 }}>{cat.emoji}</span>
                      <span style={{ fontSize:10,fontWeight:700,color:"#6A6258",textTransform:"uppercase",letterSpacing:"0.8px" }}>{cat.nome}</span>
                      <div style={{ flex:1,height:1,background:"rgba(44,44,42,0.08)" }} />
                      <span style={{ fontSize:10,color:"#B0A592" }}>{cat.itens.filter((_,j)=>checkedItems[`${ci}-${j}`]).length}/{cat.itens.length}</span>
                    </div>
                    {cat.itens.map((item,ii)=>{
                      const k=`${ci}-${ii}`; const checked=!!checkedItems[k];
                      return (
                        <div key={ii} className="shop-row" onClick={()=>toggleCheck(ci,ii)} style={{ display:"flex",alignItems:"center",gap:10,padding:"8px 12px",borderRadius:10,marginBottom:4,cursor:"pointer",background:checked?"rgba(124,158,142,0.07)":"rgba(255,255,255,0.55)",transition:"all 0.15s" }}>
                          <div style={{ width:18,height:18,borderRadius:5,border:`2px solid ${checked?"#7C9E8E":"#D0C8BC"}`,background:checked?"#7C9E8E":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.15s" }}>
                            {checked&&<span style={{ color:"#fff",fontSize:11,fontWeight:700 }}>✓</span>}
                          </div>
                          <span style={{ fontSize:13,color:checked?"#9A9082":"#2C2C2A",textDecoration:checked?"line-through":"none" }}>{item}</span>
                        </div>
                      );
                    })}
                  </div>
                ))}
                {manualItems.length>0&&(
                  <div style={{ marginBottom:14 }}>
                    <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:7 }}>
                      <span>➕</span><span style={{ fontSize:10,fontWeight:700,color:"#6A6258",textTransform:"uppercase",letterSpacing:"0.8px" }}>Extras</span>
                      <div style={{ flex:1,height:1,background:"rgba(44,44,42,0.08)" }} />
                    </div>
                    {manualItems.map(item=>(
                      <div key={item.id} style={{ display:"flex",alignItems:"center",gap:10,padding:"8px 12px",borderRadius:10,marginBottom:4,background:item.done?"rgba(124,158,142,0.07)":"rgba(255,255,255,0.55)" }}>
                        <div onClick={()=>setManualItems(p=>p.map(i=>i.id===item.id?{...i,done:!i.done}:i))} style={{ width:18,height:18,borderRadius:5,border:`2px solid ${item.done?"#7C9E8E":"#D0C8BC"}`,background:item.done?"#7C9E8E":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer" }}>
                          {item.done&&<span style={{ color:"#fff",fontSize:11,fontWeight:700 }}>✓</span>}
                        </div>
                        <span style={{ flex:1,fontSize:13,color:item.done?"#9A9082":"#2C2C2A",textDecoration:item.done?"line-through":"none" }}>{item.text} <span style={{ fontSize:10,color:"#B0A592" }}>· {item.category}</span></span>
                        <button onClick={()=>setManualItems(p=>p.filter(i=>i.id!==item.id))} style={{ background:"none",border:"none",cursor:"pointer",color:"#C4A882",fontSize:16 }}>×</button>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ borderTop:"1px solid rgba(44,44,42,0.07)",paddingTop:14,display:"flex",gap:5,flexWrap:"wrap" }}>
                  <input value={newManual} onChange={e=>setNewManual(e.target.value)} onKeyDown={e=>e.key==="Enter"&&(()=>{if(!newManual.trim())return;setManualItems(p=>[...p,{id:Date.now(),text:newManual,category:newManualCat,done:false}]);setNewManual("");})()}
                    placeholder="Adicionar item extra..." style={{ ...inputSt(), flex:1,minWidth:140 }} />
                  <select value={newManualCat} onChange={e=>setNewManualCat(e.target.value)} style={inputSt()}>
                    {["Hortifruti","Laticínios","Carnes e Proteínas","Padaria","Mercearia","Suplementos","Higiene","Limpeza"].map(c=><option key={c}>{c}</option>)}
                  </select>
                  <button onClick={()=>{if(!newManual.trim())return;setManualItems(p=>[...p,{id:Date.now(),text:newManual,category:newManualCat,done:false}]);setNewManual("");}} style={{ background:"#7C9E8E",color:"#fff",border:"none",borderRadius:9,padding:"7px 14px",cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"'DM Sans',sans-serif" }}>+ Add</button>
                </div>
              </>)}
            </div>
          )}

          {/* ════ CASA > CHECKLIST ════ */}
          {mainTab==="casa" && activeSubTab==="checklist" && (
            <div className="panel-content grid-2col" style={{ padding:18, display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, minHeight:400 }}>
              {[
                { key:"quinta",icon:"🧹",title:"Quinta-feira",subtitle:"Preparar para a diarista",color:"#7C9E8E",items:CHECKLIST_DATA.quinta },
                { key:"sabado",icon:"🛒",title:"Sábado",subtitle:"Preparar para as compras",color:"#C4956A",items:CHECKLIST_DATA.sabado },
              ].map(({key,icon,title,subtitle,color,items})=>(
                <div key={key} style={{ background:"rgba(255,255,255,0.62)",borderRadius:16,overflow:"hidden" }}>
                  <div style={{ background:color,padding:"14px 18px" }}>
                    <div style={{ fontSize:22,marginBottom:3 }}>{icon}</div>
                    <div style={{ color:"#fff",fontWeight:600,fontSize:15 }}>{title}</div>
                    <div style={{ color:"rgba(255,255,255,0.8)",fontSize:12,marginBottom:8 }}>{subtitle}</div>
                    <div style={{ color:"rgba(255,255,255,0.9)",fontSize:12 }}>{checklist[key].filter(Boolean).length}/{items.length} concluídos</div>
                    <div style={{ marginTop:6,height:3,background:"rgba(255,255,255,0.3)",borderRadius:2 }}>
                      <div style={{ height:"100%",width:`${(checklist[key].filter(Boolean).length/items.length)*100}%`,background:"#fff",borderRadius:2,transition:"width 0.3s" }} />
                    </div>
                  </div>
                  <div style={{ padding:14 }}>
                    {items.map((item,idx)=>(
                      <div key={idx} className="chk-row" onClick={()=>setChecklist(p=>{const c={...p,[key]:[...p[key]]};c[key][idx]=!c[key][idx];return c;})}
                        style={{ display:"flex",alignItems:"center",gap:10,padding:"8px 10px",borderRadius:8,cursor:"pointer",transition:"background 0.15s",marginBottom:2 }}>
                        <div style={{ width:18,height:18,borderRadius:5,border:`2px solid ${checklist[key][idx]?color:"#D0C8BC"}`,background:checklist[key][idx]?color:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.2s" }}>
                          {checklist[key][idx]&&<span style={{ color:"#fff",fontSize:11,fontWeight:700 }}>✓</span>}
                        </div>
                        <span style={{ fontSize:13,color:checklist[key][idx]?"#9A9082":"#3C3830",textDecoration:checklist[key][idx]?"line-through":"none" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ════ CASA > CHAT ════ */}
          {mainTab==="casa" && activeSubTab==="chat" && (
            <div style={{ display:"flex",flexDirection:"column",height:520 }}>
              <div style={{ flex:1,overflowY:"auto",padding:"18px 20px",display:"flex",flexDirection:"column",gap:12 }}>
                {messages.map((msg,i)=>(
                  <div key={i} className="bubble" style={{ display:"flex",justifyContent:msg.role==="user"?"flex-end":"flex-start" }}>
                    {msg.role==="assistant"&&<div style={{ width:28,height:28,background:"#7C9E8E",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,marginRight:8,flexShrink:0,marginTop:2 }}>🏡</div>}
                    <div style={{ maxWidth:"72%",background:msg.role==="user"?"#2C2C2A":"rgba(255,255,255,0.85)",color:msg.role==="user"?"#F5EED8":"#2C2C2A",borderRadius:msg.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",padding:"11px 15px",fontSize:14,lineHeight:1.6,boxShadow:"0 2px 8px rgba(44,44,42,0.06)",whiteSpace:"pre-wrap" }}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {chatLoading&&(
                  <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                    <div style={{ width:28,height:28,background:"#7C9E8E",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13 }}>🏡</div>
                    <div style={{ background:"rgba(255,255,255,0.85)",borderRadius:"18px 18px 18px 4px",padding:"11px 15px",display:"flex",gap:5,alignItems:"center" }}>
                      {["d1","d2","d3"].map(c=><div key={c} className={c} style={{ width:7,height:7,background:"#9A9082",borderRadius:"50%" }} />)}
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              <div style={{ padding:"0 20px 10px",display:"flex",gap:5,flexWrap:"wrap" }}>
                {["O que comer hoje pós-treino?","Minha semana está equilibrada?","Processar meu inbox","Preparar casa para quinta","Planejamento desta semana"].map(q=>(
                  <button key={q} onClick={()=>setChatInput(q)} style={{ fontSize:11,padding:"5px 10px",background:"rgba(124,158,142,0.12)",border:"1px solid rgba(124,158,142,0.25)",borderRadius:20,cursor:"pointer",color:"#5A7D6E",fontFamily:"'DM Sans',sans-serif" }}>{q}</button>
                ))}
              </div>
              <div style={{ padding:"10px 20px 20px",display:"flex",gap:8,borderTop:"1px solid rgba(44,44,42,0.06)" }}>
                <textarea value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>{ if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendChat();}}} placeholder="Treinos, roda da vida, capturas, casa... pergunte tudo" rows={1}
                  style={{ flex:1,resize:"none",border:"1.5px solid rgba(44,44,42,0.12)",borderRadius:12,padding:"10px 14px",fontSize:14,fontFamily:"'DM Sans',sans-serif",background:"rgba(255,255,255,0.8)",color:"#2C2C2A",lineHeight:1.5 }} />
                <button onClick={sendChat} disabled={chatLoading} style={{ background:"#2C2C2A",color:"#F5EED8",border:"none",borderRadius:12,width:44,cursor:"pointer",fontSize:18,flexShrink:0 }}>→</button>
              </div>
            </div>
          )}

          {/* ════ TREINOS > PLANO ════ */}
          {mainTab==="treinos" && activeSubTab==="plano" && (
            <div className="panel-content" style={{ padding:0 }}>
              <div style={{ marginBottom:12 }}>
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:"#2C2C2A", marginBottom:2 }}>Plano de Treinos</h2>
                <p style={{ fontSize:11, color:"#9A9082" }}>Configure — o cardápio e a lista se adaptam automaticamente</p>
              </div>
              <div style={{ display:"flex", gap:7, marginBottom:14, flexWrap:"wrap" }}>
                {Object.entries(TRAINING_TYPES).filter(([k])=>k!=="descanso"&&trainCounts[k]).map(([k,t])=>(
                  <div key={k} style={{ display:"flex", alignItems:"center", gap:6, background:`${t.color}14`, borderRadius:8, padding:"5px 11px", border:`1px solid ${t.color}28` }}>
                    <span>{t.emoji}</span><span style={{ fontSize:12, fontWeight:600, color:t.color }}>{trainCounts[k]}x {t.label}</span>
                  </div>
                ))}
                <div style={{ display:"flex", alignItems:"center", gap:5, background:"rgba(44,44,42,0.05)", borderRadius:8, padding:"5px 11px" }}>
                  <span style={{ fontSize:12 }}>⏱</span><span style={{ fontSize:12, fontWeight:600, color:"#5A5248" }}>{totalMin}min / semana</span>
                </div>
              </div>
              <div className="grid-cards" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(195px,1fr))", gap:9 }}>
                {WEEK_DAYS.map(({key,label}) => {
                  const tarr = trainings[key]||[];
                  const firstTT = TRAINING_TYPES[tarr[0]?.type];
                  const hasReal = tarr.some(t=>t.type!=="descanso");
                  return (
                    <div key={key} className="card" style={{ background:"rgba(255,255,255,0.7)", borderRadius:13, overflow:"hidden", boxShadow:"0 2px 8px rgba(44,44,42,0.05)", transition:"box-shadow 0.2s", border:`2px solid ${hasReal?firstTT.color+"28":"transparent"}` }}>
                      <div style={{ padding:"9px 13px", background:hasReal?`${firstTT.color}12`:"rgba(44,44,42,0.03)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                          <span style={{ fontSize:18 }}>{tarr.filter(t=>t.type!=="descanso").map(t=>TRAINING_TYPES[t.type].emoji).join("") || firstTT.emoji}</span>
                          <div>
                            <div style={{ fontWeight:700, fontSize:13, color:"#2C2C2A" }}>{label}</div>
                            <div style={{ fontSize:11, color:hasReal?firstTT.color:"#9A9082", fontWeight:600 }}>{tarr.filter(t=>t.type!=="descanso").map(t=>TRAINING_TYPES[t.type].label).join(" + ") || "Descanso"}</div>
                          </div>
                        </div>
                        <button onClick={()=>addTrainToDay(key)} style={{ background:"rgba(44,44,42,0.08)", border:"none", borderRadius:6, width:24, height:24, cursor:"pointer", fontSize:14, color:"#5A5248", fontWeight:700 }} title="Adicionar treino">+</button>
                      </div>
                      <div style={{ padding:"12px 13px", display:"flex", flexDirection:"column", gap:12 }}>
                        {tarr.map((t, ti) => {
                          const tt = TRAINING_TYPES[t.type];
                          return (
                            <div key={ti} style={{ position:"relative", borderBottom:ti<tarr.length-1?"1px solid rgba(44,44,42,0.08)":"none", paddingBottom:ti<tarr.length-1?10:0 }}>
                              {tarr.length>1 && <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                                <span style={{ fontSize:9, color:"#9A9082", fontWeight:700 }}>TREINO {ti+1}</span>
                                <button onClick={()=>removeTrainFromDay(key,ti)} style={{ background:"none", border:"none", cursor:"pointer", color:"#C46A6A", fontSize:13 }} title="Remover treino">×</button>
                              </div>}
                              {t.desc && <div style={{ fontSize:10, color:"#6A6258", marginBottom:4 }}>{t.desc}</div>}
                              {t.personal && <div style={{ fontSize:9, color:"#BA7517", fontWeight:700, marginBottom:4 }}>PERSONAL</div>}
                              <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                                {Object.entries(TRAINING_TYPES).map(([k,v])=>(
                                  <button key={k} onClick={()=>updTrain(key,ti,"type",k)} style={{ padding:"4px 7px", border:"none", borderRadius:6, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:10, fontWeight:t.type===k?700:400, background:t.type===k?v.color:"rgba(44,44,42,0.07)", color:t.type===k?"#fff":"#5A5248", transition:"all 0.15s" }}>{v.emoji}</button>
                                ))}
                              </div>
                              {t.type!=="descanso"&&(<>
                                <div style={{ marginTop:6 }}>
                                  <div style={{ fontSize:10, color:"#9A9082", fontWeight:600, marginBottom:4, textTransform:"uppercase", letterSpacing:"0.4px" }}>Duração: {t.duration}min</div>
                                  <input type="range" min={15} max={180} step={5} value={t.duration} onChange={e=>updTrain(key,ti,"duration",Number(e.target.value))} style={{ width:"100%", color:tt.color }} />
                                </div>
                                <div style={{ display:"flex", gap:3, marginTop:4 }}>
                                  {INTENSITY.map(lv=>(
                                    <button key={lv} onClick={()=>updTrain(key,ti,"intensity",lv)} style={{ flex:1, padding:"4px 2px", border:"none", borderRadius:5, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:9, fontWeight:t.intensity===lv?700:400, background:t.intensity===lv?tt.color:"rgba(44,44,42,0.07)", color:t.intensity===lv?"#fff":"#5A5248" }}>{lv}</button>
                                  ))}
                                </div>
                                {t.type==="corrida"&&(
                                  <div style={{ marginTop:6 }}>
                                    <div style={{ fontSize:10, color:"#9A9082", fontWeight:600, marginBottom:3, textTransform:"uppercase", letterSpacing:"0.4px" }}>📋 Planilha</div>
                                    <textarea value={t.planilha||""} onChange={e=>updTrain(key,ti,"planilha",e.target.value)} placeholder="Ex: 5x1km @5:00, 2km aquecimento..." rows={2}
                                      style={{ width:"100%", resize:"none", border:"1.5px solid rgba(44,44,42,0.10)", borderRadius:8, padding:"5px 8px", fontSize:11, fontFamily:"'DM Sans',sans-serif", background:"rgba(255,255,255,0.85)", color:"#2C2C2A", lineHeight:1.4 }} />
                                  </div>
                                )}
                                <div style={{ fontSize:11, color:tt.color, background:`${tt.color}10`, borderRadius:7, padding:"6px 9px", marginTop:4 }}>🥗 {tt.nutrition}</div>
                              </>)}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ════ TREINOS > CARDAPIO ════ */}
          {mainTab==="treinos" && activeSubTab==="cardapio" && (
            <div className="panel-content" style={{ padding:0 }}>
              <div style={{ background:"linear-gradient(135deg,#639922,#4A7A18)", borderRadius:12, padding:"12px 16px", marginBottom:14, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ color:"#fff", fontWeight:700, fontSize:14 }}>🥗 Plano Nutri Isadora — Ciclagem de Carboidrato</div>
                  <div style={{ color:"rgba(255,255,255,0.8)", fontSize:11, marginTop:2 }}>LOW CARB: Seg, Sex, Dom | CARBO: Ter, Qua, Qui, Sáb</div>
                </div>
                <div style={{ display:"flex", gap:4 }}>
                  <span style={{ background:"#E8845A30", color:"#E8845A", padding:"3px 8px", borderRadius:5, fontSize:10, fontWeight:700 }}>LOW CARB</span>
                  <span style={{ background:"#5A8EC430", color:"#5A8EC4", padding:"3px 8px", borderRadius:5, fontSize:10, fontWeight:700 }}>CARBO</span>
                </div>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14, flexWrap:"wrap", gap:10 }}>
                <div>
                  <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:"#2C2C2A", marginBottom:2 }}>Cardápio da Semana</h2>
                  <p style={{ fontSize:11, color:"#9A9082" }}>Treinos aparecem automático — preencha e gere a lista</p>
                </div>
                <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                  <div style={{ background:"rgba(196,149,106,0.1)", borderRadius:9, padding:"7px 11px" }}>
                    <div style={{ fontSize:9, color:"#9A9082", marginBottom:4, fontWeight:600 }}>🥩 CARNES</div>
                    <div style={{ display:"flex", gap:4 }}>
                      {[1,2].map(w=><button key={w} onClick={()=>setMeatWeek(w)} style={{ width:30,height:24,border:"none",borderRadius:6,background:meatWeek===w?"#C4956A":"rgba(196,149,106,0.2)",color:meatWeek===w?"#fff":"#C4956A",fontWeight:700,cursor:"pointer",fontSize:12,fontFamily:"'DM Sans',sans-serif" }}>{w}</button>)}
                    </div>
                  </div>
                  <button className="gen-btn" onClick={generateList} disabled={generatingList}
                    style={{ background:"#7C9E8E",color:"#fff",border:"none",borderRadius:10,padding:"10px 18px",cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"'DM Sans',sans-serif",boxShadow:"0 4px 14px rgba(124,158,142,0.25)",transition:"all 0.2s" }}>
                    {generatingList?"⏳ Gerando...":"🛒 Gerar Lista"}
                  </button>
                </div>
              </div>
              <div className="grid-cards" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:9 }}>
                {WEEK_DAYS.map(({key,label}) => {
                  const tarr = trainings[key]||[]; const hasReal = tarr.some(t=>t.type!=="descanso");
                  const firstTT = hasReal ? TRAINING_TYPES[tarr.find(t=>t.type!=="descanso").type] : TRAINING_TYPES["descanso"];
                  const carbType = getCarbType(key); const carbColor = getCarbColor(key);
                  return (
                    <div key={key} className="card" style={{ background:"rgba(255,255,255,0.7)", borderRadius:13, overflow:"hidden", boxShadow:"0 2px 8px rgba(44,44,42,0.05)", transition:"box-shadow 0.2s" }}>
                      <div style={{ padding:"8px 12px", background:hasReal?`${firstTT.color}12`:"rgba(44,44,42,0.03)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <span style={{ fontWeight:600, fontSize:13, color:"#2C2C2A" }}>{label}</span>
                        <div style={{ display:"flex", gap:4, alignItems:"center" }}>
                          {tarr.filter(t=>t.type!=="descanso").map((t,ti)=><span key={ti} style={{ fontSize:13 }}>{TRAINING_TYPES[t.type].emoji}</span>)}
                          <span style={{ fontSize:9, background:carbColor+"20", color:carbColor, borderRadius:4, padding:"2px 6px", fontWeight:700 }}>{carbType}</span>
                          {key==="quinta"&&<span style={{ fontSize:10,color:"#7C9E8E" }}>🧹</span>}
                          {key==="sabado"&&<span style={{ fontSize:10,color:"#C4956A" }}>🛒</span>}
                        </div>
                      </div>
                      {tarr.filter(t=>t.type!=="descanso"&&t.desc).map((t,ti)=>{ const tt=TRAINING_TYPES[t.type]; return <div key={ti} style={{ padding:"3px 12px",background:`${tt.color}08`,fontSize:10,color:tt.color,fontWeight:600 }}>{t.desc} — {tt.nutrition}</div>; })}
                      <div style={{ padding:"9px 12px",display:"flex",flexDirection:"column",gap:7 }}>
                        {MEALS.map(meal=>(
                          <div key={meal}>
                            <div style={{ fontSize:9,color:"#9A9082",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.4px",marginBottom:3 }}>{MEAL_EMOJI[meal]} {meal}</div>
                            <textarea className="meal-ta" value={meals[key][meal]||""} onChange={e=>updMeal(key,meal,e.target.value)}
                              placeholder={meal==="Pós-treino"?"shake, fruta...":meal==="Café da manhã"?"pão, ovo, fruta...":meal==="Almoço"?"proteína, arroz, salada...":meal==="Sobremesa"?"fruta, iogurte...":meal==="Lanche"?"castanhas, fruta...":"leve ou prático..."} rows={1}
                              style={{ width:"100%",resize:"none",border:"1.5px solid rgba(44,44,42,0.10)",borderRadius:8,padding:"5px 8px",fontSize:11,fontFamily:"'DM Sans',sans-serif",background:"rgba(255,255,255,0.85)",color:"#2C2C2A",lineHeight:1.4 }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ════ TREINOS > STRAVA/PERFORMANCE ════ */}
          {mainTab==="treinos" && activeSubTab==="strava" && (
            <div className="panel-content" style={{ padding:0 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14, flexWrap:"wrap", gap:10 }}>
                <div>
                  <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:"#2C2C2A", marginBottom:2 }}>Strava / Performance</h2>
                  <p style={{ fontSize:11, color:"#9A9082" }}>Análise de treinos, zonas de FC e volume semanal</p>
                </div>
                <div style={{ display:"flex", gap:6 }}>
                  {["painel","semanas","atividades"].map(v => (
                    <button key={v} onClick={()=>setStravaView(v)} style={{ padding:"6px 12px", border:"none", borderRadius:8, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:stravaView===v?700:400, background:stravaView===v?"#2C2C2A":"rgba(44,44,42,0.06)", color:stravaView===v?"#F5EED8":"#6A6258" }}>
                      {v==="painel"?"Painel":v==="semanas"?"Semanas":"Atividades"}
                    </button>
                  ))}
                </div>
              </div>
              {!stravaAuth ? (
                <div style={{ textAlign:"center", padding:"40px 20px" }}>
                  <div style={{ fontSize:48, marginBottom:12 }}>🏃‍♀️</div>
                  <div style={{ fontSize:14, fontWeight:600, color:"#5A5248", marginBottom:8 }}>Strava não conectado</div>
                  <p style={{ fontSize:12, color:"#9A9082", marginBottom:16 }}>Conecte sua conta Strava para ver dados de performance.</p>
                  <button onClick={()=>{ window.location.href = isLocal ? `${API}/auth/strava` : "/auth/strava"; }} style={{ background:"#FC4C02", color:"#fff", border:"none", borderRadius:10, padding:"10px 24px", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"'DM Sans',sans-serif" }}>Conectar Strava</button>
                </div>
              ) : (
                <>
                  {!stravaActivities.length && !stravaLoading && (
                    <div style={{ textAlign:"center", padding:"30px" }}>
                      <button onClick={loadStravaData} style={{ background:"#FC4C02", color:"#fff", border:"none", borderRadius:10, padding:"10px 24px", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"'DM Sans',sans-serif" }}>
                        🔄 Carregar dados do Strava
                      </button>
                    </div>
                  )}
                  {stravaLoading && (
                    <div style={{ textAlign:"center", padding:"40px" }}>
                      <div style={{ display:"flex", justifyContent:"center", gap:6 }}>
                        {["d1","d2","d3"].map(c=><div key={c} className={c} style={{ width:9,height:9,background:"#FC4C02",borderRadius:"50%" }} />)}
                      </div>
                      <div style={{ fontSize:12, color:"#9A9082", marginTop:10 }}>Carregando dados do Strava...</div>
                    </div>
                  )}
                  {stravaError && <div style={{ background:"rgba(196,106,106,0.1)", borderRadius:10, padding:"10px 14px", color:"#C46A6A", fontSize:12, marginBottom:12 }}>{stravaError}</div>}
                  {stravaView==="painel" && stravaActivities.length > 0 && (
                    <div>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:16 }}>
                        <div style={{ background:"linear-gradient(135deg,#FC4C02,#E83E02)", borderRadius:14, padding:"16px", textAlign:"center" }}>
                          <div style={{ fontSize:10, color:"rgba(255,255,255,0.7)", fontWeight:600, marginBottom:4 }}>SCORE SEMANAL</div>
                          <div style={{ fontSize:32, fontWeight:700, color:"#fff" }}>{calcWeeklyScore()}</div>
                          <div style={{ fontSize:10, color:"rgba(255,255,255,0.6)" }}>/100</div>
                        </div>
                        <div style={{ background:"rgba(255,255,255,0.65)", borderRadius:14, padding:"16px" }}>
                          <div style={{ fontSize:10, color:"#9A9082", fontWeight:600, marginBottom:6 }}>KM / SEMANA</div>
                          <div style={{ fontSize:24, fontWeight:700, color:"#2C2C2A" }}>
                            {(stravaActivities.filter(a => new Date(a.start_date) >= new Date(Date.now()-7*24*60*60*1000)).reduce((s,a)=>s+(a.distance||0)/1000,0)).toFixed(1)}
                          </div>
                          <div style={{ fontSize:10, color:"#9A9082" }}>km</div>
                        </div>
                        <div style={{ background:"rgba(255,255,255,0.65)", borderRadius:14, padding:"16px" }}>
                          <div style={{ fontSize:10, color:"#9A9082", fontWeight:600, marginBottom:6 }}>FC MÉDIA</div>
                          <div style={{ fontSize:24, fontWeight:700, color:"#2C2C2A" }}>
                            {(() => { const recent = stravaActivities.slice(0,5).filter(a=>a.average_heartrate); return recent.length ? Math.round(recent.reduce((s,a)=>s+a.average_heartrate,0)/recent.length) : "--"; })()}
                          </div>
                          <div style={{ fontSize:10, color:"#9A9082" }}>bpm</div>
                        </div>
                      </div>
                      <div style={{ fontSize:10, fontWeight:700, color:"#9A9082", textTransform:"uppercase", letterSpacing:"0.7px", marginBottom:8 }}>ATIVIDADES RECENTES</div>
                      {stravaActivities.slice(0,5).map((act,i) => {
                        const zone = getHRZone(act.average_heartrate);
                        const pace = act.distance && act.moving_time ? ((act.moving_time/60)/(act.distance/1000)).toFixed(1) : null;
                        return (
                          <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", background:"rgba(255,255,255,0.55)", borderRadius:10, marginBottom:6 }}>
                            <div style={{ width:36, height:36, borderRadius:8, background:`${zone.color}20`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:zone.color }}>{zone.zone}</div>
                            <div style={{ flex:1 }}>
                              <div style={{ fontSize:12, fontWeight:600, color:"#2C2C2A" }}>{act.name || act.type}</div>
                              <div style={{ fontSize:10, color:"#9A9082" }}>
                                {act.distance ? (act.distance/1000).toFixed(1)+"km" : ""} {pace ? `· ${pace} min/km` : ""} {act.calories ? `· ${act.calories} kcal` : ""}
                              </div>
                            </div>
                            <div style={{ textAlign:"right" }}>
                              <div style={{ fontSize:10, color:"#9A9082" }}>{new Date(act.start_date).toLocaleDateString("pt-BR",{day:"numeric",month:"short"})}</div>
                              {act.average_heartrate && <div style={{ fontSize:10, color:zone.color, fontWeight:600 }}>{Math.round(act.average_heartrate)} bpm</div>}
                            </div>
                          </div>
                        );
                      })}
                      {stravaWeekly.length > 0 && (
                        <div style={{ marginTop:16, background:"rgba(255,255,255,0.6)", borderRadius:14, padding:"14px 16px" }}>
                          <div style={{ fontSize:10, fontWeight:700, color:"#9A9082", marginBottom:10 }}>VOLUME ÚLTIMAS 8 SEMANAS (km)</div>
                          <div style={{ display:"flex", alignItems:"flex-end", gap:6, height:80 }}>
                            {stravaWeekly.slice(0,8).map((w,i) => {
                              const maxKm = Math.max(...stravaWeekly.slice(0,8).map(wk => wk.totalKm || wk.distance || 0), 1);
                              const km = w.totalKm || w.distance || 0;
                              return (
                                <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center" }}>
                                  <div style={{ width:"100%", background:"#FC4C02", borderRadius:"4px 4px 0 0", height:`${Math.max(4,(km/maxKm)*70)}px`, transition:"height 0.3s" }} />
                                  <div style={{ fontSize:8, color:"#9A9082", marginTop:2 }}>{km.toFixed(0)}</div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {stravaView==="semanas" && stravaWeekly.length > 0 && (
                    <div>
                      {stravaWeekly.map((w,i) => (
                        <div key={i} style={{ background:"rgba(255,255,255,0.6)", borderRadius:12, padding:"12px 14px", marginBottom:8 }}>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                            <span style={{ fontSize:12, fontWeight:600, color:"#2C2C2A" }}>Semana {w.weekLabel || (i+1)}</span>
                            <span style={{ fontSize:11, color:"#FC4C02", fontWeight:600 }}>{(w.totalKm||w.distance||0).toFixed(1)} km</span>
                          </div>
                          <div style={{ display:"flex", gap:12, fontSize:10, color:"#9A9082" }}>
                            <span>{w.activities || w.count || 0} atividades</span>
                            <span>{w.totalCalories || w.calories || 0} kcal</span>
                            <span>{w.totalTime ? Math.round(w.totalTime/60) : 0} min</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {stravaView==="atividades" && stravaActivities.length > 0 && (
                    <div>
                      {stravaActivities.map((act,i) => {
                        const zone = getHRZone(act.average_heartrate);
                        const pace = act.distance && act.moving_time ? ((act.moving_time/60)/(act.distance/1000)).toFixed(1) : null;
                        return (
                          <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", background:"rgba(255,255,255,0.55)", borderRadius:10, marginBottom:6 }}>
                            <div style={{ width:36, height:36, borderRadius:8, background:`${zone.color}20`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:zone.color }}>{zone.zone}</div>
                            <div style={{ flex:1 }}>
                              <div style={{ fontSize:12, fontWeight:600, color:"#2C2C2A" }}>{act.name || act.type}</div>
                              <div style={{ fontSize:10, color:"#9A9082" }}>
                                {act.distance ? (act.distance/1000).toFixed(1)+"km" : ""} {pace ? `· ${pace} min/km` : ""} {act.calories ? `· ${act.calories} kcal` : ""}
                              </div>
                            </div>
                            <div style={{ textAlign:"right" }}>
                              <div style={{ fontSize:10, color:"#9A9082" }}>{new Date(act.start_date).toLocaleDateString("pt-BR")}</div>
                              {act.average_heartrate && <div style={{ fontSize:10, color:zone.color, fontWeight:600 }}>{Math.round(act.average_heartrate)} bpm</div>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* ════ TREINOS > RODA DA VIDA ════ */}
          {mainTab==="treinos" && activeSubTab==="roda" && (
            <div className="panel-content" style={{ padding:0 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16, flexWrap:"wrap", gap:10 }}>
                <div>
                  <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:17, color:"#2C2C2A", marginBottom:2 }}>Roda da Vida</h2>
                  <p style={{ fontSize:11, color:"#9A9082" }}>Avalie 8 áreas de 1 a 10 · Uma roda desequilibrada faz barulho ao girar</p>
                </div>
                <div style={{ display:"flex", gap:7, alignItems:"center", flexWrap:"wrap" }}>
                  <input value={weekLabel} onChange={e=>setWeekLabel(e.target.value)} style={{ ...inputSt(), fontSize:11, width:180 }} placeholder="Rótulo da semana" />
                  <button onClick={saveWeek} style={{ background:"#7C9E8E", color:"#fff", border:"none", borderRadius:9, padding:"8px 16px", cursor:"pointer", fontSize:12, fontWeight:600, fontFamily:"'DM Sans',sans-serif", boxShadow:"0 4px 14px rgba(124,158,142,0.2)" }}>
                    💾 Salvar semana
                  </button>
                </div>
              </div>
              <div className="grid-2col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
                <div style={{ background:"rgba(255,255,255,0.65)", borderRadius:16, padding:"16px 12px", display:"flex", flexDirection:"column", alignItems:"center" }}>
                  <RadarChart scores={wheelScores} size={300} compact={false} />
                  <div style={{ display:"flex", gap:12, marginTop:8 }}>
                    <div style={{ textAlign:"center" }}>
                      <div style={{ fontSize:24, fontWeight:700, color:"#2C2C2A" }}>{avgScore}</div>
                      <div style={{ fontSize:10, color:"#9A9082" }}>média geral</div>
                    </div>
                    {lowAreas.length > 0 && (
                      <div style={{ background:"rgba(196,106,106,0.08)", borderRadius:10, padding:"8px 12px", border:"1px solid rgba(196,106,106,0.18)" }}>
                        <div style={{ fontSize:10, fontWeight:700, color:"#C46A6A", marginBottom:4 }}>⚠ Abaixo de 6</div>
                        {lowAreas.map(a=>(
                          <div key={a.key} style={{ fontSize:11, color:"#5A2A2A" }}>{a.emoji} {a.label}: {wheelScores[a.key]}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ background:"rgba(255,255,255,0.65)", borderRadius:16, padding:"16px 18px", display:"flex", flexDirection:"column", gap:10 }}>
                  {WHEEL_AREAS.map(area => (
                    <div key={area.key}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                        <div style={{ fontSize:13, color:"#2C2C2A" }}>{area.emoji} {area.label}</div>
                        <div style={{ fontSize:13, fontWeight:700, color:area.color, minWidth:18, textAlign:"right" }}>{wheelScores[area.key]}</div>
                      </div>
                      <input type="range" min="1" max="10" step="1" value={wheelScores[area.key]} onChange={e=>updateScore(area.key, e.target.value)} style={{ width:"100%", color:area.color, cursor:"pointer" }} />
                    </div>
                  ))}
                </div>
              </div>
              {wheelHistory.length > 0 && (
                <div style={{ background:"rgba(255,255,255,0.6)", borderRadius:14, padding:"14px 16px" }}>
                  <div style={{ fontSize:10, fontWeight:700, color:"#9A9082", textTransform:"uppercase", letterSpacing:"0.7px", marginBottom:10 }}>📈 Histórico — últimas semanas salvas</div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:9 }}>
                    {wheelHistory.map((entry, ei) => {
                      const avg = (Object.values(entry.scores).reduce((a,b)=>a+b,0)/8).toFixed(1);
                      const lo  = WHEEL_AREAS.filter(a=>(entry.scores[a.key]||0)<=5);
                      return (
                        <div key={ei} style={{ background:"rgba(255,255,255,0.65)", borderRadius:12, padding:"12px 14px", border:"1px solid rgba(44,44,42,0.07)" }}>
                          <div style={{ fontSize:11, fontWeight:600, color:"#2C2C2A", marginBottom:6 }}>{entry.label}</div>
                          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                            <RadarChart scores={entry.scores} size={80} compact={true} />
                            <div>
                              <div style={{ fontSize:18, fontWeight:700, color:"#2C2C2A" }}>{avg}<span style={{ fontSize:10, color:"#9A9082", fontWeight:400 }}>/10</span></div>
                              {lo.length > 0 && <div style={{ fontSize:10, color:"#C46A6A" }}>⚠ {lo.map(a=>a.shortLabel).join(", ")}</div>}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ════ TREINOS > HÁBITOS (Phase 2) ════ */}
          {mainTab==="treinos" && activeSubTab==="habitos" && (
            <div className="panel-content" style={{ padding:0 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14, flexWrap:"wrap", gap:8 }}>
                <div>
                  <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:17, color:"#2C2C2A", marginBottom:2 }}>Rastreador de Hábitos</h2>
                  <p style={{ fontSize:11, color:"#9A9082" }}>Atomic Habits: cada ✓ é um voto pela pessoa que você quer ser</p>
                </div>
                <button onClick={()=>setShowAddHabit(p=>!p)} style={{ background:showAddHabit?"#2C2C2A":"rgba(44,44,42,0.07)", color:showAddHabit?"#F5EED8":"#2C2C2A", border:"none", borderRadius:9, padding:"7px 14px", cursor:"pointer", fontSize:12, fontWeight:600, fontFamily:"'DM Sans',sans-serif" }}>
                  {showAddHabit?"✕ Fechar":"+ Novo hábito"}
                </button>
              </div>

              {/* Add habit form */}
              {showAddHabit && (
                <div style={{ background:"rgba(255,255,255,0.75)", borderRadius:14, padding:"14px 16px", marginBottom:16, border:"1.5px solid rgba(44,44,42,0.08)" }}>
                  <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:8 }}>
                    <input value={newHabit.emoji} onChange={e=>setNewHabit(p=>({...p,emoji:e.target.value}))} style={{ ...inputSt(), width:44, textAlign:"center", fontSize:18 }}/>
                    <input value={newHabit.name} onChange={e=>setNewHabit(p=>({...p,name:e.target.value}))} placeholder="Nome do hábito..." style={{ ...inputSt(), flex:1, minWidth:140 }}/>
                    <select value={newHabit.color} onChange={e=>setNewHabit(p=>({...p,color:e.target.value}))} style={inputSt()}>
                      {["#5DCAA5","#D4537E","#378ADD","#7C9E8E","#639922","#7F77DD","#BA7517","#D85A30","#E8845A"].map(c=><option key={c} value={c}>{"●"+" "+c}</option>)}
                    </select>
                  </div>
                  <div style={{ marginBottom:8 }}>
                    <div style={{ fontSize:10, color:"#9A9082", fontWeight:600, marginBottom:6 }}>DIAS DA SEMANA</div>
                    <div style={{ display:"flex", gap:5 }}>
                      {["D","S","T","Q","Q","S","S"].map((d,i)=>(
                        <button key={i} onClick={()=>toggleDay(i)} style={{ width:30, height:30, border:"none", borderRadius:7, background:newHabit.days.includes(i)?newHabit.color:"rgba(44,44,42,0.07)", color:newHabit.days.includes(i)?"#fff":"#5A5248", fontWeight:600, cursor:"pointer", fontSize:11, fontFamily:"'DM Sans',sans-serif" }}>{d}</button>
                      ))}
                    </div>
                  </div>
                  <button onClick={addHabit} disabled={!newHabit.name.trim()} style={{ background:"#2C2C2A", color:"#F5EED8", border:"none", borderRadius:9, padding:"7px 16px", cursor:"pointer", fontSize:12, fontWeight:600, fontFamily:"'DM Sans',sans-serif", opacity:newHabit.name.trim()?1:0.5 }}>Criar hábito</button>
                </div>
              )}

              {/* Habit cards */}
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {habits.map(h => {
                  const s = streak(h.id);
                  const hpct = habitWeekPct(h.id);
                  const daysActive = h.days;
                  return (
                    <div key={h.id} style={{ background:"rgba(255,255,255,0.7)", borderRadius:16, overflow:"hidden", border:`1.5px solid ${h.color}22` }}>
                      <div style={{ padding:"11px 15px", background:`${h.color}10`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <span style={{ fontSize:20 }}>{h.emoji}</span>
                          <div>
                            <div style={{ fontSize:14, fontWeight:600, color:"#2C2C2A" }}>{h.name}</div>
                            <div style={{ fontSize:11, color:"#9A9082" }}>{h.category} · {h.days.length}x/semana</div>
                          </div>
                        </div>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          {s>=2 && (
                            <div style={{ display:"flex", alignItems:"center", gap:4, background:"rgba(186,117,23,0.1)", borderRadius:8, padding:"4px 10px" }}>
                              <Flame streak={s} />
                              <span style={{ fontSize:12, fontWeight:700, color:"#BA7517" }}>{s} dias</span>
                            </div>
                          )}
                          <div style={{ textAlign:"center" }}>
                            <div style={{ fontSize:16, fontWeight:700, color:h.color }}>{hpct}%</div>
                            <div style={{ fontSize:9, color:"#9A9082" }}>esta semana</div>
                          </div>
                          <button onClick={()=>removeHabit(h.id)} style={{ background:"none", border:"none", cursor:"pointer", color:"#C4A882", fontSize:16 }}>×</button>
                        </div>
                      </div>
                      <div style={{ height:3, background:"rgba(44,44,42,0.07)" }}><div style={{ height:"100%", width:`${hpct}%`, background:h.color, transition:"width 0.4s" }}/></div>
                      <div style={{ padding:"10px 15px 12px" }}>
                        <div style={{ display:"flex", gap:5 }}>
                          {wd.map((dateStr,dayIdx) => {
                            const isDue = daysActive.includes(dayIdx);
                            const checked = isChecked(h.id, dateStr);
                            const isTodayDay = dayIdx === today;
                            return (
                              <div key={dayIdx} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                                <div style={{ fontSize:9, color:isTodayDay?"#2C2C2A":"#9A9082", fontWeight:isTodayDay?700:400 }}>{DAYS_SHORT[dayIdx]}</div>
                                <button onClick={()=>isDue&&togHabit(h.id,dateStr)} style={{ width:"100%", aspectRatio:"1", border:`1.5px solid ${isDue?(checked?h.color:"rgba(44,44,42,0.15)"):"transparent"}`, borderRadius:8, background:isDue?(checked?h.color:"rgba(255,255,255,0.7)"):"transparent", cursor:isDue?"pointer":"default", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.15s", boxShadow:isTodayDay&&isDue?"0 0 0 2px "+h.color+"50":"none" }}>
                                  {isDue&&checked&&<span style={{ color:"#fff", fontSize:11, fontWeight:700 }}>✓</span>}
                                  {isDue&&!checked&&<span style={{ fontSize:11, color:"rgba(44,44,42,0.15)" }}>·</span>}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ════ TREINOS > BUFFERS (Phase 2) ════ */}
          {mainTab==="treinos" && activeSubTab==="buffers" && (
            <div className="panel-content" style={{ padding:0 }}>
              <div style={{ marginBottom:14 }}>
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:17, color:"#2C2C2A", marginBottom:2 }}>Buffers Protegidos</h2>
                <p style={{ fontSize:11, color:"#9A9082" }}>Essentialism: blocos sagrados que a agenda não pode invadir — recuperação, casal e foco</p>
              </div>

              {/* Buffer types legend */}
              <div style={{ display:"flex", gap:7, marginBottom:14, flexWrap:"wrap" }}>
                {BUFFER_TYPES.map(bt=>(
                  <div key={bt.key} style={{ display:"flex", alignItems:"center", gap:6, background:`${bt.color}10`, borderRadius:8, padding:"5px 11px", border:`1px solid ${bt.color}25` }}>
                    <span style={{ fontSize:13 }}>{bt.emoji}</span>
                    <div><div style={{ fontSize:11, fontWeight:600, color:bt.color }}>{bt.label}</div><div style={{ fontSize:9, color:"#9A9082" }}>{bt.desc}</div></div>
                  </div>
                ))}
              </div>

              {/* Add buffer */}
              <div style={{ background:"rgba(255,255,255,0.7)", borderRadius:14, padding:"14px 16px", marginBottom:16, border:"1.5px solid rgba(44,44,42,0.08)" }}>
                <div style={{ fontSize:10, color:"#9A9082", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.6px", marginBottom:8 }}>Novo buffer</div>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:7 }}>
                  <select value={newBuf.day} onChange={e=>setNewBuf(p=>({...p,day:e.target.value}))} style={inputSt()}>
                    {WEEK_DAYS.map(d=><option key={d.key} value={d.key}>{d.label}</option>)}
                  </select>
                  <input type="time" value={newBuf.time} onChange={e=>setNewBuf(p=>({...p,time:e.target.value}))} style={{ ...inputSt(), width:85 }}/>
                  <select value={newBuf.duration} onChange={e=>setNewBuf(p=>({...p,duration:Number(e.target.value)}))} style={inputSt()}>
                    {[15,30,45,60,90,120].map(d=><option key={d} value={d}>{d}min</option>)}
                  </select>
                  <select value={newBuf.type} onChange={e=>setNewBuf(p=>({...p,type:e.target.value}))} style={inputSt()}>
                    {BUFFER_TYPES.map(bt=><option key={bt.key} value={bt.key}>{bt.emoji} {bt.label}</option>)}
                  </select>
                </div>
                <div style={{ display:"flex", gap:6 }}>
                  <input value={newBuf.note} onChange={e=>setNewBuf(p=>({...p,note:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addBuffer()} placeholder="Descrição do buffer... ex: jantar sem celular" style={{ ...inputSt(), flex:1 }}/>
                  <button onClick={addBuffer} style={{ background:"#2C2C2A", color:"#F5EED8", border:"none", borderRadius:9, padding:"7px 14px", cursor:"pointer", fontSize:12, fontWeight:600, fontFamily:"'DM Sans',sans-serif" }}>Adicionar</button>
                </div>
              </div>

              {/* Buffers by day */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:10 }}>
                {WEEK_DAYS.map(({key,label}) => {
                  const dayBufs = buffers.filter(b=>b.day===key).sort((a,z)=>a.time.localeCompare(z.time));
                  const tarr = trainings[key]||[];
                  const isToday = key===todayKey;
                  if (dayBufs.length===0 && !isToday) return null;
                  return (
                    <div key={key} className="buf-card" style={{ background:"rgba(255,255,255,0.65)", borderRadius:14, overflow:"hidden", boxShadow:"0 2px 8px rgba(44,44,42,0.05)", border:isToday?"2px solid rgba(44,44,42,0.15)":"1.5px solid rgba(44,44,42,0.06)", transition:"box-shadow 0.2s" }}>
                      <div style={{ padding:"9px 13px", background:key==="quinta"?"rgba(124,158,142,0.1)":key==="sabado"?"rgba(196,149,106,0.1)":"rgba(44,44,42,0.03)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <span style={{ fontWeight:600, fontSize:13, color:"#2C2C2A" }}>{label}{isToday&&<span style={{ fontSize:9, color:"#7C9E8E", marginLeft:6, fontWeight:700 }}>HOJE</span>}</span>
                        <span style={{ fontSize:12 }}>{tarr.filter(t=>t.type!=="descanso").map(t=>TRAINING_TYPES[t.type].emoji+" "+t.duration+"min").join(" · ") || ""}</span>
                      </div>
                      <div style={{ padding:"10px 13px", display:"flex", flexDirection:"column", gap:6 }}>
                        {dayBufs.length===0&&<div style={{ fontSize:11, color:"#C9BFA8", textAlign:"center", padding:"8px 0" }}>Sem buffers ainda</div>}
                        {dayBufs.map(b => { const bt=BUFFER_TYPES.find(x=>x.key===b.type); return (
                          <div key={b.id} style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"8px 10px", background:`${bt.color}10`, borderRadius:10, borderLeft:`3px solid ${bt.color}` }}>
                            <span style={{ fontSize:16, flexShrink:0, marginTop:1 }}>{bt.emoji}</span>
                            <div style={{ flex:1, minWidth:0 }}>
                              <div style={{ fontSize:12, fontWeight:700, color:bt.color }}>{b.time} · {b.duration}min</div>
                              <div style={{ fontSize:11, fontWeight:600, color:"#2C2C2A" }}>{bt.label}</div>
                              {b.note&&<div style={{ fontSize:11, color:"#6A6258", marginTop:1, lineHeight:1.4 }}>{b.note}</div>}
                            </div>
                            <button onClick={()=>removeBuffer(b.id)} style={{ background:"none", border:"none", cursor:"pointer", color:"#C4A882", fontSize:14, flexShrink:0 }}>×</button>
                          </div>
                        ); })}
                      </div>
                    </div>
                  );
                })}
              </div>
              {WEEK_DAYS.every(({key})=>buffers.filter(b=>b.day===key).length===0)&&(
                <div style={{ textAlign:"center", padding:"30px 20px", color:"#9A9082" }}>
                  <div style={{ fontSize:36, marginBottom:8 }}>🔋</div>
                  <div style={{ fontSize:13, fontWeight:600, color:"#5A5248", marginBottom:4 }}>Nenhum buffer configurado</div>
                  <p style={{ fontSize:12 }}>Adicione blocos protegidos na semana para recuperação, casal e foco.</p>
                </div>
              )}
            </div>
          )}

          {/* ════ SAUDE > EXAMES ════ */}
          {mainTab==="saude" && activeSubTab==="exames" && (
            <div className="panel-content" style={{ padding:0 }}>
              <div style={{ marginBottom:14 }}>
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:"#2C2C2A", marginBottom:2 }}>Exames de Sangue</h2>
                <p style={{ fontSize:11, color:"#9A9082" }}>Data: 10/03/2026 — Resultados agrupados por categoria</p>
              </div>
              {(() => {
                const alerts = EXAMES.filter(e => e.status !== "ok");
                if (!alerts.length) return null;
                return (
                  <div style={{ background:"rgba(196,106,106,0.08)", border:"1px solid rgba(196,106,106,0.18)", borderRadius:12, padding:"12px 14px", marginBottom:14 }}>
                    <div style={{ fontSize:11, fontWeight:700, color:"#C46A6A", marginBottom:6 }}>⚠ Itens fora do intervalo de referência</div>
                    {alerts.map((e,i) => (
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                        <span style={{ fontSize:10, fontWeight:700, color:e.status==="alto"?"#C46A6A":"#C4956A", padding:"2px 6px", borderRadius:4, background:e.status==="alto"?"rgba(196,106,106,0.15)":"rgba(196,149,106,0.15)" }}>{e.status.toUpperCase()}</span>
                        <span style={{ fontSize:12, color:"#2C2C2A" }}>{e.nome}: {e.val} {e.unit} <span style={{ color:"#9A9082" }}>(ref: {e.ref})</span></span>
                      </div>
                    ))}
                  </div>
                );
              })()}
              {EXAME_CATS.map(cat => {
                const items = EXAMES.filter(e => e.cat === cat);
                if (!items.length) return null;
                return (
                  <div key={cat} style={{ marginBottom:16 }}>
                    <div style={{ fontSize:10, fontWeight:700, color:"#6A6258", textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:8, borderBottom:"1px solid rgba(44,44,42,0.08)", paddingBottom:4 }}>{cat}</div>
                    {items.map((e,i) => (
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 12px", borderRadius:8, marginBottom:3, background:e.status!=="ok"?`${e.status==="alto"?"rgba(196,106,106,0.06)":"rgba(196,149,106,0.06)"}`:"rgba(255,255,255,0.5)" }}>
                        <div style={{ width:8, height:8, borderRadius:"50%", background:e.status==="ok"?"#7C9E8E":e.status==="alto"?"#C46A6A":"#C4956A", flexShrink:0 }} />
                        <span style={{ flex:1, fontSize:12, color:"#2C2C2A", fontWeight:500 }}>{e.nome}</span>
                        <span style={{ fontSize:13, fontWeight:700, color:e.status==="ok"?"#2C2C2A":e.status==="alto"?"#C46A6A":"#C4956A" }}>{e.val}</span>
                        <span style={{ fontSize:10, color:"#9A9082", minWidth:50 }}>{e.unit}</span>
                        <span style={{ fontSize:10, color:"#B0A592" }}>Ref: {e.ref}</span>
                        <span style={{ fontSize:9, fontWeight:700, color:e.status==="ok"?"#7C9E8E":e.status==="alto"?"#C46A6A":"#C4956A", padding:"1px 6px", borderRadius:4, background:e.status==="ok"?"rgba(124,158,142,0.12)":e.status==="alto"?"rgba(196,106,106,0.12)":"rgba(196,149,106,0.12)" }}>
                          {e.status==="ok"?"✓ OK":e.status.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}

          {/* ════ SAUDE > EVOLUCAO ════ */}
          {mainTab==="saude" && activeSubTab==="evolucao" && (
            <div className="panel-content" style={{ padding:0 }}>
              <div style={{ marginBottom:14 }}>
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:"#2C2C2A", marginBottom:2 }}>Evolução Corporal</h2>
                <p style={{ fontSize:11, color:"#9A9082" }}>Comparação 2022 → 2026 — Dados de bioimpedância</p>
              </div>

              {/* ── METAS MENSAIS ── */}
              {(() => {
                const gorduraAtual = BODY_2026.gordura;
                const gorduraMeta = 18;
                const magraAtual = BODY_2026.magra;
                const meses = ["Abr","Mai","Jun","Jul","Ago","Set"];
                const gorduraTargets = meses.map((_,i) => +(gorduraAtual - ((gorduraAtual - gorduraMeta) * (i+1) / meses.length)).toFixed(1));
                const gorduraPct = Math.min(100, Math.max(0, ((gorduraAtual - gorduraMeta) > 0 ? ((gorduraAtual - gorduraMeta) / gorduraAtual) * 100 : 0)));
                const progressPct = 0; // starting point
                return (
                  <div style={{ background:"linear-gradient(135deg, rgba(93,202,165,0.08), rgba(55,138,221,0.06))", borderRadius:14, padding:"16px 18px", marginBottom:16, border:"1.5px solid rgba(93,202,165,0.2)" }}>
                    <div style={{ fontSize:10, fontWeight:700, color:"#5DCAA5", textTransform:"uppercase", letterSpacing:"0.7px", marginBottom:10 }}>🎯 METAS DE COMPOSIÇÃO CORPORAL — 6 MESES</div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
                      {/* Gordura */}
                      <div style={{ background:"rgba(255,255,255,0.7)", borderRadius:10, padding:"12px 14px" }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:6 }}>
                          <span style={{ fontSize:12, fontWeight:700, color:"#C46A6A" }}>% Gordura</span>
                          <span style={{ fontSize:10, color:"#9A9082" }}>{gorduraAtual}% → {gorduraMeta}%</span>
                        </div>
                        <div style={{ background:"rgba(196,106,106,0.12)", borderRadius:6, height:14, overflow:"hidden", marginBottom:6 }}>
                          <div style={{ height:"100%", borderRadius:6, background:"linear-gradient(90deg, #C46A6A, #5DCAA5)", width:`${((gorduraAtual - gorduraMeta) / gorduraAtual * 100).toFixed(0)}%`, transition:"width 0.5s" }}>
                            <div style={{ height:"100%", borderRadius:6, background:"#C46A6A", width:`${(gorduraAtual / gorduraAtual * 100).toFixed(0)}%` }} />
                          </div>
                        </div>
                        <div style={{ fontSize:10, color:"#6A6258" }}>Reduzir <strong>{(gorduraAtual - gorduraMeta).toFixed(1)}pp</strong> em 6 meses (~{((gorduraAtual - gorduraMeta)/6).toFixed(1)}pp/mês)</div>
                      </div>
                      {/* Massa Magra */}
                      <div style={{ background:"rgba(255,255,255,0.7)", borderRadius:10, padding:"12px 14px" }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:6 }}>
                          <span style={{ fontSize:12, fontWeight:700, color:"#5DCAA5" }}>Massa Magra</span>
                          <span style={{ fontSize:10, color:"#9A9082" }}>{magraAtual}kg → ↑ manter/ganhar</span>
                        </div>
                        <div style={{ background:"rgba(93,202,165,0.12)", borderRadius:6, height:14, overflow:"hidden", marginBottom:6 }}>
                          <div style={{ height:"100%", borderRadius:6, background:"#5DCAA5", width:"100%" }} />
                        </div>
                        <div style={{ fontSize:10, color:"#6A6258" }}>Meta: manter acima de <strong>{magraAtual}kg</strong> enquanto reduz gordura</div>
                      </div>
                    </div>
                    {/* Monthly progression */}
                    <div style={{ background:"rgba(255,255,255,0.6)", borderRadius:10, padding:"10px 14px" }}>
                      <div style={{ fontSize:10, fontWeight:700, color:"#9A9082", marginBottom:8, textTransform:"uppercase", letterSpacing:"0.5px" }}>📅 PROGRESSÃO MENSAL — % GORDURA</div>
                      <div style={{ display:"flex", gap:6, justifyContent:"space-between" }}>
                        <div style={{ textAlign:"center", flex:1 }}>
                          <div style={{ fontSize:9, color:"#9A9082", marginBottom:2 }}>ATUAL</div>
                          <div style={{ fontSize:16, fontWeight:700, color:"#C46A6A" }}>{gorduraAtual}%</div>
                        </div>
                        {meses.map((m,i) => (
                          <div key={m} style={{ textAlign:"center", flex:1 }}>
                            <div style={{ fontSize:9, color:"#9A9082", marginBottom:2 }}>{m}</div>
                            <div style={{ fontSize:14, fontWeight:600, color:i===meses.length-1?"#5DCAA5":"#6A6258" }}>{gorduraTargets[i]}%</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ display:"flex", gap:2, marginTop:8, height:6, borderRadius:3, overflow:"hidden" }}>
                        {meses.map((m,i) => (
                          <div key={m} style={{ flex:1, background:i===meses.length-1?"#5DCAA5":"rgba(196,106,106,"+(0.7 - i*0.1)+")", borderRadius:3 }} />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
              <div className="garmin-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:16 }}>
                {[
                  { label:"Peso", val:`${BODY_2026.peso} kg`, prev:BODY_2022.peso, curr:BODY_2026.peso, unit:"kg", color:"#BA7517" },
                  { label:"% Gordura", val:`${BODY_2026.gordura}%`, prev:BODY_2022.gordura, curr:BODY_2026.gordura, unit:"%", color:"#C46A6A" },
                  { label:"Massa Magra", val:`${BODY_2026.magra} kg`, prev:BODY_2022.magra, curr:BODY_2026.magra, unit:"kg", color:"#5DCAA5", up:true },
                  { label:"IMC", val:BODY_2026.imc.toString(), prev:BODY_2022.imc, curr:BODY_2026.imc, unit:"", color:"#378ADD" },
                  { label:"Cintura", val:`${BODY_2025.cintura} cm`, prev:BODY_2022.cintura, curr:BODY_2025.cintura, unit:"cm", color:"#8E5AC4" },
                  { label:"Abdômen", val:`${BODY_2025.abdomen} cm`, prev:BODY_2022.abdomen, curr:BODY_2025.abdomen, unit:"cm", color:"#D85A30" },
                ].map((m,i) => {
                  const diff = m.curr - m.prev;
                  const isGood = m.up ? diff > 0 : diff < 0;
                  return (
                    <div key={i} style={{ background:"rgba(255,255,255,0.65)", borderRadius:12, padding:"12px 14px", borderLeft:`3px solid ${m.color}` }}>
                      <div style={{ fontSize:10, color:"#9A9082", fontWeight:600, marginBottom:4 }}>{m.label}</div>
                      <div style={{ fontSize:20, fontWeight:700, color:"#2C2C2A" }}>{m.val}</div>
                      <div style={{ fontSize:10, color:isGood?"#5DCAA5":"#C46A6A", fontWeight:600, marginTop:2 }}>
                        {isGood?"↓":"↑"} {Math.abs(diff).toFixed(1)}{m.unit} desde 2022
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ background:"rgba(255,255,255,0.65)", borderRadius:14, padding:"14px 16px", marginBottom:16 }}>
                <div style={{ fontSize:10, fontWeight:700, color:"#9A9082", marginBottom:8 }}>COMPOSIÇÃO CORPORAL (mar/2026 — InBody)</div>
                <div style={{ display:"flex", borderRadius:8, overflow:"hidden", height:28, marginBottom:8 }}>
                  <div style={{ flex:100-BODY_2026.gordura, background:"#5DCAA5", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ fontSize:11, color:"#fff", fontWeight:700 }}>{(100-BODY_2026.gordura).toFixed(1)}% Magra</span>
                  </div>
                  <div style={{ flex:BODY_2026.gordura, background:"#C46A6A", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ fontSize:11, color:"#fff", fontWeight:700 }}>{BODY_2026.gordura}% Gordura</span>
                  </div>
                </div>
                <div style={{ display:"flex", gap:16, fontSize:11, color:"#6A6258" }}>
                  <span>Massa Magra: {BODY_2026.magra} kg</span>
                  <span>Músculo: {BODY_2026.musculo} kg</span>
                  <span>Gordura: {BODY_2026.gorduraKg} kg</span>
                </div>
              </div>
              <div style={{ background:"rgba(255,255,255,0.65)", borderRadius:14, padding:"14px 16px", marginBottom:16 }}>
                <div style={{ fontSize:10, fontWeight:700, color:"#9A9082", marginBottom:8 }}>CIRCUNFERÊNCIAS (cm)</div>
                <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
                  <thead>
                    <tr style={{ borderBottom:"1px solid rgba(44,44,42,0.1)" }}>
                      <th style={{ textAlign:"left", padding:"6px 0", color:"#9A9082", fontWeight:600, fontSize:10 }}>MEDIDA</th>
                      <th style={{ textAlign:"center", padding:"6px 0", color:"#9A9082", fontWeight:600, fontSize:10 }}>2022</th>
                      <th style={{ textAlign:"center", padding:"6px 0", color:"#9A9082", fontWeight:600, fontSize:10 }}>2025*</th>
                      <th style={{ textAlign:"center", padding:"6px 0", color:"#9A9082", fontWeight:600, fontSize:10 }}>VAR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label:"Cintura", v22:BODY_2022.cintura, v25:BODY_2025.cintura },
                      { label:"Abdômen", v22:BODY_2022.abdomen, v25:BODY_2025.abdomen },
                      { label:"Quadril", v22:BODY_2022.quadril, v25:BODY_2025.quadril },
                    ].map((r,i) => {
                      const diff = r.v25 - r.v22;
                      return (
                        <tr key={i} style={{ borderBottom:"1px solid rgba(44,44,42,0.05)" }}>
                          <td style={{ padding:"6px 0", color:"#2C2C2A" }}>{r.label}</td>
                          <td style={{ textAlign:"center", color:"#9A9082" }}>{r.v22}</td>
                          <td style={{ textAlign:"center", fontWeight:600, color:"#2C2C2A" }}>{r.v25}</td>
                          <td style={{ textAlign:"center", color:diff<0?"#5DCAA5":"#C46A6A", fontWeight:600 }}>{diff>0?"+":""}{diff}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div style={{ fontSize:10, color:"#9A9082", marginTop:6 }}>* Circunferências de 2025. InBody 2026 não inclui medidas de fita.</div>
              </div>
              {/* ── INBODY 2026 EXTRAS ── */}
              <div style={{ background:"rgba(255,255,255,0.65)", borderRadius:14, padding:"14px 16px", marginBottom:16 }}>
                <div style={{ fontSize:10, fontWeight:700, color:"#9A9082", marginBottom:10 }}>DADOS INBODY — 31/03/2026</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
                  {[
                    { label:"Água Corporal", val:`${BODY_2026.agua} kg`, color:"#378ADD" },
                    { label:"RCQ", val:BODY_2026.rcq.toString(), color:"#8E5AC4" },
                    { label:"TMB", val:`${BODY_2026.tmb} kcal`, color:"#E8845A" },
                    { label:"Meta Gordura", val:`${BODY_2026.metaGordura} kg`, color:"#C46A6A" },
                    { label:"Kcal/dia", val:`${BODY_2026.kcalDia} kcal`, color:"#5DCAA5" },
                    { label:"IMC", val:BODY_2026.imc.toString(), color:"#BA7517" },
                  ].map((m,i) => (
                    <div key={i} style={{ background:"rgba(255,255,255,0.7)", borderRadius:10, padding:"10px 12px", borderLeft:`3px solid ${m.color}` }}>
                      <div style={{ fontSize:9, color:"#9A9082", fontWeight:600, marginBottom:3 }}>{m.label}</div>
                      <div style={{ fontSize:15, fontWeight:700, color:"#2C2C2A" }}>{m.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ════ SAUDE > PROFISSIONAIS ════ */}
          {mainTab==="saude" && activeSubTab==="profissionais" && (
            <div className="panel-content" style={{ padding:0 }}>
              <div style={{ marginBottom:14 }}>
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:"#2C2C2A", marginBottom:2 }}>Profissionais de Saúde</h2>
                <p style={{ fontSize:11, color:"#9A9082" }}>Equipe multidisciplinar</p>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))", gap:10 }}>
                {PROFISSIONAIS.map((p,i) => (
                  <div key={i} style={{ background:"rgba(255,255,255,0.65)", borderRadius:14, padding:"16px 18px", display:"flex", alignItems:"center", gap:14, border:"1px solid rgba(44,44,42,0.07)" }}>
                    <div style={{ width:44, height:44, borderRadius:12, background:"rgba(90,196,142,0.12)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{p.emoji}</div>
                    <div>
                      <div style={{ fontSize:14, fontWeight:600, color:"#2C2C2A" }}>{p.nome}</div>
                      <div style={{ fontSize:12, color:"#5AC48E", fontWeight:500 }}>{p.cargo}</div>
                      {p.registro && <div style={{ fontSize:10, color:"#9A9082" }}>{p.registro}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════ SAUDE > REVISÃO SEMANAL (Phase 2) ════ */}
          {(mainTab==="revisao" || (mainTab==="saude" && activeSubTab==="revisao")) && (
            <div className="panel-content" style={{ padding:0 }}>
              <div style={{ marginBottom:16 }}>
                <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:17, color:"#2C2C2A", marginBottom:2 }}>Revisão Semanal</h2>
                <p style={{ fontSize:11, color:"#9A9082" }}>GTD: "revisão é o fator crítico de sucesso" · ~10 minutos · todo sábado</p>
              </div>

              {reviewDone ? (
                <div>
                  <div style={{ background:"linear-gradient(135deg,rgba(93,202,165,0.12),rgba(93,202,165,0.04))", borderRadius:16, padding:"20px", marginBottom:16, border:"1.5px solid rgba(93,202,165,0.25)" }}>
                    <div style={{ fontSize:22, marginBottom:8 }}>🎉</div>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:17, color:"#2C2C2A", marginBottom:12 }}>Semana revisada com clareza!</div>
                    {reviewAI && <p style={{ fontSize:13, color:"#3C5A4E", lineHeight:1.7, whiteSpace:"pre-wrap" }}>{reviewAI}</p>}
                  </div>
                  <button onClick={()=>{setReviewStep(0);setReviewNotes({});setReviewAI("");setReviewDone(false);}} style={{ background:"rgba(44,44,42,0.07)", color:"#2C2C2A", border:"none", borderRadius:9, padding:"8px 16px", cursor:"pointer", fontSize:12, fontWeight:600, fontFamily:"'DM Sans',sans-serif" }}>Iniciar nova revisão</button>
                </div>
              ) : (
                <div>
                  {/* Progress steps */}
                  <div style={{ display:"flex", gap:4, marginBottom:20, overflowX:"auto", paddingBottom:4 }}>
                    {REVIEW_STEPS.map((s,i)=>(
                      <div key={s.id} style={{ display:"flex", alignItems:"center", gap:4, flexShrink:0 }}>
                        <div style={{ width:28, height:28, borderRadius:"50%", background:i<reviewStep?"#5DCAA5":i===reviewStep?"#2C2C2A":"rgba(44,44,42,0.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:i<reviewStep?14:11, color:i<=reviewStep?"#fff":"#9A9082", transition:"all 0.3s", fontWeight:700 }}>
                          {i<reviewStep?"✓":s.icon}
                        </div>
                        {i<REVIEW_STEPS.length-1&&<div style={{ width:20, height:2, background:i<reviewStep?"#5DCAA5":"rgba(44,44,42,0.1)", borderRadius:1, transition:"background 0.3s" }}/>}
                      </div>
                    ))}
                  </div>

                  {/* Current step */}
                  {(()=>{
                    const step = REVIEW_STEPS[reviewStep];
                    return (
                      <div className="step-card" style={{ background:"rgba(255,255,255,0.7)", borderRadius:16, padding:"20px", marginBottom:14, boxShadow:"0 2px 12px rgba(44,44,42,0.06)" }}>
                        <div style={{ fontSize:28, marginBottom:8 }}>{step.icon}</div>
                        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:18, color:"#2C2C2A", marginBottom:6 }}>{step.title}</div>
                        <div style={{ fontSize:13, color:"#6A6258", lineHeight:1.6, marginBottom:14 }}>{step.desc}</div>

                        {/* Step-specific content */}
                        {reviewStep===0 && (
                          <div>
                            {pendingCaptures.length===0 ? (
                              <div style={{ fontSize:13, color:"#5DCAA5", fontWeight:600 }}>✓ Inbox limpo! Nada pendente.</div>
                            ) : (
                              pendingCaptures.slice(0,5).map(cap => { const u=CAPTURE_URGENCY.find(x=>x.key===cap.urgency)||CAPTURE_URGENCY[1]; return (
                                <div key={cap.id} className="hov" style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 10px", borderRadius:9, marginBottom:4, background:"rgba(255,255,255,0.65)" }}>
                                  <div onClick={()=>toggleCapture(cap.id)} style={{ width:17, height:17, borderRadius:5, border:"2px solid #D0C8BC", background:"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, cursor:"pointer" }}>
                                    <span style={{ color:"#fff", fontSize:10 }}></span>
                                  </div>
                                  <span style={{ flex:1, fontSize:12, color:"#2C2C2A" }}>{cap.text}</span>
                                  <span style={{ fontSize:10, color:u.color, padding:"2px 7px", background:u.bg, borderRadius:5 }}>{u.label}</span>
                                </div>
                              ); })
                            )}
                          </div>
                        )}
                        {reviewStep===1 && (
                          <div style={{ background:`${PRIORITY_COLORS.find(p=>p.key===priority.area)?.color||"#7C9E8E"}10`, borderRadius:12, padding:"14px" }}>
                            {priority.saved && priority.text ? (
                              <div>
                                <div style={{ fontSize:15, fontFamily:"'Playfair Display',serif", color:"#2C2C2A", marginBottom:8 }}>{priority.text}</div>
                                <textarea value={reviewNotes.priority||""} onChange={e=>setReviewNotes(p=>({...p,priority:e.target.value}))} placeholder="Foi cumprida? O que ficou pendente? O que aprendeu?" rows={3} style={{ ...inputSt(), width:"100%", resize:"none", lineHeight:1.5 }}/>
                              </div>
                            ) : (
                              <div style={{ fontSize:13, color:"#9A9082" }}>Nenhuma prioridade definida esta semana.</div>
                            )}
                          </div>
                        )}
                        {reviewStep===2 && (
                          <div style={{ display:"grid", gridTemplateColumns:"auto 1fr", gap:10, alignItems:"center" }}>
                            <RadarChart scores={wheelScores} size={130} compact={true}/>
                            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                              {WHEEL_AREAS.slice(0,4).map(w=>(
                                <div key={w.key} style={{ display:"flex", alignItems:"center", gap:8 }}>
                                  <span style={{ fontSize:12 }}>{w.emoji}</span>
                                  <span style={{ fontSize:11, flex:1, color:"#2C2C2A" }}>{w.label}</span>
                                  <input type="range" min="1" max="10" step="1" value={wheelScores[w.key]} onChange={e=>updateScore(w.key,e.target.value)} style={{ width:80, color:w.color }}/>
                                  <span style={{ fontSize:11, fontWeight:700, color:w.color, minWidth:14 }}>{wheelScores[w.key]}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {reviewStep===3 && (
                          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                            {habits.map(h => { const hpct=habitWeekPct(h.id); const s=streak(h.id); return (
                              <div key={h.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", background:`${h.color}08`, borderRadius:10 }}>
                                <span style={{ fontSize:16 }}>{h.emoji}</span>
                                <span style={{ flex:1, fontSize:13, color:"#2C2C2A" }}>{h.name}</span>
                                {s>=2 && <span>🔥 {s}d</span>}
                                <div style={{ width:60, height:5, background:"rgba(44,44,42,0.08)", borderRadius:3 }}><div style={{ height:"100%", width:`${hpct}%`, background:h.color, borderRadius:3 }}/></div>
                                <span style={{ fontSize:12, fontWeight:700, color:h.color, minWidth:32 }}>{hpct}%</span>
                              </div>
                            ); })}
                          </div>
                        )}
                        {reviewStep===4 && (
                          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                            <textarea value={reviewNotes.nextPriority||""} onChange={e=>setReviewNotes(p=>({...p,nextPriority:e.target.value}))} placeholder='Uma coisa só — "o que torna tudo o resto mais fácil?"...' rows={3} style={{ ...inputSt(), width:"100%", resize:"none", fontSize:13, lineHeight:1.5 }}/>
                            <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                              {PRIORITY_COLORS.map(pa=><button key={pa.key} onClick={()=>savePriority({text:reviewNotes.nextPriority||"",area:pa.key,note:"",saved:!!(reviewNotes.nextPriority?.trim())})} style={{ fontSize:11, padding:"5px 10px", border:"none", borderRadius:7, background:`${pa.color}15`, color:pa.color, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>{pa.label}</button>)}
                            </div>
                          </div>
                        )}
                        {reviewStep===5 && (
                          <div>
                            {reviewLoading ? (
                              <div style={{ textAlign:"center", padding:"20px" }}>
                                <div style={{ fontSize:13, color:"#7C9E8E", fontWeight:600, marginBottom:10 }}>Analisando sua semana com IA...</div>
                                <div style={{ display:"flex", justifyContent:"center", gap:6 }}>{["d1","d2","d3"].map(c=><div key={c} className={c} style={{ width:9, height:9, background:"#7C9E8E", borderRadius:"50%" }}/>)}</div>
                              </div>
                            ) : reviewAI ? (
                              <div>
                                <div style={{ background:"rgba(93,202,165,0.08)", borderRadius:12, padding:"14px", marginBottom:10, border:"1px solid rgba(93,202,165,0.2)" }}>
                                  <p style={{ fontSize:13, color:"#3C5A4E", lineHeight:1.7, whiteSpace:"pre-wrap" }}>{reviewAI}</p>
                                </div>
                              </div>
                            ) : (
                              <button onClick={runReviewAI} style={{ background:"#7C9E8E", color:"#fff", border:"none", borderRadius:10, padding:"10px 20px", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"'DM Sans',sans-serif" }}>✨ Gerar análise com IA</button>
                            )}
                          </div>
                        )}

                        <div style={{ display:"flex", justifyContent:"space-between", marginTop:16 }}>
                          <button onClick={()=>reviewStep>0&&setReviewStep(p=>p-1)} style={{ background:"rgba(44,44,42,0.07)", color:"#5A5248", border:"none", borderRadius:9, padding:"8px 14px", cursor:reviewStep>0?"pointer":"default", fontSize:12, fontFamily:"'DM Sans',sans-serif", opacity:reviewStep>0?1:0 }}>← Voltar</button>
                          {reviewStep<REVIEW_STEPS.length-1 ? (
                            <button onClick={()=>setReviewStep(p=>p+1)} style={{ background:"#2C2C2A", color:"#F5EED8", border:"none", borderRadius:9, padding:"8px 16px", cursor:"pointer", fontSize:12, fontWeight:600, fontFamily:"'DM Sans',sans-serif" }}>{step.action} →</button>
                          ) : (
                            <button onClick={finishReview} disabled={!reviewAI} style={{ background:"#5DCAA5", color:"#fff", border:"none", borderRadius:9, padding:"8px 16px", cursor:reviewAI?"pointer":"not-allowed", fontSize:12, fontWeight:600, fontFamily:"'DM Sans',sans-serif", opacity:reviewAI?1:0.5 }}>✓ Finalizar semana</button>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {/* ════ ESTUDOS (Multi-curso) ════ */}
          {mainTab === "estudos" && (
            <div style={{ padding:0 }}>
              {/* Course selector bar */}
              <div style={{ display:"flex", gap:6, overflowX:"auto", paddingBottom:8, marginBottom:10, WebkitOverflowScrolling:"touch" }}>
                {cursos.map(c => (
                  <button key={c.id} onClick={()=>setCursoAtivo(c.id)} style={{ display:"flex", alignItems:"center", gap:4, padding:"6px 12px", borderRadius:20, border: cursoAtivo===c.id ? `2px solid ${c.cor||"#BA7517"}` : "1.5px solid rgba(44,44,42,0.12)", background: cursoAtivo===c.id ? `${c.cor||"#BA7517"}15` : "rgba(255,255,255,0.7)", cursor:"pointer", whiteSpace:"nowrap", fontSize:12, fontWeight: cursoAtivo===c.id ? 700 : 500, color: cursoAtivo===c.id ? (c.cor||"#BA7517") : "#5A5248", fontFamily:"'DM Sans',sans-serif", flexShrink:0 }}>
                    <span>{c.emoji||"\u{1F4DA}"}</span> {c.nome.length > 25 ? c.nome.slice(0,25)+"..." : c.nome}
                    {c.id !== "mba" && cursoAtivo===c.id && (
                      <span onClick={(e)=>{e.stopPropagation();removeCurso(c.id);}} style={{ marginLeft:4, fontSize:10, color:"#C4A882", cursor:"pointer" }}>x</span>
                    )}
                  </button>
                ))}
                <button onClick={()=>setShowAddCurso(true)} style={{ display:"flex", alignItems:"center", gap:2, padding:"6px 12px", borderRadius:20, border:"1.5px dashed rgba(44,44,42,0.2)", background:"transparent", cursor:"pointer", fontSize:12, color:"#9A9082", fontFamily:"'DM Sans',sans-serif", flexShrink:0 }}>+ Curso</button>
              </div>

              {/* Add curso modal */}
              {showAddCurso && (
                <div style={{ background:"rgba(255,255,255,0.95)", borderRadius:14, padding:"14px 16px", marginBottom:14, border:"1.5px solid rgba(186,117,23,0.2)", boxShadow:"0 2px 8px rgba(44,44,42,0.08)" }}>
                  <div style={{ fontSize:10, fontWeight:700, color:"#BA7517", textTransform:"uppercase", letterSpacing:"0.6px", marginBottom:8 }}>Novo curso</div>
                  <div style={{ display:"flex", gap:6, marginBottom:8, flexWrap:"wrap" }}>
                    <input value={newCurso.emoji} onChange={e=>setNewCurso(p=>({...p,emoji:e.target.value}))} placeholder="Emoji" style={{ width:44, border:"1.5px solid rgba(44,44,42,0.12)", borderRadius:9, padding:"7px 8px", fontSize:16, textAlign:"center", background:"rgba(255,255,255,0.85)" }} />
                    <input value={newCurso.nome} onChange={e=>setNewCurso(p=>({...p,nome:e.target.value}))} placeholder="Nome do curso (ex: PMP, Scrum Master...)" style={{ flex:1, minWidth:180, border:"1.5px solid rgba(44,44,42,0.12)", borderRadius:9, padding:"7px 10px", fontSize:12, fontFamily:"'DM Sans',sans-serif", background:"rgba(255,255,255,0.85)", color:"#2C2C2A" }} />
                    <input type="color" value={newCurso.cor} onChange={e=>setNewCurso(p=>({...p,cor:e.target.value}))} style={{ width:36, height:34, border:"1.5px solid rgba(44,44,42,0.12)", borderRadius:9, padding:2, cursor:"pointer", background:"rgba(255,255,255,0.85)" }} />
                  </div>
                  <div style={{ display:"flex", gap:6 }}>
                    <button onClick={addCurso} disabled={!newCurso.nome.trim()} style={{ background:"#2C2C2A", color:"#F5EED8", border:"none", borderRadius:9, padding:"7px 16px", cursor:"pointer", fontSize:12, fontWeight:600, fontFamily:"'DM Sans',sans-serif", opacity:newCurso.nome.trim()?1:0.5 }}>Adicionar</button>
                    <button onClick={()=>setShowAddCurso(false)} style={{ background:"transparent", color:"#9A9082", border:"1.5px solid rgba(44,44,42,0.12)", borderRadius:9, padding:"7px 16px", cursor:"pointer", fontSize:12, fontFamily:"'DM Sans',sans-serif" }}>Cancelar</button>
                  </div>
                </div>
              )}

              {/* Course title */}
              {(() => {
                const curso = cursos.find(c=>c.id===cursoAtivo);
                return curso && (
                  <div style={{ marginBottom:10 }}>
                    <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:17, color:"#2C2C2A", marginBottom:2 }}>{curso.emoji} {curso.nome}</h2>
                    <p style={{ fontSize:11, color:"#9A9082" }}>{(aulas[cursoAtivo]||[]).length} aulas | {(diarioEntries[cursoAtivo]||[]).length} aprendizados</p>
                  </div>
                );
              })()}

              {/* Aulas / Diario toggle */}
              <div style={{ display:"flex", gap:0, marginBottom:14, background:"rgba(44,44,42,0.04)", borderRadius:10, padding:3 }}>
                {["aulas","diario"].map(v => (
                  <button key={v} onClick={()=>setEstudosView(v)} style={{ flex:1, padding:"7px 0", borderRadius:8, border:"none", background: estudosView===v ? "#fff" : "transparent", color: estudosView===v ? "#2C2C2A" : "#9A9082", fontSize:12, fontWeight: estudosView===v ? 700 : 500, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", boxShadow: estudosView===v ? "0 1px 3px rgba(44,44,42,0.08)" : "none", transition:"all 0.15s" }}>
                    {v === "aulas" ? "Aulas" : "Diario"}
                  </button>
                ))}
              </div>

              {/* ── AULAS VIEW ── */}
              {estudosView === "aulas" && (
                <div>
                  {/* Add aula */}
                  <div style={{ background:"rgba(255,255,255,0.7)", borderRadius:14, padding:"14px 16px", marginBottom:14, border:"1.5px solid rgba(44,44,42,0.08)" }}>
                    <div style={{ fontSize:10, fontWeight:700, color:"#9A9082", textTransform:"uppercase", letterSpacing:"0.6px", marginBottom:8 }}>Registrar aula</div>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:8 }}>
                      <input value={newAula.modulo} onChange={e=>setNewAula(p=>({...p,modulo:e.target.value}))} placeholder="Modulo (ex: Scrum, PMBOK...)" style={{ border:"1.5px solid rgba(44,44,42,0.12)", borderRadius:9, padding:"7px 10px", fontSize:12, fontFamily:"'DM Sans',sans-serif", background:"rgba(255,255,255,0.85)", color:"#2C2C2A", flex:1, minWidth:120 }} />
                      <input value={newAula.titulo} onChange={e=>setNewAula(p=>({...p,titulo:e.target.value}))} placeholder="Titulo da aula" style={{ border:"1.5px solid rgba(44,44,42,0.12)", borderRadius:9, padding:"7px 10px", fontSize:12, fontFamily:"'DM Sans',sans-serif", background:"rgba(255,255,255,0.85)", color:"#2C2C2A", flex:2, minWidth:160 }} />
                      <input type="date" value={newAula.data} onChange={e=>setNewAula(p=>({...p,data:e.target.value}))} style={{ border:"1.5px solid rgba(44,44,42,0.12)", borderRadius:9, padding:"7px 10px", fontSize:12, fontFamily:"'DM Sans',sans-serif", background:"rgba(255,255,255,0.85)", color:"#2C2C2A" }} />
                    </div>
                    <textarea value={newAula.notas} onChange={e=>setNewAula(p=>({...p,notas:e.target.value}))} placeholder="Notas da aula, pontos principais..." rows={3} style={{ width:"100%", resize:"none", border:"1.5px solid rgba(44,44,42,0.12)", borderRadius:9, padding:"7px 10px", fontSize:12, fontFamily:"'DM Sans',sans-serif", background:"rgba(255,255,255,0.85)", color:"#2C2C2A", lineHeight:1.5, marginBottom:8 }} />
                    <button onClick={addAula} disabled={!newAula.titulo.trim()} style={{ background:"#2C2C2A", color:"#F5EED8", border:"none", borderRadius:9, padding:"7px 16px", cursor:"pointer", fontSize:12, fontWeight:600, fontFamily:"'DM Sans',sans-serif", opacity:newAula.titulo.trim()?1:0.5 }}>Salvar aula</button>
                  </div>

                  {/* Aulas list */}
                  {(aulas[cursoAtivo]||[]).length === 0 ? (
                    <div style={{ textAlign:"center", padding:"40px 20px", color:"#C9BFA8" }}>
                      <div style={{ fontSize:28, marginBottom:8 }}>{(cursos.find(c=>c.id===cursoAtivo)||{}).emoji||"\u{1F4DA}"}</div>
                      <div style={{ fontSize:14, fontWeight:600, color:"#5A5248", marginBottom:4 }}>Nenhuma aula registrada</div>
                      <p style={{ fontSize:12 }}>Registre suas aulas aqui.</p>
                    </div>
                  ) : (
                    (() => {
                      const cursoAulas = aulas[cursoAtivo]||[];
                      const cursoObj = cursos.find(c=>c.id===cursoAtivo)||{cor:"#BA7517"};
                      const modulos = [...new Set(cursoAulas.map(a => a.modulo || "Geral"))];
                      return modulos.map(mod => (
                        <div key={mod} style={{ marginBottom:14 }}>
                          <div style={{ fontSize:11, fontWeight:700, color:cursoObj.cor||"#BA7517", textTransform:"uppercase", letterSpacing:"0.6px", marginBottom:8, display:"flex", alignItems:"center", gap:6 }}>
                            <div style={{ width:8, height:8, borderRadius:2, background:cursoObj.cor||"#BA7517" }} />
                            {mod} ({cursoAulas.filter(a=>(a.modulo||"Geral")===mod).length} aulas)
                          </div>
                          {cursoAulas.filter(a => (a.modulo||"Geral") === mod).map(aula => (
                            <div key={aula.id} style={{ background:"rgba(255,255,255,0.7)", borderRadius:12, padding:"12px 14px", marginBottom:6, borderLeft:`3px solid ${cursoObj.cor||"#BA7517"}`, boxShadow:"0 1px 4px rgba(44,44,42,0.04)" }}>
                              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                                <div>
                                  <div style={{ fontSize:14, fontWeight:600, color:"#2C2C2A" }}>{aula.titulo}</div>
                                  {aula.data && <div style={{ fontSize:11, color:"#9A9082", marginTop:2 }}>{new Date(aula.data).toLocaleDateString("pt-BR")}</div>}
                                </div>
                                <button onClick={()=>removeAula(aula.id)} style={{ background:"none", border:"none", cursor:"pointer", color:"#C4A882", fontSize:14 }}>x</button>
                              </div>
                              {aula.notas && <div style={{ fontSize:12, color:"#5A5248", marginTop:8, lineHeight:1.6, whiteSpace:"pre-wrap", background:`${cursoObj.cor||"#BA7517"}0A`, borderRadius:8, padding:"8px 10px" }}>{aula.notas}</div>}
                            </div>
                          ))}
                        </div>
                      ));
                    })()
                  )}
                </div>
              )}

              {/* ── DIARIO VIEW ── */}
              {estudosView === "diario" && (
                <div>
                  {/* Add entry */}
                  <div style={{ background:"rgba(255,255,255,0.7)", borderRadius:14, padding:"14px 16px", marginBottom:14, border:"1.5px solid rgba(44,44,42,0.08)" }}>
                    <input value={newDiario.titulo} onChange={e=>setNewDiario(p=>({...p,titulo:e.target.value}))} placeholder="Titulo (opcional)" style={{ width:"100%", border:"1.5px solid rgba(44,44,42,0.12)", borderRadius:9, padding:"7px 10px", fontSize:13, fontFamily:"'DM Sans',sans-serif", background:"rgba(255,255,255,0.85)", color:"#2C2C2A", marginBottom:8 }} />
                    <textarea value={newDiario.conteudo} onChange={e=>setNewDiario(p=>({...p,conteudo:e.target.value}))} placeholder="O que aprendi hoje? Qual insight mais importante? Como aplico isso?" rows={4} style={{ width:"100%", resize:"none", border:"1.5px solid rgba(44,44,42,0.12)", borderRadius:9, padding:"7px 10px", fontSize:12, fontFamily:"'DM Sans',sans-serif", background:"rgba(255,255,255,0.85)", color:"#2C2C2A", lineHeight:1.6, marginBottom:8 }} />
                    <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                      <input value={newDiario.tags} onChange={e=>setNewDiario(p=>({...p,tags:e.target.value}))} placeholder="Tags: scrum, lideranca, agile..." style={{ flex:1, border:"1.5px solid rgba(44,44,42,0.12)", borderRadius:9, padding:"7px 10px", fontSize:11, fontFamily:"'DM Sans',sans-serif", background:"rgba(255,255,255,0.85)", color:"#2C2C2A" }} />
                      <button onClick={addDiario} disabled={!newDiario.conteudo.trim()} style={{ background:((cursos.find(c=>c.id===cursoAtivo)||{}).cor)||"#BA7517", color:"#fff", border:"none", borderRadius:9, padding:"7px 16px", cursor:"pointer", fontSize:12, fontWeight:600, fontFamily:"'DM Sans',sans-serif", opacity:newDiario.conteudo.trim()?1:0.5 }}>Salvar</button>
                    </div>
                  </div>

                  {/* Entries */}
                  {(diarioEntries[cursoAtivo]||[]).length === 0 ? (
                    <div style={{ textAlign:"center", padding:"40px 20px", color:"#C9BFA8" }}>
                      <div style={{ fontSize:28, marginBottom:8 }}>{(cursos.find(c=>c.id===cursoAtivo)||{}).emoji||"\u{1F4DD}"}</div>
                      <div style={{ fontSize:14, fontWeight:600, color:"#5A5248", marginBottom:4 }}>Nenhum aprendizado registrado</div>
                      <p style={{ fontSize:12 }}>Apos cada aula, registre o que mais impactou voce.</p>
                    </div>
                  ) : (
                    (diarioEntries[cursoAtivo]||[]).map(entry => {
                      const cursoObj = cursos.find(c=>c.id===cursoAtivo)||{cor:"#BA7517"};
                      return (
                        <div key={entry.id} style={{ background:"rgba(255,255,255,0.7)", borderRadius:12, padding:"14px 16px", marginBottom:8, borderLeft:`3px solid ${cursoObj.cor||"#BA7517"}` }}>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                            <div>
                              {entry.titulo && <div style={{ fontSize:14, fontWeight:600, color:"#2C2C2A", marginBottom:4 }}>{entry.titulo}</div>}
                              <div style={{ fontSize:10, color:"#9A9082" }}>{new Date(entry.data).toLocaleDateString("pt-BR",{day:"2-digit",month:"short",year:"numeric"})} {new Date(entry.data).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</div>
                            </div>
                            <button onClick={()=>removeDiario(entry.id)} style={{ background:"none", border:"none", cursor:"pointer", color:"#C4A882", fontSize:14 }}>x</button>
                          </div>
                          <div style={{ fontSize:13, color:"#2C2C2A", marginTop:8, lineHeight:1.7, whiteSpace:"pre-wrap" }}>{entry.conteudo}</div>
                          {entry.tags && (
                            <div style={{ marginTop:8, display:"flex", gap:4, flexWrap:"wrap" }}>
                              {entry.tags.split(",").map((tag,i) => (
                                <span key={i} style={{ fontSize:10, padding:"2px 8px", borderRadius:12, background:`${cursoObj.cor||"#BA7517"}1A`, color:cursoObj.cor||"#BA7517", fontWeight:500 }}>{tag.trim()}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}

                  {/* Stats */}
                  {(diarioEntries[cursoAtivo]||[]).length > 0 && (
                    <div style={{ marginTop:12, padding:"10px 14px", background:`${((cursos.find(c=>c.id===cursoAtivo)||{}).cor)||"#BA7517"}0F`, borderRadius:10, border:`1px solid ${((cursos.find(c=>c.id===cursoAtivo)||{}).cor)||"#BA7517"}26` }}>
                      <div style={{ fontSize:11, color:((cursos.find(c=>c.id===cursoAtivo)||{}).cor)||"#BA7517", fontWeight:600 }}>{(diarioEntries[cursoAtivo]||[]).length} aprendizado{(diarioEntries[cursoAtivo]||[]).length>1?"s":""} registrado{(diarioEntries[cursoAtivo]||[]).length>1?"s":""}</div>
                      {(() => {
                        const allTags = (diarioEntries[cursoAtivo]||[]).flatMap(e => (e.tags||"").split(",").map(t=>t.trim()).filter(Boolean));
                        const unique = [...new Set(allTags)];
                        return unique.length > 0 && <div style={{ fontSize:10, color:"#9A9082", marginTop:4 }}>Tags: {unique.join(", ")}</div>;
                      })()}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>
        </div>

        {/* ── Bottom Navigation Bar ── */}
        <div className="bottom-nav">
          {MAIN_TABS.map(({id,label,icon}) => (
            <button key={id} style={bottomNavItemSt(id)} onClick={()=>{setMainTab(id);setSubTab("");}}>
              <span style={{ fontSize:20, lineHeight:1 }}>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>

      </div>
    </>
  );
}
