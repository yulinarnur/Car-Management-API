"use strict";
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const carsData = [
      {
        uuid: uuidv4(),
        model: "Juke",
        rentPerDay: 50000,
        images: "public/uploads/car08.min.jpg",
        userId: 18,
        createdBy: 18,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("car", carsData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("car", null, {});
  },
};
