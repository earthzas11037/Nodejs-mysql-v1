const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(cors());
// parse requests of content-type - application/json
app.use(bodyparser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended:false}));


// api
const auth_api = require('./routes/auth.routes');
const user_api = require('./routes/user.routes');

// call api
app.use("/api/auth", auth_api);
app.use("/api/user", user_api);

// app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });


//if we are here then the specified request is not found
app.use((req, res, next)=> {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
})

//all other requests are not implemented.
app.use((err, req, res, next) => {
    res.status(err.status || 501);
    res.json({
        error: {
            code: err.status || 501,
            message: err.message
        }
    });
});


//module.exports = app;
const port = process.env.PORT || 5000;

app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`)
})