"use strict";
let date = new Date();

let year = date.getFullYear();
let month = ("0" + (date.getMonth() + 1)).slice(-2);
let day = ("0" + date.getDate()).slice(-2);
let hours = ("0" + date.getHours()).slice(-2);
let minutes = ("0" + date.getMinutes()).slice(-2);
let seconds = ("0" + date.getSeconds()).slice(-2);

let dateTime = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const status_data = [
      {
        status: "di tambahkan",
        details:
          "Pesanan telah diterima dan ditambahkan ke dalam antrian untuk diproses.",
        createdAt: dateTime,
        updatedAt: dateTime,
      },
      {
        status: "dalam prosess",
        details: "Pesanan sedang dalam proses pencucian atau perawatan.",
        createdAt: dateTime,
        updatedAt: dateTime,
      },
      {
        status: "berhasil",
        details:
          "Pesanan telah selesai diproses dan siap untuk diambil atau dikirim ke pelanggan.",
        createdAt: dateTime,
        updatedAt: dateTime,
      },
      {
        status: "menunggu pembayaran",
        details:
          "Pesanan telah selesai diproses, tetapi menunggu pembayaran dari pelanggan.",
        createdAt: dateTime,
        updatedAt: dateTime,
      },
      {
        status: "di batalkan",
        details:
          "Pesanan telah dibatalkan oleh pelanggan atau oleh pihak laundry.",
        createdAt: dateTime,
        updatedAt: dateTime,
      },
    ];

    await queryInterface.bulkInsert("Statuses", status_data);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Statuses", null, {});
  },
};
