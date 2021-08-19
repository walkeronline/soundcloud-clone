'use strict';
module.exports = (sequelize, DataTypes) => {
	const Song = sequelize.define(
		'Song',
		{
			userId: DataTypes.INTEGER,
			albumId: DataTypes.INTEGER,
			url: DataTypes.STRING,
			title: DataTypes.STRING,
			songUrl: DataTypes.TEXT,
			imageUrl: DataTypes.TEXT,
		},
		{}
	);
	Song.associate = function (models) {
		// associations can be defined here
		Song.belongsTo(models.User, { foreignKey: 'userId' });
		Song.belongsTo(models.Album, { foreignKey: 'albumId' });
		Song.hasMany(models.Comment, { foreignKey: 'songId' });
	};
	return Song;
};
