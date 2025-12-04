// /**
//  * Migration: admin
//  * Created: 2025-11-14T04:57:13.787Z
//  */

// /**
//  * Run the migration
//  * @param {import('knex').Knex} knex
//  */
// async function up(knex) {
//   // Add your migration code here
//   // Example:
//   await knex.schema.createTable('admin', (table) => {
//     table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
//     table.string('username').notNullable();
//     table.string('password', 255).notNullable();
//     table.timestamps(true, true);
//   });
// }

// /**
//  * Rollback the migration
//  * @param {import('knex').Knex} knex
//  */
// async function down(knex) {
//   // Add your rollback code here
//   // Example:
//   // await knex.schema.dropTableIfExists('your_table');
// }

// module.exports={up, down}
