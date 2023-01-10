const express = require('express');
require('dotenv').config()
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB=require('./config/db')

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}))

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is running at ${port}`);
})