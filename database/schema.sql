CREATE DATABASE IF NOT EXISTS transport_assistant_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE transport_assistant_db;

CREATE TABLE users (
    id CHAR(36) PRIMARY KEY, -- UUID
    name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'dispatcher', 'driver') NOT NULL DEFAULT 'driver',
    phone VARCHAR(20) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_role ON users(role);

CREATE TABLE vehicles (
    id CHAR(36) PRIMARY KEY,
    model VARCHAR(100) NOT NULL,
    plate_number VARCHAR(20) NOT NULL UNIQUE,
    status ENUM('active', 'maintenance', 'inactive') NOT NULL DEFAULT 'active',
    mileage INT NOT NULL DEFAULT 0,
    fuel_level INT NOT NULL DEFAULT 100,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_vehicles_status ON vehicles(status);

CREATE TABLE orders (
    id CHAR(36) PRIMARY KEY,
    vehicle_id CHAR(36),
    driver_id CHAR(36), 
    origin VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    cargo_type VARCHAR(100),
    weight DECIMAL(10, 2),
    status ENUM('pending', 'in-transit', 'delivered', 'cancelled') NOT NULL DEFAULT 'pending',
    revenue DECIMAL(10, 2) DEFAULT 0,
    start_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_orders_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE SET NULL,
    CONSTRAINT fk_orders_driver FOREIGN KEY (driver_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX idx_orders_status ON orders(status);


INSERT INTO users (id, name, role) VALUES 
('u1', 'Администратор', 'admin'),
('u2', 'Диспетчер Алексей', 'dispatcher');

INSERT INTO vehicles (id, model, plate_number, status, mileage) VALUES 
('v1', 'Volvo FH16', 'А111АА777', 'active', 120000),
('v2', 'Kamaz 5490', 'В222ВВ777', 'maintenance', 300000);

INSERT INTO orders (id, vehicle_id, origin, destination, status, start_date, revenue) VALUES 
('o1', 'v1', 'Москва', 'Казань', 'in-transit', CURDATE(), 150000);