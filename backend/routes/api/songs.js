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
	asyncHandler(async (req, res) => {
		const { userId, albumId, url, title, songId } = req.body;
		const useSong = await Song.findByPk(songId);
		let songUrl = useSong.songUrl;
		const song = await Song.create({
			userId,
			albumId,
			url,
			title,
			songUrl: useSong.songUrl,
		});

		return res.json({
			song,
		});
	})
);

router.post(
	'/search',
	asyncHandler(async (req, res) => {
		const { searchTerm } = req.body;
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
	'/',
	asyncHandler(async (req, res) => {
		const { songId } = req.body;
		const comments = await Comment.findAll({
			where: {
				songId,
			},
		});
		comments.map((comment) => comment.destroy);
		const song = await Song.findByPk(+songId);
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
		res.json(songs);
	})
);

module.exports = router;
