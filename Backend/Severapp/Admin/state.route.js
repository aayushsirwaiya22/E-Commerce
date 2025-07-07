
const express = require ("express");
const StateRoute =express.Router();
var State = require("./state.model");

// save Product category
StateRoute.route("/save").post((req,res)=>{
    const state = new State(req.body);
    state.save().then(()=>{
        res.send("Data Saved");
        res.end();
    }).catch((err)=>{
        res.send((err))
        res.end();

    });
})


//show all State 

StateRoute.route('/show').get((req,res)=>{
    State.find().then((State)=>{
        res.send(State);
        res.end();

    }).catch((err)=>{
        res.send(err);
        res.end();

    });
});

//Search State
StateRoute.route('/search/:stid').get((req,res)=>{
    State.findOne({"StId":req.params.stid}).then((State)=>{
        res.send(State);
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();

    });
});
//Update State
StateRoute.route("/update").put((req,res)=>{
    State.updateOne({"StId":req.body.StId},{"StId":req.body.StId,"StName":req.body.StName,"Status":req.body.Status})
    .then(()=>{
        res.send("Data Updated");
        res.end();
    }).catch((err)=>{
        res.send((err))
        res.end();

    });
})
//delete state :-modify state status active to inactive
StateRoute.route("/delete/:stid").delete((req,res)=>{
    State.updateOne({"StId":req.params.stid},{"Status":"inactive"})
    .then(()=>{
        res.send("Data Deleted");
        res.end();
    }).catch((err)=>{
        res.send((err))
        res.end();

    });
})

module.exports=StateRoute;


