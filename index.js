const express = require('express')
const cors = require('cors')
const Razorpay = require('razorpay')
const jwt= require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const Order = require('./models/User')
const Login =require('./models/User')
const Data = require('./models/Card')
const mongoose = require('mongoose')



require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors({
  credentials: true,
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://suhailka744:iu5Y0TI23BEpLQSF@text-pro-db.orzgsof.mongodb.net/?retryWrites=true&w=majority&appName=text-pro-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});




const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.get('/api', (req,res)=>{
  res.send('<h1>hello api</h1>')
});

//card route

app.get('/api/card', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/order', async (req, res) => {
  try {
    const order = new Order(req.body)
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/payment', async (req, res) => {
  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: "receipt_order_74394",
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).send('Something went wrong');
  }
});


//login route

app.post('/api/login', async (req, res)=>{
  const {email, password  } = req.body

  try{
    let user = await Login.findOne({email})

    if(!user){
         const hashPassword =await bcrypt.hash(password, 10)
         user = new Login({email, password:hashPassword})
         await user.save()
    }
    else{
      const isMatch= await bcrypt.compare(password, user.password)

      if(!isMatch){
        res.status(400).json({message:'invalide password'})
      }
    }

    const token= jwt.sign({userId: user._id}, process.env.JWT_SECRET ,{expiresIn:'1h'})

    res.json({ token, message: user.isNew ? 'User created' : 'Login successful' });
  }

  catch(err){
    console.log(err);
   res.status(500).send('someting went worng')
  }
})



app.listen(port, () => console.log(`Server running on port ${port}`));
