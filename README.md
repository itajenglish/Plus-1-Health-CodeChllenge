# Plus-1-Health-CodeChllenge

### Setup Instructions
`Run $ npm install inside root folder`

`Run $ createdb plus1`

`Run $ touch .env inside root folder`

```
Add DATABASE_URL='postgres://your-username-here@localhost:5432/plus1
Add AWS_KEY=your-aws-key-here
Add AWS_SECRET=your-aws-secret-here
```

`Run $ psql -d plus1 -f db/schema.sql`

`Run $ npm start or nodemon app.js`

`App is running at http://localhost:3000`

`Enjoy :D`
