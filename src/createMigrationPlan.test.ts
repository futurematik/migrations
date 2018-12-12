import 'jest';
import { migration } from './testutil/migration';
import { createMigrationPlan } from './createMigrationPlan';

describe('createMigrationPlan', () => {
  it('plans all migrations in the correct order', () => {
    const a = migration('a');
    const b = migration('b');
    const c = migration('c', a, b);
    const d = migration('d', c);
    const e = migration('e', b);
    const f = migration('f', d);
    const g = migration('g', f, e);

    const plan = createMigrationPlan(g, []);

    expect(plan.knownApplied).toHaveLength(0);
    expect(plan.unknownApplied).toHaveLength(0);

    expect(plan.unapplied).toHaveLength(7);
    expect(plan.unapplied.indexOf(a)).toBeLessThan(plan.unapplied.indexOf(c));
    expect(plan.unapplied.indexOf(b)).toBeLessThan(plan.unapplied.indexOf(c));
    expect(plan.unapplied.indexOf(b)).toBeLessThan(plan.unapplied.indexOf(e));
    expect(plan.unapplied.indexOf(c)).toBeLessThan(plan.unapplied.indexOf(d));
    expect(plan.unapplied.indexOf(d)).toBeLessThan(plan.unapplied.indexOf(f));
    expect(plan.unapplied.indexOf(f)).toBeLessThan(plan.unapplied.indexOf(g));
    expect(plan.unapplied.indexOf(e)).toBeLessThan(plan.unapplied.indexOf(g));
  });
});
