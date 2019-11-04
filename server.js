let express = require("express")
let mongodb = require("mongodb")
var MongoClient = require('mongodb').MongoClient;
let body = require("body-parser")
let path = require("path")
let nodeMailer = require('nodemailer');
let app = express()

app.use(body.json())
app.use(body.urlencoded({extended:false}));

let url = 'mongodb://Bryan224:Julie1234@ds163650.mlab.com:63650/paddys'
let base;
let reserves;
let signups;

MongoClient.connect(url, { useNewUrlParser: true }, (err, database) => {
  if(err) return console.error(err)
   base = database.db('paddys').collection('site_data');
   reserves = database.db('paddys').collection('reservations');
   signups = database.db('paddys').collection('signups');
   app.listen(3000, () => {
     console.log('paddy site with react', path.join(__dirname, '../paddys/dist'))
   })
})

// get site data

app.get("/", (req,res) => {
  app.use(express.static(path.join(__dirname, '../paddys/dist')));
  res.sendFile(path.join(__dirname, '../paddys/dist'), 'index.html')
});

app.get("/api/get", (req, res) => {
     base.find({_id: req.query.id}).toArray((err, data) => {
       if (err) console.error(err)
       res.json(data[0])
     })
})

// updates sites

app.put("/api/update", (req, res) => {
    base.updateOne({_id:req.body.id}, {$set: {data:req.body.data}}).catch(e => console.log(e))
})

app.post('/api/signup', (req, res) => {
  signups.find({email:req.body.email.toLowerCase()}).toArray((err, data) => {
    if(err) console.error(err)
    else if(!data.length) {
      signups.insertOne({email:req.body.email.toLowerCase(), date:req.body.date})
      res.json("success")
    } else {
      res.json({res:"email already exists"})
        }
      })
    })

app.post("/api/reserve", (req, res) => {
  reserves.insertOne({
        name: req.body.data.appointment_name,
        size: req.body.data.appointment_size,
        time: req.body.data.appointment_time,
        date: req.body.data.appointment_date,
    })
    res.json(req.body.data)
  })

  app.post('/api/contact', (req, res) => {
    // console.log(req, res, 'the stuff in the server')
  let transporter = nodeMailer.createTransport({
    service:"hotmail",
    auth: {
      user:"bryan224@live.com",
      pass: "leon1234"
    }
  });
  let mailOptions = {
    from:'${req.body.email}',
    to: 'bryan224@live.com',
    subject:'From Your Devoted Fans',
    text:'this is a test' + req.body.name + req.body.email + req.body.text,
    html:'<p><ol><ul>name: ' + req.body.name + '</ul><ul> Email: '+ req.body.email +'</ul><ul>Message: '+ req.body.text +'</ul></ol>',
  }
  transporter.sendMail(mailOptions, function(err, info) {
    if(err) {
      console.log(err);
      res.redirect('/')
    } else {
      console.log("message sent");
      res.redirect('/')
    }
  })
});
