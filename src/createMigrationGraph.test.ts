import 'jest';
import { createMigrationGraph } from './createMigrationGraph';
import { sortEntries } from './testutil/sortEntries';
import { migration } from './testutil/migration';

describe('createMigrationGraph', () => {
  it('creates the correct graph', () => {
    const a = migration('a');
    const b = migration('b');
    const c = migration('c', a, b);
    const d = migration('d', c);
    const e = migration('e', b);
    const f = migration('f', d);
    const g = migration('g', f, e);

    const graph = createMigrationGraph(g);

    const entries = sortEntries(graph, (a, b) => a.id.localeCompare(b.id));

    expect(entries).toEqual([
      [a, [c]],
      [b, [c, e]],
      [c, [d]],
      [d, [f]],
      [e, [g]],
      [f, [g]],
      [g, []],
    ]);
  });

  it('throws an error if there is a duplicate id', () => {
    const a = migration('a');
    const b = migration('a');
    const c = migration('c', a, b);
    const d = migration('d', c);
    const e = migration('e', b);
    const f = migration('f', d);
    const g = migration('g', f, e);

    expect(() => createMigrationGraph(g)).toThrowError();
  });
});
