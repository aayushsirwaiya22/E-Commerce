//server.js file is used to connect route ,model,and database
const express =require ("express");
const app = express();
const bodyParser = require("body-parser");
const PORT=9669 ;
const cors= require("cors")
const mongoose =require("mongoose");
const config = require("./DB.js");
const productCatgRoute = require("./Admin/productcatg.route.js");
const StateRoute= require("./Admin/state.route.js");
const CityRoute= require("./Admin/city/city.route.js");
const VendorRoute=require("./Admin/Vendor/Vendor.route.js");
const ProductRoute=require("./Admin/Product/Product.route.js");
const CustomerRoute=require("./Admin/customer/Customer.route.js");
// const BillRoute =require("./Bill/bill.route.js");
const billRoute = require("./Bill/bill.route.js");
const router = require("./payment.js");
const paymentRouter=require("./paymentDetails/paymentdetails.route.js")

const sendMail = require("./controllers/sendMail.js");
// const emailactivationRoute=require("./emailactivation.js");
// const emailrouter = require("./emailactivation.js");
// const emailrouter=require("./email.model.js")


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/productcatg", productCatgRoute);
app.use("/state",StateRoute);
app.use("/city",CityRoute);
app.use("/vendor",VendorRoute);
app.use("/product",ProductRoute);
app.use("/customer",CustomerRoute);
app.use("/bill",billRoute);
app.use("/PaymentDetails",paymentRouter);
app.use("/payment",router);
// app.use("/emailactivation",emailactivationRoute)
// app.use("/emailrouter",emailrouter)

// app.use("./vendor",VendorRoute);
mongoose.connect(config.URL)
.then(()=>{console.log("Data base is connect "+config.URL)},
    err=>{console.log("Can not connect to the database"+err)}
);
app.listen(PORT,()=>{
    console.log("server is running on Port "+PORT);

})
