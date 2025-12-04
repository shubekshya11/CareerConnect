// /**
//  * Migration: Create Jobs Table
//  * Created: 2025-09-25T00:00:04.000Z
//  */

// /**
//  * Run the migration
//  * @param {import('knex').Knex} knex
//  */
// async function up(knex) {
//   // Create Jobs table
//   await knex.schema.createTable('Jobs', (table) => {
//     table.increments('id').primary();
//     table.string('title', 255).notNullable();
//     table.string('slug', 255).unique().notNullable();
//     table.string('company', 255);
//     table.string('location', 255).notNullable();
//     table.string('salary', 255);
//     table.string('job_type', 100).notNullable();
//     table.integer('vacancy_qty');
//     table.text('job_description').notNullable();
//     table.text('responsibilities').notNullable();
//     table.string('deadline', 100);
//     table.timestamp('created_at').defaultTo(knex.fn.now());
//     table.timestamp('updated_at').defaultTo(knex.fn.now());

//     // Add indexes for better performance
//     table.index('company');
//     table.index('location');
//     table.index('job_type');
//     table.index('created_at');
//   });
// }

// /**
//  * Rollback the migration
//  * @param {import('knex').Knex} knex
//  */
// async function down(knex) {
//   await knex.schema.dropTableIfExists('Jobs');
// }

// module.exports = { up, down };