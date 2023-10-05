const express=require("express");
const router=express.Router();
const catchAsync=require("../utils/catchAsync");
const Campground = require('../models/campgrounds');
const ExpressError=require("../utils/expresError")
const joi=require("joi");
const {campgroundSchema,ratingSchema}=require("../schema.js")

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body.campground);
    if (error) {
      const msg = error.details.map(el => el.message).join(",");
      throw new ExpressError(msg, 400);
    } else {
      next();
    }
}
  


router.get("/", catchAsync(async(req,res)=>{
    const campgrounds= await Campground.find({})
   
    res.render("campgrounds/index",{campgrounds:campgrounds})
}))
  

router.get("/new",(req,res)=>{
    res.render("campgrounds/new")
})

router.post("/", validateCampground,catchAsync(async(req,res)=>{
    // if(!req.body.campground){throw new ExpressError("Not Enough Campground Data",400)}
    req.flash("success","Successfully made a new campgrounnd!")
    const campground=new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}))



router.get("/:id",catchAsync(async (req,res)=>{
    const campground=await Campground.findById(req.params.id).populate('reviews');
    if(!campground){
        res.locals.error=req.flash("error","Cannot find that campground!")
       return res.redirect("/campgrounds")
    }
    res.render("campgrounds/show",{campground})
}))

router.delete("/:id",async (req,res)=>{
    const {id}=req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success","Successfully deleted your campground!");
    res.redirect("/campgrounds");
})


router.get("/:id/edit",catchAsync(async(req,res)=>{

const campground= await Campground.findById(req.params.id)
if(!campground){
    res.locals.error=req.flash("error","Cannot find that campground!")
   return res.redirect("/campgrounds")
}
  res.render("campgrounds/edit",{campground}) 
}))
  
router.put("/:id",catchAsync(async(req,res)=>{
    const prevCampground=await Campground.findByIdAndUpdate(req.params.id,req.body.campground);
    res.redirect(`/campgrounds/${prevCampground._id}`);
}))


module.exports=router;