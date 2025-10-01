const adminAuth = (req, res) => {
    const token = "xyz";
    const adminToken = "xyz";
    if(adminToken !== token){
        res.status(401).send("Unauthorized Access");
    }
    else{
        next();
    }
}

const userAuth = (req, res) =>{
    const token = "abc";
    const userToken = "abc";
    if(userToken !== token){
        res.status(401).send("Unauthorized access");
    }
    else{
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth,
}