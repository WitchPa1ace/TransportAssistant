const db = require('./config/db');
const fs = require('fs');
const path = require('path');

async function checkMigrationsTable() {
  const [tables] = await db.query(
    "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'migrations'",
    [process.env.DB_NAME || 'transport_assistant_db']
  );
  
  if (tables.length === 0) {
    await db.query(`
      CREATE TABLE migrations (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL UNIQUE,
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Created migrations table');
  }
}

async function isMigrationApplied(name) {
  const [rows] = await db.query(
    'SELECT id FROM migrations WHERE name = ?',
    [name]
  );
  return rows.length > 0;
}

async function runMigrations() {
  console.log('Running migrations...');
  
  try {
    await checkMigrationsTable();
    
    const migrationsDir = path.join(__dirname, 'migrations');
    const files = fs.readdirSync(migrationsDir)
      .filter(f => f.endsWith('.sql'))
      .sort();
    
    // Получаем соединение для транзакции
    const connection = await db.getConnection();
    
    try {
      await connection.beginTransaction();
      
      for (const file of files) {
        const applied = await isMigrationApplied(file);
        
        if (applied) {
          console.log(`Skipped: ${file}`);
          continue;
        }
        
        const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
        await connection.query(sql);
        await connection.query('INSERT INTO migrations (name) VALUES (?)', [file]);
        console.log(`Applied: ${file}`);
      }
      
      await connection.commit();
      console.log('All migrations applied successfully!');
    } catch (error) {
      await connection.rollback();
      console.error('Migration failed, rolled back:', error.message);
      process.exit(1);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Migration error:', error.message);
    process.exit(1);
  }
}

runMigrations();