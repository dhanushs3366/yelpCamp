const express = require('express');
const app=express();
const router=express.Router();
const path=require("path");
const methodOverride=require("method-override")
const mongoose = require('mongoose');
const ExpressError=require("./utils/expresError");
const ejsMate=require("ejs-mate");
const session=require("express-session")
const flash=require("connect-flash");

const campgrounds=require("./routes/campgrounds");
const reviews=require("./routes/reviews");

const sessionConfig = {
  secret: "ThisShouldBeABetterSecret",
  resave: false,
  saveUninitialized: true, // Corrected option name
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
};



app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,"public")))

app.engine('ejs',ejsMate);

app.set("view engine",'ejs');
app.set('views',path.join(__dirname,'views'))

app.use(flash())
app.use(session(sessionConfig))

const port = 8080

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
    console.log("Connection open!");
};


app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error")
  next()
})

app.get('/',(req,res)=>{
  const currentUser={username:'Dhanush'}
  res.render("home",{currentUser})

})


app.use("/campgrounds/:id/reviews",reviews);
app.use("/campgrounds",campgrounds);




app.all("*",(req,res,next)=>{
  next(new ExpressError("Page Not Found",404))
})

app.use((err,req,res,next)=>{
  const {statusCode=500}=err;
  if(!err.message){err.message="Oh no something went wrong!!!"}
  res.status(statusCode).render("error",{err});
 
})

app.listen(port, () => {
    console.log(`App is listening on port: ${port}`);
});



