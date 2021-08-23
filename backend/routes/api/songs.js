const express = require('express');
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Song, Comment, Album } = require('../../db/models');
const { Sequelize } = require('sequelize');

const router = express.Router();

const validateSong = [
	check('title')
		.exists({ checkFalsy: true })
		.withMessage('Please provide a title.'),
	check('title')
		.isLength({ max: 63 })
		.withMessage('Title must be shorter than 64 characters.'),
	check('url')
		.exists({ checkFalsy: true })
		.withMessage('Please provide a URL.'),
	handleValidationErrors,
];

router.post(
	'/',
	validateSong,
	asyncHandler(async (req, res) => {
		const { userId, albumId, url, title } = req.body;
		const song = await Song.create({ userId, albumId, url, title });

		return res.json({
			song,
		});
	})
);

router.post(
	'/search',
	asyncHandler(async (req, res) => {
		const { searchTerm } = req.body;
		console.log(searchTerm);
		const songs = await Song.findAll({
			where: {
				title: {
					[Sequelize.Op.like]: '%' + searchTerm + '%',
				},
			},
		});
	})
);

router.get(
	'/feed',
	asyncHandler(async (req, res) => {
		const songs = await Song.findAll({
			include: User,
			limit: 100,
			order: [['createdAt', 'DESC']],
		});
		res.json(songs);
	})
);

router.get(
	'/:id',
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const song = await Song.findByPk(+id, {
			include: [
				User,
				Album,
				{ model: Comment, include: User, order: ['createdAt', 'DESC'] },
			],
		});

		return res.json(song);
	})
);

router.put(
	'/:id',
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const { url, title } = req.params;
		const song = await Song.findByPk(+id);

		song.url = url ? url : song.url;
		song.title = title ? title : song.title;

		await song.save;

		res.json(song);
	})
);

router.delete(
	'/:id',
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const song = await Song.findByPk(+id);
		await song.destroy();

		res.json(song);
	})
);

router.get(
	'/all/:userId',
	asyncHandler(async (req, res) => {
		const { userId } = req.params;
		const songs = await Song.findAll({
			where: { userId },
			include: User,
		});
		// console.log(songs);
		res.json(songs);
	})
);

module.exports = router;
