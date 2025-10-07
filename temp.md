## What is a DB Transaction?

- In real life scenarios, a transaction is a sequence of operations that are treated as a single unit of work. If any of the operations fail, the entire transaction fails, and the database is left unchanged.

 - its set of crud opreations called Transaction

- We might do a club of crud opeartions.

- These series of operations can execute in a single unit of work. Hence these series of operations are called as DB transactions.

- Now during the transaction execution our db might go through a lot of changes and can be in an inconsistent state.
  e.g. if we are transferring money from one account to another, then the money should be deducted from one account and added to another account. If the money is deducted from one account and not added to another account, then the db is in an inconsistent state.

  - So in such cases, We have `ACID` properties to maintain the consistency of the database.

    - `ACID` stands for `Atomicity`, `Consistency`, `Isolation`, and `Durability`.
 ---
  1 - `Atomicity`: It means that all the operations in a transaction are treated as a single unit of work. If any of the operations fail, the entire transaction fails, and the database is left unchanged. It is an all or nothing concept.

  - That is why when we use transactions, There is we have diffrerent states of the transaction.
    `Begin` : It is the start of the transaction.

    `Active` : It is the state where the transaction is executing.

    `Partially Committed` : It is the state where the transaction has executed all the operations and is about to commit the transaction.

        `Committed` : It is the state where the transaction has executed all the operations successfully and the  transaction is committed.

        `Failed` : It is the state where the transaction has failed and the transaction is rolled back.

        `Aborted` : It is the state where the transaction has failed and the transaction is rolled back.

         Begin -> Active -> Partially Committed -> Committed
         Begin -> Active -> Failed -> Aborted

        ![alt text](image-2.png)

  - so if we are transferring money from one account to another, then the money should be deducted from one account and added to another account. If the money is deducted from one account and not added to another account, then the db is in an inconsistent state. So in such cases, we can rollback the transaction.To mauaintain the atomicity of the transaction.

 ---

2 - `Conistency` : It means that the database should be in a consistent state before and after the transaction. In other words, the database should follow all the constraints, triggers, and cascades before and after the transaction. eg. If we are transferring money from one account to another, then the money should be deducted from one account and added to another account. If the money is deducted from one account and not added to another account, then the db is in an inconsistent state.

---

3 - `Isolation` : It means that the transactions should be executed in isolation. One transaction should not interfere with another transaction. eg. If we are transferring money from one account to another, then the money should be deducted from one account and added to another account. If the money is deducted from one account and not added to another account, then the db is in an inconsistent state. Because here the two transactions are interfering with each other where one transaction is deducting the money and another transaction is not adding the money. So to avoid such cases, we have the isolation property.

---

4 - `Durability` : It means that the changes made by the transaction should be permanent. Once the transaction is committed, the changes made by the transaction should be permanent. Even if the system crashes, the changes made by the transaction should be permanent. eg. If we are transferring money from one account to another, then the money should be deducted from one account and added to another account. If the money is deducted from one account and not added to another account, then the db is in an inconsistent state. So to avoid such cases, we have the durability property.

## Isolation Levels

### Read Uncommitted
- Lowest isolation level.
- Allows dirty reads.
- Transactions can read uncommitted changes made by other transactions.

### Read Committed
- Prevents dirty reads.
- Transactions can only read committed changes made by other transactions.

### Repeatable Read
- Prevents dirty reads and non-repeatable reads.
- Once a row is read, it cannot be modified by other transactions until the current transaction completes.

### Serializable
- Highest isolation level.
- Prevents dirty reads, non-repeatable reads, and phantom reads.
- Transactions are completely isolated from each other.




 ## some intresting problems with my airways booking system payment 
   
   1- same seat selected by two users at the same time.
   2 - one seat and two cunccren users are trying to book the same seat at the same time.
   3 - payment realted issues 
  -- raise the req but  internet is down
  -- raise req and reach  payment serveice but can not able to process because of(eg : payment gateway is down , card is not working , bank is not responding) 
  -- raise req and payment but payment serveice cannot able to process the payment. But failer response is not reached to the user.
  -- raise req and payment but payment serveice cannot able to process the payment. But failer response is reached to the user
  -- raise req and payment  successfull but response is not reached to the user.
  -- raise req and payment  successfull but response is reached to the user. (happy path) 
  -- payment dedducted twice from the user account.
   -- etc  



- concurrency control 
- isolation levels


(lecture 5)
(Race conditions)
- locking mechanisms
  -shared lock
  -exclusive lock
  -intent lock
  -row level lock

 (mvcc database) 
  
   (in booking system ) - in odrer to avoid handle race conditions

- optimistic vs pessimistic concurrency control  
  



- inter service communication (service one to another service communication) via either http req or rpc
- 


CODE =>
- (flights-SERVICE) (getFlight(ID)) 

- FLIGHT SERVICE ( DECREASE NUMBER OF SEATS ) (FLGHT REPO(UPADTErEAMININGsEATS))

- Flight-booking-service (CREATE BOOKING) 
- makePayemnt (bookin service)



- auth service (as api_gateway_gateway_flights)  
![alt text](image-3.png)




-- API GATEWAY (inside auth service) 
   - rate limiter 

   ![alt text](image-4.png)
 

 - reveserse proxy
 - role based access control (many to many relationship)(through table) 




- Notfication service()(different db (notification db)) (repo => Airline-Noti-Service)
  - nodemailer (gmailpass and email)
  -rabitmq (message broker) (intsall rabitmq server in local machine windows) (start rabitmq uing cmd  )(then open rabitmq admin panel in browser using localhost:15672) (default username and password is guest) 

   
    for connecting to rabitmq server in nodejs install amqplib package all services (flight service , booking service , notification service )
  - install amqplib (npm i amqplib) 




-------- diy---- problem 
  - 3rd problem 2 people want to book the same seat at the same time( cunccurently )(using in indexing in seat_booking table while creting booking inside transaction make it serializable isolation level) (seta_id an d flight id unique key) (if two people try to book the same seat at the same time , one will succeed and another will fail with unique constraint error) (handle the error in booking service and return appropriate response to the user)

