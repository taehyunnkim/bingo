const express = require('express');
const app = express();
const INVALID_PARAM_ERROR = 400;
const SERVER_ERROR = 500;

app.use(express.static('public'));
const PORT = process.env.PORT || 8080;
app.listen(PORT);