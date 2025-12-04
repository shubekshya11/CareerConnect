# Database Migration System

This project uses a custom migration system built on top of Knex.js to manage database schema changes.

## Migration Commands

### Install Dependencies
First, make sure to install the required dependencies:
```bash
npm install
```

### Available Commands

#### Run Pending Migrations
```bash
npm run migrate:up
```
This command will run all pending migrations in chronological order.

#### Rollback Last Migration
```bash
npm run migrate:down
```
This command will rollback the most recently executed migration.

#### Check Migration Status
```bash
npm run migrate:status
```
This command will show you which migrations have been executed and which are pending.

#### Create New Migration
```bash
npm run migrate:create "migration_name"
```
This command will create a new migration file with a timestamp prefix and the specified name.

Example:
```bash
npm run migrate:create "add_user_preferences_table"
```

## Migration File Structure

Migration files are stored in the `migrations/` directory and follow this naming convention:
```
YYYYMMDD_HHMMSS_migration_name.js
```

Each migration file must export two functions:

### `up(knex)` - Forward Migration
This function defines what changes to apply to the database.

### `down(knex)` - Rollback Migration
This function defines how to undo the changes made by the `up` function.

## Example Migration File

```javascript
/**
 * Migration: Add User Preferences Table
 * Created: 2025-09-25T12:00:00.000Z
 */

/**
 * Run the migration
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  await knex.schema.createTable('user_preferences', (table) => {
    table.increments('id').primary();
    table.uuid('user_id').notNullable();
    table.json('preferences').defaultTo('{}');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    
    table.foreign('user_id').references('id').inTable('admin');
  });
}

/**
 * Rollback the migration
 * @param {import('knex').Knex} knex
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('user_preferences');
}
```

## Common Migration Operations

### Creating Tables
```javascript
await knex.schema.createTable('table_name', (table) => {
  table.increments('id').primary();
  table.string('name').notNullable();
  table.timestamps(true, true); // adds created_at and updated_at
});
```

### Adding Columns
```javascript
await knex.schema.table('table_name', (table) => {
  table.string('new_column').nullable();
});
```

### Dropping Columns
```javascript
await knex.schema.table('table_name', (table) => {
  table.dropColumn('column_name');
});
```

### Adding Indexes
```javascript
await knex.schema.table('table_name', (table) => {
  table.index('column_name');
  table.unique('unique_column');
});
```

### Adding Foreign Keys
```javascript
await knex.schema.table('table_name', (table) => {
  table.foreign('foreign_key_column').references('id').inTable('referenced_table');
});
```

### Inserting Data
```javascript
await knex('table_name').insert([
  { name: 'Item 1', value: 100 },
  { name: 'Item 2', value: 200 }
]);
```

## Best Practices

1. **Always test migrations**: Test both `up` and `down` functions before deploying.

2. **Keep migrations atomic**: Each migration should focus on a single logical change.

3. **Use transactions**: The migration runner automatically wraps each migration in a transaction.

4. **Backup before production**: Always backup your database before running migrations in production.

5. **Don't edit existing migrations**: Once a migration has been run in production, create a new migration instead of editing the existing one.

6. **Write descriptive names**: Use clear, descriptive names for your migrations.

## Troubleshooting

### Migration Fails
If a migration fails, it will be automatically rolled back. Check the error message and fix the migration file before retrying.

### Migration Table Issues
The migration system automatically creates a `migrations` table to track which migrations have been executed. If you need to reset this table:

```sql
DROP TABLE IF EXISTS migrations;
```

Then run `npm run migrate:up` again.

### Database Connection Issues
Make sure your database connection details are correct in your `.env` file:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_NAME=your_database
DB_PASSWORD=your_password
USE_SSL=false
```

## Initial Setup

If you're setting up a new database, run the initial migration:
```bash
npm run migrate:up
```

This will create all the necessary tables based on your existing schema.