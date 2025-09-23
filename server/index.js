const path = require('path');
const cors = require('cors');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const express = require('express');
const db = require("./DB/config.js");
const bodyParser = require('body-parser');
var useragent = require('express-useragent');



////////////////////  middleware

////      raw json Request

const app = express();

// socket server


app.use(cors());
app.use(express.json());
app.use(useragent.express());


///////////////////////////////

////      Form Data Request

// const appMulter = multer();
// const bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(appMulter.array());


/////////////////////////////////////////////

const appDir = path.join(require.main.filename);
console.log("Your root directory is  " + appDir);



///////////////////////////// port

const port = process.env.PORT || 5000;

////////////////////////////////////  Api Routes

const router = require("./Resources/Router/Route.js");
app.use(process.env.ROOT_ROUTES, router);


app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
    console.log("env file is   ", path.resolve(__dirname, './.env'))

});
