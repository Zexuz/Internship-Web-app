# Internship-Web-app
My Internship task


Port: 3000

##Api

localhost/\<service>/\<version>/\<path>

All data is returned with a statuscode (200 for success) and in the format **{success:boolean,data:object}**


###CartService/v1
####GET /Cart
  Returns my cart

####POST /Cart
  Adds a item in my cart
  
####DELETE /Cart
  Emptyies my cart
  
###ItemService/v1
####GET /Items
  Returns all items in the database
  
 
###UserService/v1
####POST /User/login
  Requiers a token from google sign in
  
  Can be a query string or json body
  

