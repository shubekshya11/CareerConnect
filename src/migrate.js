#!/usr/bin/env node

import MigrationRunner from './migrationRunner.js';
import { program } from 'commander';

const runner = new MigrationRunner();

program
  .name('migrate')
  .description('Database migration tool for CareerConnect')
  .version('1.0.0');

program
  .command('up')
  .description('Run pending migrations')
  .action(async () => {
    try {
      await runner.runMigrations();
      process.exit(0);
    } catch (error) {
      console.error('Migration failed:', error);
      process.exit(1);
    }
  });

program
  .command('down')
  .description('Rollback the last migration')
  .action(async () => {
    try {
      await runner.rollbackLastMigration();
      process.exit(0);
    } catch (error) {
      console.error('Rollback failed:', error);
      process.exit(1);
    }
  });

program
  .command('status')
  .description('Show migration status')
  .action(async () => {
    try {
      await runner.getStatus();
      process.exit(0);
    } catch (error) {
      console.error('Status check failed:', error);
      process.exit(1);
    }
  });

program
  .command('create <name>')
  .description('Create a new migration file')
  .action(async (name) => {
    const timestamp = new Date().toISOString()
      .replace(/[-:]/g, '')
      .replace(/\..+/, '')
      .replace('T', '_');
    
    const filename = `${timestamp}_${name.replace(/\s+/g, '_').toLowerCase()}.cjs`;
    const filepath = `./migrations/${filename}`;
    
    const template = `/**
 * Migration: ${name}
 * Created: ${new Date().toISOString()}
 */

/**
 * Run the migration
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  // Add your migration code here
  // Example:
  // await knex.schema.createTable('your_table', (table) => {
  //   table.increments('id').primary();
  //   table.string('name').notNullable();
  //   table.timestamps(true, true);
  // });
}

/**
 * Rollback the migration
 * @param {import('knex').Knex} knex
 */
export async function down(knex) {
  // Add your rollback code here
  // Example:
  // await knex.schema.dropTableIfExists('your_table');
}
`;

    const fs = await import('fs');
    
    try {
      fs.writeFileSync(filepath, template);
      console.log(`✅ Created migration file: ${filepath}`);
    } catch (error) {
      console.error('❌ Failed to create migration file:', error);
      process.exit(1);
    }
  });

program.parse();