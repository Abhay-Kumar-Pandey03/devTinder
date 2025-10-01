const express = require('express');

const app = express();

app.use("/", (err, req, res, next) => {
    if(err)
    res.status(500).send("Error message : " + err.message);
});

app.use("/data", ( req, res) => {
    try{
        throw new Error("dsidnc");
        res.send("Data sent successfully");
    }
    catch(err){
        res.status(500).send({message: err.message});
    }

});

app.use("/", (err, req, res, next) => {
    if(err)
    res.status(500).send("Error message : " + err.message);
});

app.listen(3000, () =>{
    console.log("Server is successfully running on port 3000");
});






