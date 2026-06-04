CREATE TABLE IF NOT EXISTS vehicles (
    id CHAR(36) PRIMARY KEY,
    model VARCHAR(100) NOT NULL,
    plate_number VARCHAR(20) NOT NULL UNIQUE,
    status ENUM('active', 'maintenance', 'inactive') NOT NULL DEFAULT 'active',
    mileage INT NOT NULL DEFAULT 0,
    fuel_level INT NOT NULL DEFAULT 100,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);