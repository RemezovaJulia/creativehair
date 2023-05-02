CREATE TABLE IF NOT EXISTS employees
(
    id             SERIAL PRIMARY KEY,
    login          VARCHAR(255) NOT NULL,
    password       VARCHAR(255) NOT NULL,
    name           VARCHAR(255) NOT NULL,
    phone          VARCHAR(20)  NOT NULL,
    email          VARCHAR(255) NOT NULL,
    role_id        INTEGER      NOT NULL,
    created_by     INTEGER REFERENCES employees (id),
    hire_date      DATE         DEFAULT CURRENT_DATE,
    dismissal_date DATE,
    active         BOOLEAN        DEFAULT true,
    total_earnings DECIMAL(10, 2) DEFAULT 0.00
);

CREATE TABLE IF NOT EXISTS employee_gallery
(
    id          SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees (id) ON DELETE CASCADE,
    image_url   VARCHAR(255) NOT NULL,
    caption     VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS roles
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS services
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255)   NOT NULL,
    description TEXT,
    min_price   NUMERIC(10, 2) NOT NULL,
    max_price   NUMERIC(10, 2) NOT NULL,
    employee_id INTEGER REFERENCES employees (id)
);

CREATE TABLE employees_services
(
    employee_id INTEGER REFERENCES employees (id),
    service_id  INTEGER REFERENCES services (id),
    PRIMARY KEY (employee_id, service_id)
);

CREATE TABLE IF NOT EXISTS company_info
(
    id                 SERIAL PRIMARY KEY,
    name               VARCHAR(255),
    address            TEXT,
    phone              VARCHAR(20),
    email              VARCHAR(255),
    slogan             TEXT,
    hours_of_operation TEXT
);


CREATE TABLE IF NOT EXISTS appointments
(
    id               SERIAL PRIMARY KEY,
    client_name      VARCHAR(255),
    client_phone     VARCHAR(20),
    appointment_time TIMESTAMP NOT NULL,
    service_id       INTEGER REFERENCES services (id),
    employee_id      INTEGER REFERENCES employees (id)
);

CREATE TABLE IF NOT EXISTS employee_photos
(
    id          SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees (id) ON DELETE CASCADE,
    image_url   VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS weekdays
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS schedules
(
    id           SERIAL PRIMARY KEY,
    employee_id  INTEGER REFERENCES employees (id),
    weekday_id   INTEGER REFERENCES weekdays (id),
    start_time   TIME     NOT NULL,
    end_time     TIME     NOT NULL,
    break_length INTERVAL NOT NULL
);

CREATE TABLE IF NOT EXISTS employee_schedules
(
    id          SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employees (id),
    schedule_id INTEGER REFERENCES schedules (id)
);
