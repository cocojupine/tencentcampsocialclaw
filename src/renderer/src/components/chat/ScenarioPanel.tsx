import type { ScenarioId } from '../../types/chat'

type ScenarioPanelProps = {
  activeScenarioId: ScenarioId
  scenarios: Array<{ id: ScenarioId; name: string }>
  onSelectScenario: (scenarioId: ScenarioId) => void
  onResetScenario: () => void
}

export function ScenarioPanel({
  activeScenarioId,
  scenarios,
  onSelectScenario,
  onResetScenario
}: ScenarioPanelProps): React.JSX.Element {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {scenarios.map((scenario) => {
        const active = scenario.id === activeScenarioId

        return (
          <button
            key={scenario.id}
            className={[
              'rounded-full border px-3 py-1.5 text-xs font-medium transition',
              active
                ? 'border-[#1d9bf0] bg-[#e8f4ff] text-[#0b75c9]'
                : 'border-transparent bg-[#eff3f8] text-slate-500 hover:bg-[#e5ebf3] hover:text-slate-700'
            ].join(' ')}
            onClick={() => onSelectScenario(scenario.id)}
            type="button"
          >
            {scenario.name}
          </button>
        )
      })}

      <button
        className="rounded-full border border-transparent bg-white px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:border-[#dbe3ee] hover:text-slate-700"
        onClick={onResetScenario}
        type="button"
      >
        重置当前场景
      </button>
    </div>
  )
}
