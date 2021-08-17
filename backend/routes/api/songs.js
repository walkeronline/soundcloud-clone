const express = require('express');
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song } = require('../../db/models');

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

router.get(
	'/:id',
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const song = await Song.findByPk(+id);

		return res.json({ song });
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

		res.json({ song });
	})
);

router.delete(
	'/:id',
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const song = await Song.findByPk(+id);
		await song.destroy();

		res.json({ song });
	})
);

router.get(
	'/all/:userId',
	asyncHandler(async (req, res) => {
		const { userId } = req.params;
		const songs = await Song.findAll({
			where: { userId },
		});
		// console.log(songs);
		res.json({ songs });
	})
);

module.exports = router;
