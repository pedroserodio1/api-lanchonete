'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('Food', [
        {
          name: 'Coxinha',
          value: 3.50,
          ingredients: "Frango e catupiry",
          avaliable: true,
          image: "..path",
          type: "Salgado",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Refrigerante',
          value: 3.50,
          ingredients: "Coca-cola",
          avaliable: true,
          image: "..path",
          type: "Bebida",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Pé-de-moleque',
          value: 2.50,
          ingredients: "Amendoim",
          avaliable: false,
          image: "..path",
          type: "Doce",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('Food', null, {});
     
  }
};
