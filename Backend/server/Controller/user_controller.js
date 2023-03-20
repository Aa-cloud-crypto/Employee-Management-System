const Userdb = require("../model/user");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 10;
exports.CreateUser = (req,res)=>{
  if(!req.body){
    res.status(404).send({message:"Fields cannot be Empty!"});
    return
  }
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
   const newUser = new Userdb({
    email:req.body.email,
    password:hash
  })
  newUser.save()
       .then((data)=>{
        jwt.sign(
        {id:data.id},
        process.env.JWT_SECRET,
        {expiresIn:'24h'},
        (err,token)=>{
            if(err) throw err;
             res.status(201)
                 .json({token,data})
        }
        )
       })
       .catch((err)=>{
        res.status(500).json({ message: 'Error while creating User' });
    });
});
}
exports.UserLogin = async (req, res) => {
    const {email, password} = req.body;
    try {
      const foundUser = await Userdb.findOne({ email: email });
      const isMatch = await bcrypt.compare(password,foundUser.password);
      if(isMatch) {
        jwt.sign(
            {id:foundUser.id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'},
            (err,token)=>{
                if(err) throw err;
                 res.status(200)
                     .json({token,foundUser})
                    })
      }else{
    res.status(401).send('Invalid credentials.');
    }   
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error.');
    }
  };
  