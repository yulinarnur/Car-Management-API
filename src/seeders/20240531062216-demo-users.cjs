"use strict";

const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("12345678", 10);

    await queryInterface.bulkInsert(
      "users",
      [
        {
          uuid: uuidv4(),
          name: "Putri Amanda",
          email: "putriamanda@gmail.com",
          password: hashedPassword,
          role: "superadmin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
