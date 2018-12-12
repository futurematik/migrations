import { Migration } from './Migration';
import { MigrationPlan } from './MigrationPlan';
import { createMigrationGraph } from './createMigrationGraph';
import { topologicalSort } from '@fmtk/graph';

export function createMigrationPlan<T extends Migration<T>>(
  final: T,
  applied: string[],
): MigrationPlan<T> {
  const graph = createMigrationGraph(final);

  const appliedIndex = applied.reduce((a, x) => ({ ...a, [x]: true }), {} as {
    [k: string]: boolean;
  });
  const knownApplied: T[] = [];
  const unapplied: T[] = [];
  const all = topologicalSort(graph);

  for (const m of all) {
    if (m.id in appliedIndex) {
      knownApplied.push(m);
      delete appliedIndex[m.id];
    } else {
      unapplied.push(m);
    }
  }

  const unknownApplied = Object.keys(appliedIndex);

  return {
    unknownApplied,
    knownApplied,
    unapplied,
  };
}
