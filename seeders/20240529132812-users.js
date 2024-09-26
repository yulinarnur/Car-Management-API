"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert(
    "Users",
    [
      {
        name: "Nur R",
        email: "nurr@gmail.com",
        password: "123456",
        role: "superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Yulinar",
        email: "yulinar@gmail.com",
        password: "password456",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
}
export async function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete("Users", null, {});
}
