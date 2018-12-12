# @fmtk/migrations

Simple tool to figure out which migrations to apply.

Start with some migrations:

```typescript
const usersMigration = new Migration(
  [],
  [
    `CREATE TABLE users(
    id int primary key, 
    name text
  )`,
  ],
);

const booksMigration = new Migration(
  [usersMigration],
  [
    `CREATE TABLE books(
    id int primary key,
    name text
  )`,
    `CREATE TABLE user_books(
    user_id int foreign key references users(id), 
    book_id int foreign key references books(id)
  )`,
  ],
);
```

Suppose developer Steve works on a feature to add the date that a user read a book:

```typescript
const bookReadDateMigration = new Migration(
  [booksMigration],
  [`ALTER TABLE user_books ADD COLUMN read_date date NULL`],
);
```

At the same time developer Jessica is working on a feature to add films:

```typescript
const filmsMigration = new Migration(
  [booksMigration],
  [
    `CREATE TABLE films(
    id int primary key,
    name text
  )`,
    `CREATE TABLE user_films(
    user_id int foreign key references users(id), 
    film_id int foreign key references films(id)
  )`,
  ],
);
```

With other migration systems that apply migrations in sequence, this would be annoying to merge even though the two changes are independent. Here we can just add another migration that has both migrations as a parents:

```typescript
const booksAndFilmsMigration = new Migration(
  [bookReadDateMigration, filmsMigration],
  [],
);
```

Migrations are identified by a SHA-1 hash of the SQL statements and parent hashes. It is suggested that a list of applied hashes are stored in a migrations table in the database. Given such a list of hashes, and the head migration, a list of migrations to apply (in order) can be obtained:

```typescript
const appliedMigrations = ['hash1', 'hash2'];

const migrations: Migration[] = getMigrationsToApply(
  appliedMigrations,
  booksAndFilmsMigration,
);
```

If `appliedMigrations` contains hashes not reachable from the given head migration, an error will be thrown.
