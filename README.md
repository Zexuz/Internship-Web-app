# Internship-Web-app
My Internship task


## Install
  ``$ git clone <repop>``
  
 `` $ npm install``
  
  ``$ cd public``
  
  ``$ bower install``
  
 `` $ cd ..``
  
 `` $ npm start``
  
  It should now run on port 3000
  
  If edits where made in the public/lib, run the ```.bat``` file

  To make the debug output work add this to your envoriment vars ```DEBUG=REST:```

# OBS THIS INFO IS NOT ACTIVE

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
  Used to get a list of all products in our database (atm products from best buy)
  

