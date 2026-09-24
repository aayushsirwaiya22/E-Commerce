const express=require('express')
const cityRoute=express.Router()
const City=require("./city.model")


//save city
cityRoute.route("/save").post((req,res)=>{
    let city=new City(req.body)
    city.save().then(data=>{
        res.send("City Information saved")
    }).catch(err=>{
        res.send(err)
    })
})

//search city
cityRoute.route("/search/:ctid").get((req,res)=>{
    City.findOne({"ctid":req.params.ctid}).then(city=>{
        res.send(city)
    }).catch(err=>{
        res.send(err)
    })
})

//update city
cityRoute.route('/update').put((req,res)=>{
    City.updateOne({"ctid":req.body.ctid},{"ctid":req.body.ctid,"ctname":req.body.ctname,"stid":req.body.stid,"status":req.body.status}).then(data=>{
        res.send("Updated successfully")
    }).catch(err=>{
        res.send(err)
    })
})

//delete enable or disable
cityRoute.route('/delete/:ctid').delete((req,res)=>{
    City.updateOne({"ctid":req.params.ctid},{"status":0}).then(city=>{
        res.send("City disabled successfully")
    }).catch(err=>{
        res.send(err)
    })
})

//show all
cityRoute.route("/show").get((req,res)=>{
    City.find({"status":1}).then(city=>{
        res.send(cityarr)
    }).catch(err=>{
        res.send(err)
    })
})

//show all city by state id   
cityRoute.route("/showallcitybystate/:stid").get((req,res)=>{
    City.find({$and:[{"status":1},{"stid":req.params.stid}]}).then(city=>{
        res.send(city)
    }).catch(err=>{
        res.send(err)
    })
})

//show all city irrespective of status
cityRoute.route('/getall').get((req,res)=>{
    City.find().then(city=>{
        res.send(city)
    }).catch(err=>{
        res.send(err)
    })
})

//search city by name to avoid duplicate entry
cityRoute.route('/searchbyname/:ctname').get((req,res)=>{
    City.findOne({"ctname":req.params.ctname}).then(city=>{
        res.send(city)
    }).catch(err=>{
        res.send(err)
    })
})

module.exports=cityRoute;