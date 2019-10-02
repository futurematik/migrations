import { Migration } from './Migration';

export interface MigrationPlan<MigrationType extends Migration<MigrationType>> {
  unknownApplied: string[];
  knownApplied: MigrationType[];
  unapplied: MigrationType[];
}
