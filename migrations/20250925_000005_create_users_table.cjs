// /**
//  * Migration: Create Users Table
//  * Created: 2025-09-25T00:00:05.000Z
//  */

// /**
//  * Run the migration
//  * @param {import('knex').Knex} knex
//  */
// async function up(knex) {
//   // Create users table
//   await knex.schema.createTable('users', (table) => {
//     table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
//     table.string('firstname', 255).notNullable();
//     table.string('lastname', 255).notNullable();
//     table.string('email', 255).notNullable().unique();
//     table.string('phone', 20);
//     table.text('address');
//     table.string('password', 255).notNullable();
//     table.enum('role', ['jobseeker']).notNullable().defaultTo('jobseeker');
//     table.string('verification_code', 255);
//     table.boolean('is_verified').notNullable().defaultTo(false);
//     table.text('skills');
//     table.text('education');
//     table.text('experience');
//     table.string('cv_url', 500);
//     table.timestamp('created_at').defaultTo(knex.fn.now());
//     table.timestamp('updated_at').defaultTo(knex.fn.now());

//     // Add indexes for better performance
//     table.index('email');
//     table.index('role');
//     table.index('is_verified');
//     table.index('phone');
//     table.index(['firstname', 'lastname']);
//   });
// }

// /**
//  * Rollback the migration
//  * @param {import('knex').Knex} knex
//  */
// async function down(knex) {
//   await knex.schema.dropTableIfExists('users');
// }

// module.exports = { up, down };