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
		songUrl:
			'https://mymusicdb.s3.us-east-2.amazonaws.com/songs/defaults/Men+I+Trust+-+Oncle+Jazz+-+01+Oncle+Jazz.mp3',
		imageUrl: 'https://i.ibb.co/w6Z1B6G/a3970465110-16.jpg',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Norton Commander (Album V)',
		songUrl:
			'https://mymusicdb.s3.us-east-2.amazonaws.com/songs/defaults/Men+I+Trust+-+Oncle+Jazz+-+02+Norton+Commander+(album+v).mp3',
		imageUrl: 'https://i.ibb.co/w6Z1B6G/a3970465110-16.jpg',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Days Go By',
		songUrl:
			'https://mymusicdb.s3.us-east-2.amazonaws.com/songs/defaults/Men+I+Trust+-+Oncle+Jazz+-+03+Days+Go+By.mp3',
		imageUrl: 'https://i.ibb.co/w6Z1B6G/a3970465110-16.jpg',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Tailwhip (Album V)',
		songUrl:
			'https://mymusicdb.s3.us-east-2.amazonaws.com/songs/defaults/Men+I+Trust+-+Oncle+Jazz+-+04+Tailwhip+(album+v).mp3',
		imageUrl: 'https://i.ibb.co/w6Z1B6G/a3970465110-16.jpg',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Found Me',
		songUrl:
			'https://mymusicdb.s3.us-east-2.amazonaws.com/songs/defaults/Men+I+Trust+-+Oncle+Jazz+-+05+Found+Me.mp3',
		imageUrl: 'https://i.ibb.co/w6Z1B6G/a3970465110-16.jpg',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Numb (Album V)',
		songUrl:
			'https://mymusicdb.s3.us-east-2.amazonaws.com/songs/defaults/Men+I+Trust+-+Oncle+Jazz+-+06+Numb+(album+v).mp3',
		imageUrl: 'https://i.ibb.co/w6Z1B6G/a3970465110-16.jpg',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Say Can You Hear (Album V)',
		songUrl:
			'https://mymusicdb.s3.us-east-2.amazonaws.com/songs/defaults/Men+I+Trust+-+Oncle+Jazz+-+07+Say+Can+You+Hear+(album+v).mp3',
		imageUrl: 'https://i.ibb.co/w6Z1B6G/a3970465110-16.jpg',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'All Night',
		songUrl:
			'https://mymusicdb.s3.us-east-2.amazonaws.com/songs/defaults/Men+I+Trust+-+Oncle+Jazz+-+08+All+Night.mp3',
		imageUrl: 'https://i.ibb.co/w6Z1B6G/a3970465110-16.jpg',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'I Hope to Be Around (Album V)',
		songUrl:
			'https://mymusicdb.s3.us-east-2.amazonaws.com/songs/defaults/Men+I+Trust+-+Oncle+Jazz+-+09+I+Hope+To+Be+Around+(album+v).mp3',
		imageUrl: 'https://i.ibb.co/w6Z1B6G/a3970465110-16.jpg',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Dorian',
		songUrl:
			'https://mymusicdb.s3.us-east-2.amazonaws.com/songs/defaults/Men+I+Trust+-+Oncle+Jazz+-+10+Dorian.mp3',
		imageUrl: 'https://i.ibb.co/w6Z1B6G/a3970465110-16.jpg',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Pines',
		songUrl:
			'https://mymusicdb.s3.us-east-2.amazonaws.com/songs/defaults/Men+I+Trust+-+Oncle+Jazz+-+11+Pines.mp3',
		imageUrl: 'https://i.ibb.co/w6Z1B6G/a3970465110-16.jpg',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Slap Pie',
		songUrl:
			'https://mymusicdb.s3.us-east-2.amazonaws.com/songs/defaults/Men+I+Trust+-+Oncle+Jazz+-+12+Slap+Pie.mp3',
		imageUrl: 'https://i.ibb.co/w6Z1B6G/a3970465110-16.jpg',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Fiero GT',
		songUrl:
			'https://mymusicdb.s3.us-east-2.amazonaws.com/songs/defaults/Men+I+Trust+-+Oncle+Jazz+-+13+Fiero+GT.mp3',
		imageUrl: 'https://i.ibb.co/w6Z1B6G/a3970465110-16.jpg',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Seven (Album V)',
		songUrl:
			'https://mymusicdb.s3.us-east-2.amazonaws.com/songs/defaults/Men+I+Trust+-+Oncle+Jazz+-+14+Seven+(album+v).mp3',
		imageUrl: 'https://i.ibb.co/w6Z1B6G/a3970465110-16.jpg',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Show Me How (Album V)',
		songUrl:
			'https://mymusicdb.s3.us-east-2.amazonaws.com/songs/defaults/Men+I+Trust+-+Oncle+Jazz+-+15+Show+Me+How+(album+v).mp3',
		imageUrl: 'https://i.ibb.co/w6Z1B6G/a3970465110-16.jpg',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Alright',
		songUrl:
			'https://mymusicdb.s3.us-east-2.amazonaws.com/songs/defaults/Men+I+Trust+-+Oncle+Jazz+-+16+Alright.mp3',
		imageUrl: 'https://i.ibb.co/w6Z1B6G/a3970465110-16.jpg',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'You Deserve This (Album V)',
		songUrl:
			'https://mymusicdb.s3.us-east-2.amazonaws.com/songs/defaults/Men+I+Trust+-+Oncle+Jazz+-+17+You+Deserve+This+(album+v).mp3',
		imageUrl: 'https://i.ibb.co/w6Z1B6G/a3970465110-16.jpg',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Pierre',
		songUrl:
			'https://mymusicdb.s3.us-east-2.amazonaws.com/songs/defaults/Men+I+Trust+-+Oncle+Jazz+-+18+Pierre.mp3',
		imageUrl: 'https://i.ibb.co/w6Z1B6G/a3970465110-16.jpg',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Air',
		songUrl:
			'https://mymusicdb.s3.us-east-2.amazonaws.com/songs/defaults/Men+I+Trust+-+Oncle+Jazz+-+19+Air.mp3',
		imageUrl: 'https://i.ibb.co/w6Z1B6G/a3970465110-16.jpg',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Porcelain',
		songUrl:
			'https://mymusicdb.s3.us-east-2.amazonaws.com/songs/defaults/Men+I+Trust+-+Oncle+Jazz+-+20+Porcelain.mp3',
		imageUrl: 'https://i.ibb.co/w6Z1B6G/a3970465110-16.jpg',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Poodle of Mud',
		songUrl:
			'https://mymusicdb.s3.us-east-2.amazonaws.com/songs/defaults/Men+I+Trust+-+Oncle+Jazz+-+21+Poodle+Of+Mud.mp3',
		imageUrl: 'https://i.ibb.co/w6Z1B6G/a3970465110-16.jpg',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Something in Water',
		songUrl:
			'https://mymusicdb.s3.us-east-2.amazonaws.com/songs/defaults/Men+I+Trust+-+Oncle+Jazz+-+22+Something+In+Water.mp3',
		imageUrl: 'https://i.ibb.co/w6Z1B6G/a3970465110-16.jpg',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Tailwhip Revisited',
		songUrl:
			'https://mymusicdb.s3.us-east-2.amazonaws.com/songs/defaults/Men+I+Trust+-+Oncle+Jazz+-+23+Tailwhip+Revisited.mp3',
		imageUrl: 'https://i.ibb.co/w6Z1B6G/a3970465110-16.jpg',
	},
	{
		userId: 2,
		albumId: 1,
		title: 'Poplar Tree',
		songUrl:
			'https://mymusicdb.s3.us-east-2.amazonaws.com/songs/defaults/Men+I+Trust+-+Oncle+Jazz+-+24+Poplar+Tree.mp3',
		imageUrl: 'https://i.ibb.co/w6Z1B6G/a3970465110-16.jpg',
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
