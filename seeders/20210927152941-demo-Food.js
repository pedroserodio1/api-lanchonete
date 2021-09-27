'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('Food', [
        {
          name: 'Coxinha',
          value: 3.50,
          ingrediets: "Frango e catupiry",
          avaliable: true,
          image: "..path",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Pastel',
          value: 1,
          ingrediets: "Carne moida",
          avaliable: true,
          image: "..path",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Esfirra',
          value: 2.50,
          ingrediets: "Calabresa",
          avaliable: false,
          image: "..path",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('Food', null, {});
     
  }
};
