const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Portfolio = sequelize.define('Portfolio', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  
  title: { 
    type: DataTypes.STRING, 
    allowNull: false,
    validate: {
      len: [3, 100] 
    }
  },
  
  description: { type: DataTypes.TEXT, allowNull: true },
  
  student_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  }
}, {
  tableName: 'portfolios',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Portfolio;