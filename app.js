const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
// initialize our express app
const app = express();

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});