# Pygma microservices

## Description
This system split Pygma microservices, allowing for better scalability, fault isolation, and ease of development. Each microservice can be deployed and scaled independently and can quickly add new features and fix bugs without affecting the entire system.

The system design is as follows:

TODO: Image with the system flow

And the description of the services are as follows:

* ###### Auth Service: 
    This service is a centralized authentication and authorization server that will use **JWT (JSON Web Token)** to create and validate the requests.

* ###### API Gateway: 
    This service act as the point of entry for the system. This will route the requests to the corresponding microservices using **Spring Cloud Gateway**.

* ###### Service Discovery: 
    This is the Client-side service discovery allowing the other services to find and communicate with each other without hard-coding the hostname and port using **Spring Cloud Netflix Eureka** which also provides a simple round-robin load balancing solution.
  
* ###### Application Service: 
  This service is responsible for the startups applications to the batches, it is responsible for CRUD operations of applications.

## Communication
As mentioned before, the communication between the services is achieved using **Spring Cloud OpenFeign**, a declarative HTTP client that allows for easy communication between microservices using RESTful APIs, and using **Spring Cloud Netflix Hystrix** to add a layer of fault tolerance when the communication between service fails, so it will open the circuit and forward the call to a fallback method.

## Storage
For the sake of simplicity and meanwhile this wil continue being a Demo, this project uses H2 as a database embedded in the Applications service, and handles the multiple data type using a CLOB column in the database and a special serializer and deserializer to transform to the respective type. However, in a real-life scenario where different data types is expected and a high volume of data needs to be managed, with more reads than writes with the need of easy scalability, I would recommend using a NoSQL database like a **MongoDB**, which is a document database where is not require data to fit into a rigid structure of relational rows and columns, storing all related data together within a single document.

## Consuming
To consume the service, the Postman JSON collection "Pygma.postman_collection.json" can be used, which has the different requests for:
* Authentication service
* Application service CRUD

As every service and request is secured but the login authentication, you should start by requesting the Get Token ("http://localhost:8080/api/v1/auth/login"") with the test credentials:

{
"username": "test",
"password" : "test"
}

The rest of the JSON and request endpoints can be found in the Postman collection.

