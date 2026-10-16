const sequelize = require('../config/database');
const User = require('./User');
const Portfolio = require('./Portfolio');
const Content = require('./Content');
const Review = require('./Review');

User.hasMany(Portfolio, { foreignKey: 'student_id', as: 'portfolios' });
Portfolio.belongsTo(User, { foreignKey: 'student_id', as: 'student' });

Portfolio.hasMany(Content, { foreignKey: 'portfolio_id', as: 'contents' });
Content.belongsTo(Portfolio, { foreignKey: 'portfolio_id', as: 'portfolio' });

Portfolio.hasMany(Review, { foreignKey: 'portfolio_id', as: 'reviews' });
Review.belongsTo(Portfolio, { foreignKey: 'portfolio_id', as: 'portfolio' });

User.hasMany(Review, { foreignKey: 'teacher_id', as: 'reviews_given' });
Review.belongsTo(User, { foreignKey: 'teacher_id', as: 'teacher' });

module.exports = { sequelize, User, Portfolio, Content, Review };