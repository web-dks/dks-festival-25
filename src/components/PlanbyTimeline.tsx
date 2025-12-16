import { useEpg, Epg, Layout, ProgramItem, ChannelItem } from 'planby';
import { useMemo } from 'react';
import { getChannels, getEpg } from '../data/lineup';
import { theme } from '../styles/theme';
import './PlanbyTimeline.css';

// Componente customizado para renderizar cada programa
interface CustomProgramProps {
  program: {
    data: {
      id: string;
      title: string;
      since: string;
      till: string;
      category?: string;
      description?: string;
    };
    position: {
      width: number;
      height: number;
      top: number;
      left: number;
    };
  };
}

const CustomProgram = ({ program }: CustomProgramProps) => {
  const { data, position } = program;
  const { width, height, top, left } = position;
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getCategoryClass = (category?: string) => {
    switch (category) {
      case 'DJ': return 'cat-dj';
      case 'Banda': return 'cat-banda';
      case 'Atração Especial': return 'cat-especial';
      case 'Abertura': return 'cat-abertura';
      case 'Encerramento': return 'cat-encerramento';
      default: return '';
    }
  };

  return (
    <ProgramItem 
      width={width} 
      style={{ 
        position: 'absolute',
        width,
        height,
        top,
        left,
        padding: 0,
      }}
    >
      <div className={`planby-program ${getCategoryClass(data.category)}`}>
        <div className="program-time">
          {formatTime(data.since)} — {formatTime(data.till)}
        </div>
        {data.category && (
          <span className={`program-category ${getCategoryClass(data.category)}`}>
            {data.category.toUpperCase()}
          </span>
        )}
        <h3 className="program-title">{data.title}</h3>
        {data.description && (
          <p className="program-description">{data.description}</p>
        )}
      </div>
    </ProgramItem>
  );
};

// Componente customizado para renderizar o canal (oculto neste caso)
const CustomChannel = ({ channel }: { channel: ChannelItem }) => {
  return (
    <div className="planby-channel" style={{ display: 'none' }}>
      {channel.title}
    </div>
  );
};

export function PlanbyTimeline() {
  const channels = useMemo(() => getChannels(), []);
  const epg = useMemo(() => getEpg(), []);
  
  // Configuração do Planby com tema customizado
  const { getEpgProps, getLayoutProps } = useEpg({
    channels,
    epg,
    dayWidth: 800,
    sidebarWidth: 0,
    itemHeight: 120,
    isSidebar: false,
    isTimeline: true,
    isLine: true,
    startDate: '2025-12-19T09:00:00',
    endDate: '2025-12-19T22:00:00',
    theme: theme as any,
  });

  return (
    <section className="planby-section">
      <div className="planby-header">
        <h2 className="planby-title">LINEUP</h2>
        <p className="planby-subtitle">PALCO PRINCIPAL • SEXTA 19/12</p>
      </div>
      
      <div className="planby-wrapper">
        <Epg {...getEpgProps()}>
          <Layout
            {...getLayoutProps()}
            renderProgram={({ program }) => (
              <CustomProgram key={program.data.id} program={program} />
            )}
            renderChannel={({ channel }) => (
              <CustomChannel key={channel.uuid} channel={channel} />
            )}
          />
        </Epg>
      </div>
      
      <div className="planby-note">
        <p>* Role horizontalmente para ver todo o lineup</p>
      </div>
    </section>
  );
}

