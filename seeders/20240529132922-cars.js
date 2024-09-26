"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert(
    "Cars",
    [
      {
        model: "Toyota",
        rentPerDay: 50,
        images: "public/uploads/car01.jpg",
        userId: 18,
        is_deleted: 0,
        createdBy: 18,
        updatedBy: 1,
        deletedBy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        model: "Honda Civic",
        rentPerDay: 45,
        images: "public/uploads/car08.jpg",
        userId: 19,
        is_deleted: 0,
        createdBy: 19,
        updatedBy: 1,
        deletedBy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
}
export async function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete("Cars", null, {});
}
