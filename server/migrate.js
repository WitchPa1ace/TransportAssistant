const fs = require('fs');
const path = require('path');
const pool = require('./src/config/db');

async function runMigrations() {
  const connection = await pool.getConnection();
  
  try {
    console.log('Running migrations...');
    
    await connection.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    const [executedMigrations] = await connection.query('SELECT name FROM migrations');
    const executedNames = executedMigrations.map(m => m.name);
    
    const migrationsDir = path.join(__dirname, 'migrations');
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();
    
    for (const file of migrationFiles) {
      if (executedNames.includes(file)) {
        console.log(`Skipped: ${file}`);
        continue;
      }
      
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      
      await connection.beginTransaction();
      
      try {
        const queries = sql.split(';').filter(q => q.trim() !== '');
        
        for (const query of queries) {
          if (query.trim()) {
            await connection.query(query);
          }
        }
        
        await connection.query('INSERT INTO migrations (name) VALUES (?)', [file]);
        await connection.commit();
        
        console.log(`Applied: ${file}`);
      } catch (error) {
        await connection.rollback();
        console.error(`Failed: ${file}`, error.message);
        throw error;
      }
    }
    
    console.log('All migrations applied successfully!');
    
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    connection.release();
    await pool.end();
  }
}

runMigrations()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));