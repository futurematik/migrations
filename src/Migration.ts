interface MigrationBase {
  readonly id: string;
  readonly dependencies: MigrationBase[];
}

export interface Migration<T extends Migration<T> = MigrationBase> {
  readonly id: string;
  readonly dependencies: T[];
}
