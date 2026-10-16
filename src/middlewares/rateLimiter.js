const rateLimit = require('express-rate-limit');
const { ipKeyGenerator } = require('express-rate-limit'); // <-- IMPORTANTE: Helper seguro para IPv6

// Rate limiter para operações de leitura (GET)
const readLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requisições por janela
  message: { error: 'Muitas requisições de leitura. Tente novamente em 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Se houver usuário autenticado, usa o ID. Senão, usa o helper seguro para IPs (IPv4 e IPv6)
    return req.user?.id ? String(req.user.id) : ipKeyGenerator(req);
  }
});

// Rate limiter para operações de escrita (POST/PUT/DELETE)
const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Muitas operações de escrita. Tente novamente em 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.user?.id ? String(req.user.id) : ipKeyGenerator(req);
  }
});

// Rate limiter específico para criação de portfólio
const portfolioCreateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 5,
  message: { error: 'Limite de criação de portfólios atingido. Máximo 5 por hora.' },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.user?.id ? String(req.user.id) : ipKeyGenerator(req);
  }
});

module.exports = { readLimiter, writeLimiter, portfolioCreateLimiter };