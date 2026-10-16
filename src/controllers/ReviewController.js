const ReviewService = require('../services/ReviewService');

class ReviewController {
  async create(req, res) {
    try {
      const review = await ReviewService.create(req.body);
      return res.status(201).json(review);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  async findByPortfolio(req, res) {
    try {
      const reviews = await ReviewService.findByPortfolio(req.params.portfolioId);
      return res.status(200).json(reviews);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
module.exports = new ReviewController();