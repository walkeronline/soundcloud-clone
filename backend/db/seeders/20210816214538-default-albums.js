'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
		return queryInterface.bulkInsert(
			'Albums',
			[
				{
					userId: 2,
					title: 'Oncle Jazz',
					imageUrl: 'https://i.ibb.co/w6Z1B6G/a3970465110-16.jpg',
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
		return queryInterface.bulkDelete('Albums', null, {
			truncate: true,
			cascade: true,
			restartIdentity: true,
		});
	},
};
