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

To make the debug output work add this to your envoriment vars **"DEBUG=REST:*"**

## Api

localhost/\<service>/\<version>/\<path>

All data is returned with a statuscode (200 for success) and in the format **{success:boolean,data:object}**


### CartService/v1
#### GET /Cart
  Returns my cart

#### POST /Cart
  Adds a item in my cart
  
#### DELETE /Cart
  Empties my cart
  
#### GET /Cart/Receipt
Returns a Receipt from my cart.
  
### ItemService/v1
#### GET /Items
  Returns all items in the database
  
 
### UserService/v1
#### POST /User/login
  Requiers a token from google sign in
  
  Can be a query string or json body
  

