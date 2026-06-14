const { Pool } = require('pg');
require('dotenv').config();

function buildConfig() {
  // Prefer a full connection string if provided
  if (process.env.DATABASE_URL) {
    const cfg = { connectionString: process.env.DATABASE_URL };
    if (process.env.DATABASE_SSL === 'true') {
      cfg.ssl = { rejectUnauthorized: false };
    }
    return cfg;
  }

  const required = ['DATABASE_USER', 'DATABASE_PASSWORD', 'DATABASE_HOST', 'DATABASE_PORT', 'DATABASE'];
  const missing = required.filter((k) => !process.env[k] || String(process.env[k]).trim() === '');
  if (missing.length) {
    throw new Error(
      `Database env vars missing: ${missing.join(', ')}. Create backend/.env with DATABASE_* values or set DATABASE_URL.`
    );
  }

  return {
    user: String(process.env.DATABASE_USER),
    password: String(process.env.DATABASE_PASSWORD),
    host: String(process.env.DATABASE_HOST),
    port: Number(process.env.DATABASE_PORT),
    database: String(process.env.DATABASE),
  };
}

const pool = new Pool(buildConfig());

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
