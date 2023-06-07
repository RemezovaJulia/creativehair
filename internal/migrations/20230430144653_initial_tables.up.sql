-- Сотрудники
CREATE TABLE IF NOT EXISTS employees
(
    id             SERIAL PRIMARY KEY,
    login          VARCHAR(255) NOT NULL,
    password       bytea        NOT NULL,
    name           VARCHAR(255) NOT NULL,
    phone          VARCHAR(20)  NOT NULL,
    email          VARCHAR(255) NOT NULL,
    about          VARCHAR(300),
    role_id        INTEGER      NOT NULL,
    created_by     INTEGER REFERENCES employees (id),
    hire_date      DATE           DEFAULT CURRENT_DATE,
    dismissal_date DATE,
    active         BOOLEAN        DEFAULT true,
    total_earnings DECIMAL(10, 2) DEFAULT 0.00
);

CREATE TABLE IF NOT EXISTS roles
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- услуги
CREATE TABLE IF NOT EXISTS services
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255)   NOT NULL,
    description TEXT,
    min_price   NUMERIC(10, 2) NOT NULL,
    max_price   NUMERIC(10, 2) NOT NULL,
    employee_id INTEGER REFERENCES employees (id)
);

CREATE TABLE IF NOT EXISTS employee_services
(
    id          SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees (id),
    service_id  INTEGER REFERENCES services (id),
    duration    INTERVAL NOT NULL
);

-- Фото
CREATE TABLE IF NOT EXISTS employee_gallery
(
    id          SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees (id) ON DELETE CASCADE,
    image_url   VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS employee_photos
(
    id          SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees (id) ON DELETE CASCADE,
    image_url   VARCHAR(1000) NOT NULL
);

-- Клиенты
CREATE TABLE IF NOT EXISTS appointments
(
    id               SERIAL PRIMARY KEY,
    client_name      VARCHAR(255),
    client_phone     VARCHAR(20),
    client_email     VARCHAR(25),
    appointment_time TIMESTAMP NOT NULL,
    employee_id      INTEGER REFERENCES employees (id),
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_open          BOOLEAN DEFAULT TRUE
);

CREATE TABLE daily_schedule
(
    id           SERIAL PRIMARY KEY,
    employee_id  INTEGER,
    date         TIMESTAMP,
    time_slots   TIME[],
    is_available BOOLEAN
);
-- График работы
CREATE TABLE IF NOT EXISTS weekdays
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS work_schedule
(
    id               SERIAL PRIMARY KEY,
    opening_time     TIME      NOT NULL,
    closing_time     TIME      NOT NULL,
    haircut_interval INTERVAL  NOT NULL,
    weekend_days     INTEGER[] NOT NULL
);


-- Информация о компании
CREATE TABLE IF NOT EXISTS company_info
(
    id                 SERIAL PRIMARY KEY,
    name               VARCHAR(256),
    address            TEXT,
    phone              VARCHAR(20),
    email              VARCHAR(255),
    slogan             TEXT,
    hours_of_operation TEXT
);

