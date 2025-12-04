// /**
//  * Migration: Add Blog Categories Table
//  * Created: 2025-09-25T00:00:01.000Z
//  */

// /**
//  * Run the migration
//  * @param {import('knex').Knex} knex
//  */
// async function up(knex) {
//   // Create blog_categories table
//   await knex.schema.createTable('blog_categories', (table) => {
//     table.increments('id').primary();
//     table.string('name', 100).notNullable().unique();
//     table.string('slug', 100).notNullable().unique();
//     table.text('description');
//     table.string('color', 7).defaultTo('#6B7280'); // hex color for UI
//     table.boolean('is_active').defaultTo(true);
//     table.timestamp('created_at').defaultTo(knex.fn.now());
//     table.timestamp('updated_at').defaultTo(knex.fn.now());
//   });

//   // Add category_id column to blogs table
//   await knex.schema.table('blogs', (table) => {
//     table.integer('category_id').unsigned().nullable();
//     table.foreign('category_id').references('id').inTable('blog_categories').onDelete('SET NULL');
//   });

//   // Insert some default categories
//   await knex('blog_categories').insert([
//     {
//       name: 'Technology',
//       slug: 'technology',
//       description: 'Posts about technology and software development',
//       color: '#3B82F6'
//     },
//     {
//       name: 'Business',
//       slug: 'business',
//       description: 'Business insights and industry trends',
//       color: '#10B981'
//     },
//     {
//       name: 'General',
//       slug: 'general',
//       description: 'General blog posts and announcements',
//       color: '#6B7280'
//     }
//   ]);

//   console.log('✅ Blog categories table created and default categories added');
// }

// /**
//  * Rollback the migration
//  * @param {import('knex').Knex} knex
//  */
// async function down(knex) {
//   // Remove foreign key constraint and category_id column from blogs table
//   await knex.schema.table('blogs', (table) => {
//     table.dropForeign(['category_id']);
//     table.dropColumn('category_id');
//   });

//   // Drop blog_categories table
//   await knex.schema.dropTableIfExists('blog_categories');

//   console.log('✅ Blog categories table and related changes rolled back');
// }

// module.exports = { up, down };