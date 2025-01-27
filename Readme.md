# Flight Booking Service Setup Guide

## Prerequisites
- Node.js (v14+)
- PostgreSQL 
- npm/yarn
- Sequelize CLI

## Project Setup

### 1. Initialize Project
```bash
# Create project directory
mkdir flights_booking
cd flights_booking

# Initialize npm project
npm init -y

# Install dependencies
npm install express sequelize pg pg-hstore
npm install --save-dev sequelize-cli nodemon

# Initialize Sequelize
npx sequelize-cli init

# Update config/config.json with database credentials# Create database
npx sequelize-cli db:create

# Generate models
npx sequelize-cli model:generate --name Airplane --attributes modelNumber:string,capacity:integer

npx sequelize-cli model:generate --name City --attributes name:string

npx sequelize-cli model:generate --name Airport --attributes name:string,code:string,cityId:integer,address:string

npx sequelize-cli model:generate --name Seats --attributes row:integer,col:string,airplaneId:integer,seatClass:enum

npx sequelize-cli model:generate --name Flights --attributes airplaneId:integer,departureAirportId:string,arrivalAirportId:string,arrivalTime:date,departureTime:date,price:integer,totalSeats:integer,boardingGate:string

# Run migrations

npx sequelize-cli db:migrate
```


 



