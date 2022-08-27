'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
    */
     return queryInterface.bulkInsert('User', [{
      first_name: 'Hoa',
      last_name: 'Pham',
      email: 'hoa@example.com',
      username: 'hoapham',
      password: '$2a$10$0XOktMTrO37r4dGaIDRr1ubc.FXih/m..QEnE8.Ijfhg6jyl704Hy',
      created_at: new Date(),
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('User', null, {});

  }
};
