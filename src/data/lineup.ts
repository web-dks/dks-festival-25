// Dados mockados do lineup - preparado para futura integração com API
export interface LineupItem {
  id: string;
  title: string;
  since: string; // formato: "2025-12-19T09:00:00"
  till: string;  // formato: "2025-12-19T10:30:00"
  category: 'Talk' | 'Coffee' | 'Transição' | 'Retrospectiva' | 'Bar' | 'Quiz' | 'Samba' | 'DJ' | 'Banda' | 'Encerramento';
  description?: string;
  image?: string;
  stage: 'horta' | 'palco';
}

export interface EventInfo {
  name: string;
  date: string;
  dayOfWeek: string;
  location: string;
  address?: string;
}

export interface StageInfo {
  id: 'horta' | 'palco';
  name: string;
  subtitle?: string;
}

export const stages: StageInfo[] = [
  {
    id: 'horta',
    name: 'ESPAÇO HORTA',
    subtitle: ''
  },
  {
    id: 'palco',
    name: 'PALCO PRINCIPAL',
    subtitle: ''
  }
];

export const eventInfo: EventInfo = {
  name: "DKS Festival 25",
  date: "19/12/2025",
  dayOfWeek: "Sexta-feira",
  location: "Parque Burle Marx",
  address: "Av. Dona Helena Pereira de Moraes, 200 - São Paulo"
};

export const lineupData: LineupItem[] = [
  // ===== ESPAÇO HORTA =====
  {
    id: "h1",
    title: "WELCOME COFFEE",
    since: "2025-12-19T09:00:00",
    till: "2025-12-19T10:00:00",
    category: "Coffee",
    description: "Recepção e café de boas-vindas",
    stage: "horta"
  },
  {
    id: "h2",
    title: "TALK DKS",
    since: "2025-12-19T09:30:00",
    till: "2025-12-19T11:10:00",
    category: "Talk",
    description: "Palestras e conversas inspiradoras",
    stage: "horta"
  },
  {
    id: "h3",
    title: "MUDANÇA DE AMBIENTE",
    since: "2025-12-19T11:10:00",
    till: "2025-12-19T11:30:00",
    category: "Transição",
    description: "Transição para o Palco Principal",
    stage: "horta"
  },

  // ===== PALCO PRINCIPAL =====
  {
    id: "p1",
    title: "RETROSPECTIVA",
    since: "2025-12-19T11:30:00",
    till: "2025-12-19T12:00:00",
    category: "Retrospectiva",
    description: "Retrospectiva DKS 2025",
    stage: "palco"
  },
  {
    id: "p1b",
    title: "ABERTURA DO BAR",
    since: "2025-12-19T12:00:00",
    till: "2025-12-19T12:15:00",
    category: "Bar",
    description: "Bar e buffet liberados",
    stage: "palco"
  },
  {
    id: "p2",
    title: "QUIZ DKS",
    since: "2025-12-19T12:15:00",
    till: "2025-12-19T13:00:00",
    category: "Quiz",
    description: "Quiz interativo com premiação",
    stage: "palco"
  },
  {
    id: "p3",
    title: "SAMBA DO AGUIDA",
    since: "2025-12-19T13:00:00",
    till: "2025-12-19T14:30:00",
    category: "Samba",
    description: "Samba ao vivo",
    stage: "palco"
  },
  {
    id: "p4",
    title: "DJ RAFINITY",
    since: "2025-12-19T14:30:00",
    till: "2025-12-19T15:30:00",
    category: "DJ",
    description: "Set especial",
    stage: "palco"
  },
  {
    id: "p5",
    title: "BANDA ALMANACK",
    since: "2025-12-19T15:30:00",
    till: "2025-12-19T17:30:00",
    category: "Banda",
    description: "Show de rock ao vivo",
    stage: "palco"
  },
  {
    id: "p6",
    title: "ENCERRAMENTO",
    since: "2025-12-19T17:30:00",
    till: "2025-12-19T17:30:00",
    category: "Encerramento",
    description: "Encerramento oficial do DKS Festival 25",
    stage: "palco"
  }
];

// Funções auxiliares
export const getLineupByStage = (stageId: 'horta' | 'palco'): LineupItem[] => {
  return lineupData.filter(item => item.stage === stageId);
};

export const getStageTimeRange = (stageId: 'horta' | 'palco'): string => {
  const items = getLineupByStage(stageId);
  if (items.length === 0) return '';
  
  const firstItem = items[0];
  const lastItem = items[items.length - 1];
  
  const start = new Date(firstItem.since);
  const end = new Date(lastItem.till);
  
  const formatTime = (date: Date) => date.toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false 
  });
  
  return `${formatTime(start)} — ${formatTime(end)}`;
};
