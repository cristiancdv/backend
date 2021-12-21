const express = require("express");

const app = express();



app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/public', express.static(__dirname + '/storage/image', { limit: "5000kb" }))

module.exports = app