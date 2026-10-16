const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Content = sequelize.define('Content', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  content_type: { type: DataTypes.ENUM('text', 'image', 'video', 'link'), allowNull: false },
  file_path: { type: DataTypes.STRING, allowNull: true },
  text_content: { type: DataTypes.TEXT, allowNull: true },
  section: { type: DataTypes.INTEGER, allowNull: false, validate: { isIn: [[1, 2, 3, 4, 5, 6, 7]] } },
  period: { type: DataTypes.ENUM('1_bimestre', '2_bimestre', '3_bimestre', '4_bimestre', 'anual'), allowNull: false },
  portfolio_id: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'contents', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' });

module.exports = Content;