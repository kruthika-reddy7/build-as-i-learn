# Build-as-i-learn

### 7 june 2026
 Implemented small login auth.
  
 user register -> backend response with registered successfully -> user login request by credentials -> backend authenticates and sends response -> if authorized user websites navigates to dashboard otherwise displays error message 

 I haven't used any database for now , i implemented by storing these credentials in form of array of objects.
### ------------
 ### 8 june 2026
  implemented bcrypt hashing and protected routes
### ------------
### 9 june 2026
 implemented jwt Authentication by localstorage and handled duplicate users while registering.
### ------------
 ### 10 june 2026
 connected pgsql through POOL. 
### ------------
 ### 12 june 2026
 made  database queries for login and register . Big relied from in-memory array where data gets lost after server refresh . 
### ------------
 ### 13 june 2026

 I had to first verify if evrything in my basic auth app is on production level so i claude before moving on to postgresql  deeply to cover what features i am missing , and i made proper error handling , .env file created and implemented ratelimiting . 
 # Next target: 
implement refreshtoken and accesstoken. 
### ------------