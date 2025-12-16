import { stages } from '../data/lineup';
import type { StageInfo } from '../data/lineup';
import './StageTabs.css';

interface StageTabsProps {
  activeStage: 'horta' | 'palco';
  onStageChange: (stageId: 'horta' | 'palco') => void;
}

export function StageTabs({ activeStage, onStageChange }: StageTabsProps) {
  return (
    <div className="stage-tabs">
      {stages.map((stage: StageInfo) => (
        <button
          key={stage.id}
          className={`stage-tab ${activeStage === stage.id ? 'active' : ''}`}
          onClick={() => onStageChange(stage.id)}
        >
          <span className="tab-name">{stage.name}</span>
          {stage.subtitle && (
            <span className="tab-subtitle">{stage.subtitle}</span>
          )}
        </button>
      ))}
    </div>
  );
}

