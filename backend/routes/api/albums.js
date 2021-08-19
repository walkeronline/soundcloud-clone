const express = require('express');
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Comment, Album } = require('../../db/models');

const router = express.Router();

const validateSong = [
	check('title')
		.exists({ checkFalsy: true })
		.withMessage('Please provide a title.'),
	check('title')
		.isLength({ max: 63 })
		.withMessage('Title must be shorter than 64 characters.'),
	check('imageUrl').isURL().withMessage('Please enter a valid URL.'),
	handleValidationErrors,
];

router.get(
	'/',
	asyncHandler(async (req, res) => {
		const albums = await Album.findAll();
		return res.json(albums);
	})
);

router.get(
	'/:albumId',
	asyncHandler(async (req, res) => {
		const { albumId } = req.params;
		const album = await Album.findByPk(albumId);

		return res.json(album);
	})
);

router.post(
	'/',
	validateSong,
	asyncHandler(async (req, res) => {
		const { userId, title, imageUrl } = req.body;
		const album = await Album.create({ title, imageUrl, userId });

		return res.json(album);
	})
);

router.delete(
	'/:albumId',
	asyncHandler(async (req, res) => {
		const { albumId } = req.params;
		const album = Album.findByPk(albumId);

		await album.destroy();

		return res.json(album);
	})
);

module.exports = router;
