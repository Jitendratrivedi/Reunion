

const auth1 = async function (req, res, next) {
  
    try{
    let token = req.headers["X-api-key"];
    if(!token) token = req.headers["x-api-key"]
    if (!token) {
      return res.status(400).send({ status: false, message: "KINDLY ADD TOKEN" });
    }
    
    const decodedtoken = jwt.verify(token, "Reunion");
    
    req.decodedtoken = decodedtoken;
  
  
    next();
  }catch(error){
    if(error.message=="invalid signature") return res.status(403).send({status:false,message:"Invalid signature"})
    if(error.message=="jwt expired") return res.status(403).send({status:false,message:"Token Got expired"})
    res.status(500).send({status: false,message:"INVALID SIGNATURE"})
  }}

  module.exports={auth1}