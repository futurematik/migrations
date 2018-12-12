import { Migration } from '../Migration';

export function migration(id: string, ...dependencies: Migration[]): Migration {
  return {
    id,
    dependencies,
  };
}
