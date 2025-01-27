# Database Schema Design

## Tables

### 1. Airplanes
| Column      | Type    | Constraints                |
|-------------|---------|---------------------------|
| id          | INTEGER | PRIMARY KEY AUTO_INCREMENT|
| modelNumber | STRING  | NOT NULL, UNIQUE         |
| capacity    | INTEGER | NOT NULL                 |
| createdAt   | DATE    | NOT NULL                 |
| updatedAt   | DATE    | NOT NULL                 |

### 2. Cities
| Column    | Type    | Constraints                |
|-----------|---------|---------------------------|
| id        | INTEGER | PRIMARY KEY AUTO_INCREMENT|
| name      | STRING  | NOT NULL, UNIQUE         |
| createdAt | DATE    | NOT NULL                 |
| updatedAt | DATE    | NOT NULL                 |

### 3. Airports
| Column    | Type    | Constraints                |
|-----------|---------|---------------------------|
| id        | INTEGER | PRIMARY KEY AUTO_INCREMENT|
| name      | STRING  | NOT NULL, UNIQUE         |
| code      | STRING  | NOT NULL, UNIQUE         |
| cityId    | INTEGER | FOREIGN KEY REFERENCES Cities(id) |
| address   | STRING  | NOT NULL                 |
| createdAt | DATE    | NOT NULL                 |
| updatedAt | DATE    | NOT NULL                 |

### 4. Seats
| Column     | Type    | Constraints                |
|------------|---------|---------------------------|
| id         | INTEGER | PRIMARY KEY AUTO_INCREMENT|
| row        | INTEGER | NOT NULL                 |
| col        | STRING  | NOT NULL                 |
| airplaneId | INTEGER | FOREIGN KEY REFERENCES Airplanes(id) |
| seatClass  | ENUM    | ['ECONOMY', 'BUSINESS', 'FIRST'] |
| createdAt  | DATE    | NOT NULL                 |
| updatedAt  | DATE    | NOT NULL                 |

### 5. Flights
| Column              | Type    | Constraints                |
|--------------------|---------|---------------------------|
| id                 | INTEGER | PRIMARY KEY AUTO_INCREMENT|
| airplaneId         | INTEGER | FOREIGN KEY REFERENCES Airplanes(id) |
| departureAirportId | STRING  | FOREIGN KEY REFERENCES Airports(code) |
| arrivalAirportId   | STRING  | FOREIGN KEY REFERENCES Airports(code) |
| arrivalTime        | DATE    | NOT NULL                 |
| departureTime      | DATE    | NOT NULL                 |
| totalSeats         | INTEGER | NOT NULL                 |
| price             | INTEGER | NOT NULL                 |
| boardingGate      | STRING  |                          |
| createdAt         | DATE    | NOT NULL                 |
| updatedAt         | DATE    | NOT NULL                 |

## Relationships

1. City -> Airports: One-to-Many
2. Airplane -> Seats: One-to-Many
3. Airplane -> Flights: One-to-Many
4. Airport -> Flights (as departure): One-to-Many
5. Airport -> Flights (as arrival): One-to-Many

## Indexes

1. Airports: cityId
2. Seats: airplaneId
3. Flights: airplaneId, departureAirportId, arrivalAirportId
4. Cities: name
5. Airplanes: modelNumber