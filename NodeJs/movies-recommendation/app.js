const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Serie = require("./models/Serie")

mongoose.connect("mongodb://127.0.0.1:27017/seriesDB")
.then(()=> console.log("DB CONNECTED!"))
.catch((err)=> console.log(err))

app.set("view engine", "ejs");

app.set("views",path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, "public", "js")))

app.get("/", (req,res)=>{

    res.render("index")
})

app.get("/search", async(req,res)=>{

    const {q} =  req.query;

       const series = await Serie.find({ name: { $regex : `^${q}`}});

       console.log(series)
      
      res.status(200).json(series)

})

app.listen(5000, ()=>{

    console.log("server running at port 5000")



})