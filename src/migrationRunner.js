import pg from './app/lib/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class MigrationRunner {
  constructor() {
    this.migrationsPath = path.join(__dirname, '../migrations');
  }

  /**
   * Create migrations table if it doesn't exist
   */
  async createMigrationsTable() {
    const exists = await pg.schema.hasTable('migrations');
    if (!exists) {
      await pg.schema.createTable('migrations', (table) => {
        table.increments('id').primary();
        table.string('filename').notNullable().unique();
        table.timestamp('executed_at').defaultTo(pg.fn.now());
      });
      console.log('✅ Created migrations table');
    }
  }

  /**
   * Get list of executed migrations
   */
  async getExecutedMigrations() {
    try {
      const migrations = await pg('migrations').select('filename').orderBy('id');
      return migrations.map(m => m.filename);
    } catch (error) {
      console.error('Error fetching executed migrations:', error);
      return [];
    }
  }

  /**
   * Get list of migration files
   */
  getMigrationFiles() {
    try {
      const files = fs.readdirSync(this.migrationsPath)
        .filter(file => file.endsWith('.cjs'))
        .sort();
      return files;
    } catch (error) {
      console.error('Error reading migration files:', error);
      return [];
    }
  }

  /**
   * Run pending migrations
   */
  async runMigrations() {
    try {
      console.log('🚀 Starting migration process...');
      
      // Ensure migrations table exists
      await this.createMigrationsTable();

      const executedMigrations = await this.getExecutedMigrations();
      const migrationFiles = this.getMigrationFiles();

      const pendingMigrations = migrationFiles.filter(
        file => !executedMigrations.includes(file)
      );

      if (pendingMigrations.length === 0) {
        console.log('✅ No pending migrations found');
        return;
      }

      console.log(`📋 Found ${pendingMigrations.length} pending migration(s)`);

      for (const filename of pendingMigrations) {
        console.log(`⏳ Running migration: ${filename}`);
        
        try {
          // Dynamic import the migration file
          const migrationPath = path.join(this.migrationsPath, filename);
          const migration = await import(`file://${migrationPath}`);
          
          // Start transaction
          await pg.transaction(async (trx) => {
            // Run the up migration
            await migration.up(trx);
            
            // Record the migration as executed
            await trx('migrations').insert({
              filename: filename
            });
          });

          console.log(`✅ Completed migration: ${filename}`);
        } catch (error) {
          console.error(`❌ Failed to run migration ${filename}:`, error);
          throw error;
        }
      }

      console.log('🎉 All migrations completed successfully!');
    } catch (error) {
      console.error('💥 Migration process failed:', error);
      throw error;
    }
  }

  /**
   * Rollback the last migration
   */
  async rollbackLastMigration() {
    try {
      console.log('🔄 Starting rollback process...');

      const lastMigration = await pg('migrations')
        .orderBy('id', 'desc')
        .first();

      if (!lastMigration) {
        console.log('ℹ️ No migrations to rollback');
        return;
      }

      console.log(`⏳ Rolling back migration: ${lastMigration.filename}`);

      // Dynamic import the migration file
      const migrationPath = path.join(this.migrationsPath, lastMigration.filename);
      const migration = await import(`file://${migrationPath}`);

      // Start transaction
      await pg.transaction(async (trx) => {
        // Run the down migration if it exists
        if (migration.down) {
          await migration.down(trx);
        }
        
        // Remove the migration record
        await trx('migrations')
          .where('filename', lastMigration.filename)
          .del();
      });

      console.log(`✅ Rolled back migration: ${lastMigration.filename}`);
    } catch (error) {
      console.error('💥 Rollback process failed:', error);
      throw error;
    }
  }

  /**
   * Get migration status
   */
  async getStatus() {
    try {
      await this.createMigrationsTable();
      
      const executedMigrations = await this.getExecutedMigrations();
      const migrationFiles = this.getMigrationFiles();
      
      const pendingMigrations = migrationFiles.filter(
        file => !executedMigrations.includes(file)
      );

      console.log('\n📊 Migration Status:');
      console.log(`   Executed: ${executedMigrations.length}`);
      console.log(`   Pending: ${pendingMigrations.length}`);
      console.log(`   Total: ${migrationFiles.length}`);

      if (executedMigrations.length > 0) {
        console.log('\n✅ Executed Migrations:');
        executedMigrations.forEach(migration => {
          console.log(`   - ${migration}`);
        });
      }

      if (pendingMigrations.length > 0) {
        console.log('\n⏳ Pending Migrations:');
        pendingMigrations.forEach(migration => {
          console.log(`   - ${migration}`);
        });
      }
    } catch (error) {
      console.error('Error getting migration status:', error);
      throw error;
    }
  }
}

export default MigrationRunner;