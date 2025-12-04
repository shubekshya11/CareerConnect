// /**
//  * Migration: Create Applications Table
//  * Created: 2025-09-25T00:00:03.000Z
//  */

// /**
//  * Run the migration
//  * @param {import('knex').Knex} knex
//  */
// async function up(knex) {
//   // Create applications table
//   await knex.schema.createTable('applications', (table) => {
//     table.increments('id').primary();
//     table.string('user_id').notNullable();
//     table.string('job_id').notNullable();
//     table.text('cover_letter').nullable();
//     table.string('cv_path').nullable();
//     table.timestamp('created_at').defaultTo(knex.fn.now());
//     table.timestamp('updated_at').defaultTo(knex.fn.now());

//     // Add indexes for better performance
//     table.index('user_id');
//     table.index('job_id');

//     // Add unique constraint to prevent duplicate applications
//     table.unique(['user_id','job_id'], 'unique_user_job_application');
//   });
// }

// /**
//  * Rollback the migration
//  * @param {import('knex').Knex} knex
//  */
// async function down(knex) {
//   await knex.schema.dropTableIfExists('applications');
// }

// module.exports = { up, down };