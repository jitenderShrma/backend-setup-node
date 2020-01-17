function VerifyModuleName_test(req,res,next){
    if(req.params.moduleName == "test"){
        next();
    }
    else{
        res.json({auth:false,message:"BAD REQUEST"});
    }
}

module.exports = VerifyModuleName_test;