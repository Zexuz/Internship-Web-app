# Internship-Web-app
This is my 5 weeks Internship WEB-SPA

It's a mini prototype of a online cash-register.

It is built on nodejs as a RESTful API and angularjs as a GUI.



## Install
  ``$ git clone https://github.com/Zexuz/Internship-Web-app``
  
 `` $ npm install``
  
  ``$ cd public``
  
  ``$ bower install``
  
 `` $ cd ..``
  
 `` $ npm start``
  
  It should now run on port 3000
  
  If edits where made in the public/lib, run the ```.bat``` file before running ``npm start``

  To make the debug output work add this to your environment vars ```DEBUG=REST:```

# Testing

```npm test``` will run mocha and all our test cases. (You do need to get a new google token once every 30 min, can be done be checking the login request in the browser or it will fail)

## Api

localhost:3000/\<service>/\<version>/\<path>

All data is returned with a status code (200 for success) and in the format ```{success:boolean,data:object}```


### CashierService/v1/Cashier/
 
#### GET ```/```
     
  Required query params: **key**  
  Optional query params: **none**  
  Full path example: ```CashierService/v1/Cashier/?key=<subjectKey>```  
  Returns : **List of all logged in cashiers**  
    
##### Descriptions:
     
  Returns all logged in cashiers
  


#### POST ```/```
   
  Required query params: **token**  
  Optional query params: **none**  
  Full path example: ```CashierService/v1/Cashier/?token=<googleToken>```  
  Returns : **googleObject**  
  
##### Descriptions:
   
  Logs the cashiers online, returns a googleUser object. **Save the sub key, it's your key**



#### DELETE ```/```
   
  Required query params: **key**  
  Optional query params: **none**  
  Full path example: ```CashierService/v1/Cashier/?key=<subjectKey>```  
  Returns : **boolean**  
  
##### Descriptions:
   
  Logs the cashiers out


### CashierService/v1/Cashier/Cart/
  
#### GET ```/```
   
  Required query params: **Key**  
  Optional query params: **none**  
  Full path example: ```CashierService/v1/Cashier/Cart/?key=<subjectKey>```  
  Returns : **My cart**  
  
##### Descriptions:
   
  Returns my cart
  
#### POST ```/```
   
  Required query params: **Key, sku**  
  Optional query params: **none**  
  Full path example: ```CashierService/v1/Cashier/Cart/?key=<subjectKey>```  
  Returns : **My cart**  
  
##### Descriptions:
   
  Adds a item in my cart
  
#### DELETE ```/```
   
  Required query params: **Key**  
  Optional query params: **none**  
  Full path example: ```CashierService/v1/Cashier/Cart/?key=<subjectKey>```  
  Returns : **My cart**  
  
##### Descriptions:
  Empties my cart


### CashierService/v1/Cashier/Cart/Receipt
  
#### GET ```/```
   
  Required query params: **Key**  
  Optional query params: **none**  
  Full path example: ```CashierService/v1/Cashier/Cart/Receipt?key=<subjectKey>```  
  Returns : **A receipt**  
  
##### Descriptions:
   
  Returns a receipt based on what's in my cart.

### ItemService/v1/Items
#### GET  ```/```
   
  Required query params: **none**  
  Optional query params: **none**  
  Full path example: ```CashierService/v1/Cashier/Cart/?key=<subjectKey>```  
  Returns : **List of all products in our database**  
  
##### Descriptions:
  Used to get a list of all products in our database (ATM products from best buy)
  

