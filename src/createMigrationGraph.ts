import { Migration } from './Migration';
import { reverseGraph, fromNodes } from '@fmtk/graph';

export function createMigrationGraph<T extends Migration<T>>(
  final: T,
): Map<T, T[]> {
  const graph = reverseGraph(fromNodes(final, x => x.dependencies));
  const index: { [id: string]: T } = {};

  // check for duplicate ids
  for (const migration of graph.keys()) {
    if (migration.id in index) {
      throw new Error(`duplicate migration id ${migration.id}`);
    }
    index[migration.id] = migration;
  }

  return graph;
}
