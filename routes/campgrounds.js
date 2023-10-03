const express=require("express");
const router=express.Router();

app.get("/campgrounds", catchAsync(async(req,res)=>{
    const campgrounds= await Campground.find({})
   
    res.render("campgrounds/index",{campgrounds:campgrounds})
}))
  

app.get("/campgrounds/new",(req,res)=>{
    res.render("campgrounds/new")
})

app.post("/campgrounds", validateCampground,catchAsync(async(req,res)=>{
    // if(!req.body.campground){throw new ExpressError("Not Enough Campground Data",400)}
    const campground=new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}))



app.get("/campgrounds/:id",catchAsync(async (req,res)=>{
    const campground=await Campground.findById(req.params.id).populate('reviews');

    res.render("campgrounds/show",{campground})
}))

app.delete("/campgrounds/:id",async (req,res)=>{
    const {id}=req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds")
})


app.get("/campgrounds/:id/edit",catchAsync(async(req,res)=>{

const campground= await Campground.findById(req.params.id)

  res.render("campgrounds/edit",{campground}) 
}))
  
app.put("/campgrounds/:id",catchAsync(async(req,res)=>{
    const prevCampground=await Campground.findByIdAndUpdate(req.params.id,req.body.campground);
    res.redirect(`/campgrounds/${prevCampground._id}`);
}))
