## Postman test

login
{
"email": "admin@gmail.com",
"password": "password"
}

syncCart
{
"cart": {
"15": {
"quantity": 2
}
}
}

createprodcut
{
"product_id": 13,
"quantity": 2
}

{
"cart_id": 63,
"product_id": 14,
"quantity": 1
}

## SQL command

alter table carts
drop constraint dele;

carts_user_id_fkey

alter table orders
add constraint user_id_fkey
foreign key (user_id)
references users (id)
on delete cascade;

alter table carts
add constraint carts_user_id_fkey
foreign key (user_id)
references users (id)
on delete cascade;

ALTER SEQUENCE users_id_seq RESTART WITH 2;

INSERT INTO users(email)
VALUES ('kevin');

## 10.06 - UseEffect in delete admin

- khi useEffect fetch all user, no se can thoi gian de cap nhat allUser, neu ma setdata ngay trog useEfect voi fetch thi se ko cap nhat kip data, dan den xoa nhung UI van ko xoa
- Solution: useEffect check alluserstatus, neu ma no suceed thi moi setdata -> pass xuong tableantd ( o trog tableantd co useEffect se setdata thi nao cai props thay doi)

## 11.06 - Cookie

- cookie parser giup attatch cookie vao request khi access endpoint
- o auth controller res.cookie va res.send giup tao cookie va luu trog browser
- o fe khi post axios login thi phai withcredential
  ablauf:

1. express dung passport de authenticate with local strtegy. neu ok (config check pass o trog passportjs) -> set token jwt sign, set cookie with token, status success, send back.
2. khi access endpoint dung passport authenticate jwt -> check jwtsecret, extract jwt token from cookie
   - When a user visits a protected route, they will attach their JWT to the HTTP Authorization header
   - passport-jwt will grab that value and parse it using the ExtractJwt.fromAuthHeaderAsBearerToken() method.
   - passport-jwt will take the extracted JWT along with the options we set and call the jsonwebtoken library’s verify() method.
   - If the verification is successful, passport-jwt will find the user in the database, attach it to the req object, and allow the user to visit the given resource.

## 12.06 - Google login

### Variable to set in heroku

[] GOOGLE_FRONT_END_REDIRECT_URL 
[X] GOOGLE_CLIENT_ID
[X] GOOGLE_CLIENT_SECRET
[] GOOGLE_CALLBACK_URL

## 13.06

### Google oath flow

1. /auth/google -> passport authenticate redirect to google authenticate page(using passport stratergy), then check if user already in db? if not then create user and create cart. ( return: user va redirect to /api/auth/google/redirect )
2. /api/auth/google/redirect -> dung user tu buoc 1, sign jwt va luu trog cookie va redirect ve FE

->The square brackets property accessor has the following syntax:
->cart ["test"] se ra a , cart[3] se ra 4
->The first expression should evaluate to an object and the second expression should evaluate to a string denoting the property name.

- convert to object bang object assign: Object.assign({}, ['a','b','c']); // {0:"a", 1:"b", 2:"c"}

## 14.06

[X] Fix Nav is hiding Product List
div className="mt-24"

[X] Finish CheckOut page

[X] Fix when accesing /cart, wait for all producst to load complety before using it
Use spinner and wait for fetchstatus=succedded

## 15.06
- User can checkout. In checkout page, dispatch checkout(), which will (in BE) retrieve the cart_id and user_id from passport object. Then it will 
[X] FInish checkout api (order)
can order, add order to BE
[X] Stripe 

## 16.06
[X] Add helmet to FE and BE ( remember to add helmetprovider tag to index js)
[X] order history page
[] product page

## 17.06 
[X] Fix build error. Cause: content security policy prevents app from using scripts and images from other sites. Fix: install chrome disable content policy- extension 
 -> dont know if this error still exist when deploy

