const PortfolioService = require('../services/PortfolioService');

class PortfolioController {
  async create(req, res) {
    try {
      const portfolio = await PortfolioService.create(req.body);
      return res.status(201).json(portfolio);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  async findByStudent(req, res) {
    try {
      const portfolios = await PortfolioService.findByStudent(req.params.studentId);
      return res.status(200).json(portfolios);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
module.exports = new PortfolioController();