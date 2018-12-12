import crypto = require('crypto');
import { Migration } from './migration';

export class SqlMigration implements Migration<SqlMigration> {
  /**
   * Get the hash of the migration to check integrity.
   */
  public static hash(
    dependencies: SqlMigration[],
    statements: string[],
  ): string {
    const hash = crypto.createHash('sha1');

    for (const dep of dependencies) {
      hash.update(dep.id);
    }

    for (const stmnt of statements) {
      hash.update(stmnt);
    }

    return hash.digest('hex');
  }

  public readonly id: string;

  constructor(
    public readonly dependencies: SqlMigration[],
    public readonly statements: string[],
  ) {
    this.id = SqlMigration.hash(dependencies, statements);
  }
}
