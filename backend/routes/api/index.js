const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const songsRouter = require('./songs.js');
const albumsRouter = require('./albums.js');

const asyncHandler = require('express-async-handler');
const { User } = require('../../db/models');
const {
	setTokenCookie,
	restoreUser,
	requireAuth,
} = require('../../utils/auth.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/songs', songsRouter);

router.use('/albums', albumsRouter);

router.get(
	'/set-token-cookie',
	asyncHandler(async (req, res) => {
		const user = await User.findOne({
			where: {
				username: 'Demo-lition',
			},
		});
		setTokenCookie(res, user);
		return res.json({ user });
	})
);

router.get('/restore-user', restoreUser, (req, res) => {
	return res.json(req.user);
});

router.get('/require-auth', requireAuth, (req, res) => {
	return res.json(req.user);
});

module.exports = router;
