## first step cretae db
 - npx sequilze db : create

## second step
 - npx sequelize model:generate --name Airplane --attributes modelNumber:string, capacity:integer; 
  - it will create migration file and model file for you will not create table for u though. need to migrate migration file first.

 ## 3rd step
 - npx sequelize db:migartion
 - it create table and meta data for track in db   
 

 