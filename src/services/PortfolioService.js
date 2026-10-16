const { Portfolio } = require('../models');

class PortfolioService {
  async create(data) {
    return await Portfolio.create(data);
  }
  async findByStudent(studentId) {
    return await Portfolio.findAll({ where: { student_id: studentId }, include: ['contents', 'reviews'] });
  }
  async findById(id) {
    return await Portfolio.findByPk(id);
  }
}
module.exports = new PortfolioService();