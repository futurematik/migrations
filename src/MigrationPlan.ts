import { Migration } from './migration';

export interface MigrationPlan<MigrationType extends Migration<MigrationType>> {
  unknownApplied: string[];
  knownApplied: MigrationType[];
  unapplied: MigrationType[];
}
