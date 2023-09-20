const express = require("express");
const routers = require('./routers/country')

const app = express()

app.use(express.json())
app.use(routers); 

module.exports=app;