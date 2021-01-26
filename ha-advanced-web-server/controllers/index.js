const { user } = require("../models");
module.exports = {
  signInController: async (req, res) => {
    // TODO : 로그인 및 인증 부여 로직 작성
    const userInfo = await user.findOne({ where: { email: req.body.email, password: req.body.password }})
    console.log(userInfo)
    if (!userInfo) {
      res.status(404).send("invalid user")
    } else {
      req.session.email = userInfo.email;
      res.status(200).json({ id: userInfo.username })
    }
  },
  signUpController: (req, res) => {

    
    const count =  Object.keys(req.body).length
    if(count !== 4){
      return res.status(422).send("insufficient parameters supplied")
    }

    user.findOrCreate({ where : { email : req.body.email }, defaults : { email : req.body.email, password : req.body.password, username : req.body.username, mobile : req.body.mobile }}).then((data) => {
      if(data[1] === true ){
        res.status(201).json({ id : data[0].dataValues.id, username : data[0].dataValues.username, email : data[0].dataValues.email, mobile : data[0].dataValues.mobile })
      } else {
        res.status(409).send('email exists')
      }
    }).catch((err) => { })
  },
  signOutController: (req, res) => {
    console.log('세션122323',req.session)
  
      req.session.destroy()
      res.status(205).send('Logged out successfully')
    
  },
  userController: (req, res) => {
    console.log('세션',req.session)
    if(req.session.email){
      user.findOne({ where : { email : req.session.email }}).then((data) => {
        res.status(200).json(data.dataValues)

      })
     
    } else {
      res.sendStatus(401);

    }
  },
};
