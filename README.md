# Internship-Web-app
My Internship task


Port: 3000

##Api

localhost/\<service>/\<version>/\<path>

All data is returned with a statuscode (200 for success) and in the format **{success:boolean,data:object}**


###BasketService/v1
####GET /Basket
  Returns my basket

####POST /Basket
  Adds a item in my basket
  
####DELETE /Basket
  Emptyies my basket
  
###ItemService/v1
####GET /Items
  Returns all items in the database
  
 
###UserService/v1
####POST /User/loginn
  Requiers a token from google sign in
  
  Can be a query string or json body
  

