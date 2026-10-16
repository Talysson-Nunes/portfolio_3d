const UserService = require('../services/UserService');

class UserController {
  async register(req, res) {
    try {
      const user = await UserService.create(req.body);
      return res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserService.findByEmail(email);
      if (!user || !(await user.validPassword(password))) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }
      return res.status(200).json({ id: user.id, name: user.name, role: user.role });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
module.exports = new UserController();