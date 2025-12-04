// /**
//  * Migration: Initial Database Schema
//  * Created: 2025-09-25T00:00:00.000Z
//  */

// /**
//  * Run the migration
//  * @param {import('knex').Knex} knex
//  */
// async function up(knex) {
//   // Enable UUID extension
//   await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');


//   // Create refresh_tokens table
//   await knex.schema.createTable('refresh_tokens', (table) => {
//     table.increments('id').primary();
//     table.uuid('user_id');
//     table.string('token', 255).notNullable();
//     table.timestamp('expires_at').notNullable();
//     table.timestamp('created_at').defaultTo(knex.fn.now());
//   });

//   // Create blogs table
//   await knex.schema.createTable('blogs', (table) => {
//     table.increments('id').primary();
//     table.string('title', 255).notNullable();
//     table.string('author', 100);
//     table.string('image', 255);
//     table.string('slug', 255);
//     table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
//     table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
//     table.jsonb('content');
//     table.string('status', 50).defaultTo('draft');
//   });

//   // Create clientTestimonials table
//   await knex.schema.createTable('clientTestimonials', (table) => {
//     table.increments('id').primary();
//     table.string('name', 20).notNullable();
//     table.string('designation', 20).notNullable();
//     table.string('image', 100);
//     table.text('remarks').notNullable();
//     table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
//   });

//   // Create providerTestimonials table
//   await knex.schema.createTable('providerTestimonials', (table) => {
//     table.increments('id').primary();
//     table.string('firstName', 20).notNullable();
//     table.string('lastName', 20).notNullable();
//     table.string('designation', 20).notNullable();
//     table.string('image', 100);
//     table.text('remarks').notNullable();
//     table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
//   });

//   // Create inquirylogs table
//   await knex.schema.createTable('inquirylogs', (table) => {
//     table.increments('inquirylogkey').primary();
//     table.string('emailAddress', 255).notNullable();
//     table.timestamp('inquirydatetime').notNullable().defaultTo(knex.fn.now());
//   });

//   // Create professionalservice table
//   await knex.schema.createTable('professionalservice', (table) => {
//     table.increments('id').primary();
//     table.string('firstName', 100).notNullable();
//     table.string('lastName', 100).notNullable();
//     table.string('emailAddress', 255).notNullable();
//     table.string('contactNumber', 15).notNullable();
//     table.string('organization', 255);
//     table.string('country', 100);
//     table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
//     table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
//     table.integer('emailStatus').notNullable().defaultTo(0);
//     table.string('text', 255).notNullable();
//   });

//   // Create teamsourceContact table
//   await knex.schema.createTable('teamsourceContact', (table) => {
//     table.increments('id').primary();
//     table.string('name', 255).notNullable();
//     table.string('email', 255).notNullable();
//     table.string('contactNumber', 30).notNullable();
//     table.string('company', 255).notNullable();
//     table.string('service', 100).notNullable();
//     table.string('country', 100);
//     table.text('message').notNullable();
//     table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
//     table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
//     table.integer('emailstatus').notNullable().defaultTo(0);
//   });

//   // Create teamsourceQuotes table
//   await knex.schema.createTable('teamsourceQuotes', (table) => {
//     table.increments('id').primary();
//     table.string('name', 100).notNullable();
//     table.string('email', 255).notNullable();
//     table.string('company', 255).notNullable();
//     table.string('phone', 15).notNullable();
//     table.string('service', 100).notNullable();
//     table.string('team_size', 50);
//     table.string('project_duration', 100).notNullable();
//     table.string('budget', 100).notNullable();
//     table.string('timeline', 100).notNullable();
//     table.text('description').notNullable();
//     table.string('priority', 20);
//     table.string('country', 100).notNullable();
//     table.timestamp('created_at').defaultTo(knex.fn.now());
//     table.timestamp('updated_at').defaultTo(knex.fn.now());
//     table.integer('emailstatus').notNullable().defaultTo(0);
//   });

//   console.log('✅ Initial database schema created successfully');
// }

// /**
//  * Rollback the migration
//  * @param {import('knex').Knex} knex
//  */
// async function down(knex) {
//   // Drop tables in reverse order
//   await knex.schema.dropTableIfExists('teamsourceQuotes');
//   await knex.schema.dropTableIfExists('teamsourceContact');
//   await knex.schema.dropTableIfExists('professionalservice');
//   await knex.schema.dropTableIfExists('inquirylogs');
//   await knex.schema.dropTableIfExists('providerTestimonials');
//   await knex.schema.dropTableIfExists('clientTestimonials');
//   await knex.schema.dropTableIfExists('blogs');
//   await knex.schema.dropTableIfExists('refresh_tokens');

//   // Drop UUID extension
//   await knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"');

//   console.log('✅ Initial database schema rolled back successfully');
// }

// module.exports = { up, down };