'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Users',
			[
				{
					email: 'demo@user.io',
					username: 'demo',
					displayName: 'Demo User',
					hashedPassword: bcrypt.hashSync('password'),
				},
				{
					email: 'menitrust@user.io',
					username: 'menitrust',
					displayName: 'Men I Trust',
					hashedPassword: bcrypt.hashSync('password'),
				},
				{
					email: faker.internet.email(),
					username: 'FakeUser1',
					displayName: 'Fake User 1',
					hashedPassword: bcrypt.hashSync(faker.internet.password()),
				},
				{
					email: faker.internet.email(),
					username: 'FakeUser2',
					displayName: 'Fake User 2',
					hashedPassword: bcrypt.hashSync(faker.internet.password()),
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete('Users', null, {
			truncate: true,
			cascade: true,
			restartIdentity: true,
		});
	},
};
