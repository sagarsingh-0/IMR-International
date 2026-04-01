import pg from 'pg';
const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

try {
  await client.connect();
  console.log('✅ Connected to Neon PostgreSQL successfully!');
  const res = await client.query('SELECT version()');
  console.log('PostgreSQL version:', res.rows[0].version);
  await client.end();
} catch (err) {
  console.error('❌ Connection failed:', err.message);
  process.exit(1);
}
