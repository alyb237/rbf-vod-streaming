## 🍑 Resonate Body Fitness VOD Streaming Platform 💪🏽
______________________________________________________
Description:  
------------------------------------------------------
#### A desktop platform where users could subscribe and watch fitness videos online. I created a scalable, distributed architecture that ingests, stores, processes, and delivers video content.
#### Powered by AWS: S3, Cloudfront, Lambda, and MediaConvert.
##### The subscriptions are handled by Stripe and users can view their account billing period. Once the user is subscribed they can stream the videos. Any user can browse the videos list, but only if they are subscribed the videos can be streamed.
######
Functionalities created by: 
-	Next.js: API Routes (TS), Authentication & Authorization, user registration with API route, -	password hashing with bcrypt, redirection of pages when access is not allowed, validate returnTo query parameter using regex, create sessions table with token, session removal after expiry, check for valid sessions, API routes, fetch: GET /api/user, useEffect for calling a rereshing function once, Pass function down via props, call refresh function every time log in, log out or register occurs, restrict viewing of the videos page to the user that owns the account, creating database functions to be secure (adding a join query), CSRF mitigation, adding CSRF_SECRET_SALT to: ( .env.example and .env ), GitHub Actions, Heroku, Testing with Playwright and Jest, PostgreSQL migrations with Ley, CRUD (Create, Read, Update, Delete) queries via Next.js getServerSideProps in pages, Typing props, Typing useState - hovering to get original type of setter function, Typing events, Typing API handlers, including response and request, Typing database functions, Databases, PostgreSQL, psql, exipry timestamp function date conversion.










![Screenshot of AWS slide one](https://github.com/alyb237/rbf-vod-streaming/blob/main/public/slide1.PNG "AWS slide one info")
![Screenshot of AWS slide two](https://github.com/alyb237/rbf-vod-streaming/blob/main/public/slide2.PNG "AWS slide two info")
![Screenshot of AWS slide three](https://github.com/alyb237/rbf-vod-streaming/blob/main/public/slide3.PNG "AWS slide three info")
![Screenshot of AWS slide four](https://github.com/alyb237/rbf-vod-streaming/blob/main/public/slide4.PNG "AWS slide four info")





##### Test cards: https://www.memberstack.com/blog/stripe-test-cards
##### DrawSQL: https://drawsql.app/student-636/diagrams/users#
##### Figma AWS icons: https://www.figma.com/file/n5BDQnLR08N0H8oZsdXDhK/Final-AWS-diagram?node-id=0%3A1 

