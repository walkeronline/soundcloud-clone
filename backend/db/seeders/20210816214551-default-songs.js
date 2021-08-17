'use strict';

const regExp = new RegExp(/^[a-z0-9 ]+$/i);

const convertToUrl = (title) => {
	return (
		'/songs/' +
		title
			.split('')
			.map((char) => (regExp.test(char) ? char.toLowerCase() : ''))
			.join('')
			.split(' ')
			.join('-')
	);
};

const defaultSongs = [
	{
		userId: 2,
		albumId: 1,
		title: 'Oncle Jazz',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Norton Commander (Album V)',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Days Go By',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Tailwhip (Album V)',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Found Me',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Numb (Album V)',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Say Can You Hear (Album V)',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'All Night',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'I Hope to Be Around (Album V)',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Dorian',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Pines',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Slap Pie',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Fiero GT',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Seven (Album V)',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Show Me How (Album V)',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Alright',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'You Deserve This (Album V)',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Pierre',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Air',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Porcelain',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Poodle of Mud',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Something in Water',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Tailwhip Revisited',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Poplar Tree',
	},
];

defaultSongs.map((song) => {
	song.url = convertToUrl(song.title);
});

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
		return queryInterface.bulkInsert('Songs', defaultSongs, {});
	},

	down: (queryInterface, Sequelize) => {
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
		return queryInterface.bulkDelete('Songs', null, {
			truncate: true,
			cascade: true,
			restartIdentity: true,
		});
	},
};
