let express = require("express")
let mongodb = require("mongodb")
var MongoClient = require('mongodb').MongoClient;
let body = require("body-parser")
let path = require("path")
let nodeMailer = require('nodemailer');
var csv      = require('csv-express');
let { port, db, service, email, pass, key, secret } = require('./config');
let app = express()

// for digital ocean
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

app.use(body.json({limit: 10000 * 100000 * 100000}))
app.use(body.urlencoded({extended: false, limit: 50000 * 1024 * 1024, maxFieldsSize:20000 * 1024 * 1024 * 1024}));

app.use(express.static(path.join(__dirname, './dist')));

let url = db;
let base;
let reserves;
let signups;
let users;
let images;

MongoClient.connect(url, { useNewUrlParser: true }, (err, database) => {
  if(err) return console.error(err)

   base = database.db('paddys').collection('site_data');
   reserves = database.db('paddys').collection('reservations');
   signups = database.db('paddys').collection('signups');
   users = database.db('paddys').collection('users');
   images = database.db('paddys').collection('images');

   app.listen( port, () => {
     // console.log('paddy site with react', path.join(__dirname, '../paddys/dist'))
     console.log('listening', port)
   })
})

let hashFunction = function(key) {
  var hash = 0;
  if (key.length == 0) return hash;
  for (var i = 0; i < key.length; i++) {
      hash = (hash<<5) - hash;
      hash = hash + key.charCodeAt(i);
      hash = hash & hash;
  }
  return Math.abs(hash);
};

const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');

aws.config.update({
     accessKeyId: key,
     secretAccessKey: secret
   });

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  signatureVersion: 'v4'
});

const upload = multer({
  limits: {
    fileSize: 50000 * 1024 * 1024,
    fieldSize: 50000 * 1024 * 1024,
    fieldNameSize: 50000 * 1024 * 1024
  },
  storage: multerS3({
    s3: s3,
    bucket: 'imagemodeling',
    acl: 'public-read',
    key: (request, file, cb) => {
        let split = file.originalname.split('.')
        let type = split[split.length - 1]
        file.originalname = hashFunction(file.originalname) + "." + type
        cb(null, file.originalname);
      }
    })
  })

// image post

app.post("/api/newImage", (req, res) => {

  let split = req.body.file.name.split('.')
  let type = split[split.length - 1]
  req.body.file.name = hashFunction(req.body.file.name) + "." + type
  let fileName = req.body.file.name

  if(req.body.update) {
    images.findOneAndUpdate(
      {
        image_id:req.body.old_data['_id']
      },
        {
          $set: {
            src: `https://imagemodeling.nyc3.digitaloceanspaces.com/${fileName}`
          }
        }
      )
  }

    images.find({}).toArray((err, data) => {
      if(err) console.log(err)
      let max = 0;
      let dupl = false;

      for(let x = 0;x< data.length;x++) {
        if(parseInt(data[x]['_id']) > max) {
          max = parseInt(data[x]['_id'])
        }

        if(data[x]['src'] == req.body.old_data['src']) {
          dupl = true
        }
      }

      if(!dupl) {
        if(req.body.update) {
          images.insertOne({ src: req.body.old_data['src'],
                             image_id:"",
                             _id:(max + 1).toString() })
        } else {
          images.insertOne({ src: `https://imagemodeling.nyc3.digitaloceanspaces.com/${fileName}`,
                             image_id:"",
                             _id:(max + 1).toString() })
        }
      }
    })
  // console.log(req.body)
})

app.post("/api/uploadImage", upload.array('upload', 1) ,(req, res) => {
  res.json("dope!")
})

app.post("/api/updateImage", (req, res) => {
  images.findOneAndUpdate(
    {
      _id: req.body.old_data['_id']
    },
    {
      $set: {
        src: req.body.new_data['src']
      }
    }
  )
  images.find({}).toArray((err, data) => {
    if(err) console.log(err)
    let max = 0;
    let dupl = false;

    for(let x = 0;x< data.length;x++) {
      if(parseInt(data[x]['_id']) > max) {
        max = parseInt(data[x]['_id'])
      }

      if(data[x]['src'] == req.body.old_data['src']) {
        dupl = true
      }
    }

    if(!dupl) {
      images.insertOne({ src: req.body.old_data['src'],
                         image_id:"",
                         _id:(max + 1).toString() })
    }
  })
  res.json("Image Updated!");
})

// get site data

app.get("/", (req,res) => {
  // res.sendFile(path.join(__dirname, '/'), 'index.html')
});

app.get("/menu", (req,res) => {
  // res.sendFile(path.join(__dirname, '/'), 'index.html')
});

app.get("/api/get", (req, res) => {
     base.find({_id: req.query.id}).toArray((err, data) => {
       if (err) console.error(err)
       res.json(data[0]);
     })
})

app.get("/api/get_all", (req, res) => {
     base.find({}).toArray((err, data) => {
       if (err) console.error(err)
       images.find({}).toArray( (err, y) => {
         if(err) console.error(err)
          data.map(a => {
            return a.images.map(b => {
              b['src'] = y.filter(z => z['image_id'] == b['_id'])[0]['src']
              return b
            })
          })
          res.json(data)
       })
     })
})

app.get("/api/validate", (req, res) => {
  users.find({
    username:req.query.username,
    password: hashFunction(req.query.password)
  }).toArray((err, data) => {
    if(err) console.log(err)
    else {
      if(data.length) {
        if(data[0]['password'] == hashFunction(req.query.password)) {
          res.json(true)
        } else {
          res.json(false)
        }
      } else {
        res.json(false)
      }
    }
  })
})

app.get("/api/getMembers", (req, res) => {
  signups.find({}).toArray( (err, data) => {
    if(err) console.log(err)
    res.json(data);
  })
})

app.get("/api/exportMembers", (req, res) => {
  signups.find({}).toArray( (err, data) => {
    if(err) console.log(err)
    let mapped = data.map(x => {
      return {
        email: x.email,
        date: x.date
      }
    })

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader("Content-Disposition", 'attachment; filename=members.csv');
      res.csv(mapped, true);
  })
})

app.get("/api/getImages", (req, res) => {
  images.find({}).toArray( (err, data) => {
    if(err) console.log(err)
    res.json(data)
  } )
})


// put data

app.put("/api/update", (req, res) => {
    base.updateOne({
      _id:req.body.id
        }, {
        $set: {
          data:req.body.data
        }
      }).catch(e => console.log(e))
})

// post data

app.post("/api/newSection", (req, res) => {
  base.updateOne(
    { _id : req.body.id},
    {
      $push: {
        "data": req.body.data
    }
  })
  res.json("Section Inserted");
})

app.post("/api/newSubSection", (req, res) => {
  base.updateOne(
    { _id: req.body.id},
    {
      $push: {
        "data.$[elem].data": req.body.data
      }
    },
    {
      arrayFilters: [
                      {"elem.id": parseInt(req.body.sub_id)}
                    ]}
    )
    res.json("Sub Section Inserted!");
})

app.post("/api/newItem", (req, res) => {
  base.updateOne(
    { _id: req.body.id},
    {
      $push: {
        "data.$[elem].data.$[elem2].data": req.body.data
      }
    },
    {
      arrayFilters: [
                      {"elem.id": parseInt(req.body.sub_id)},
                      {"elem2.id":parseInt(req.body.super_sub_id)}
                    ]}
    )
    res.json("Item Inserted!");
})

app.post("/api/updatePriceView", (req, res) => {
  base.findOneAndUpdate({_id:req.body.id}, {
    $set: {
      show_prices:req.body.showPrice
    }
  })
  res.json("Settings Updated!");
})

app.post("/api/updateMenuItem", (req, res) => {
  base.findOneAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        "data.$[elem].data.$[elem2].data.$[elem3]": req.body.data
      }
    },
    {
      arrayFilters: [
                      {"elem.id": parseInt(req.body.sub_id)},
                      {"elem2.id":parseInt(req.body.super_sub_id)},
                      {"elem3.id":parseInt(req.body.item_id)}
                    ]}
    )
    res.json("Updated!");
})

app.post("/api/updateSubMenu", (req, res) => {
  base.findOneAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        "data.$[elem].data.$[elem2]": req.body.data
      }
    },
    {
      arrayFilters: [
                      {"elem.id": parseInt(req.body.sub_id)},
                      {"elem2.id":parseInt(req.body.super_sub_id)}
                    ]
                  }
    )
    res.json("Updated!");
})

app.post("/api/updateMain", (req, res) => {
  base.findOneAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        "data.$[elem]": req.body.data
      }
    },
    {
      arrayFilters: [
                      {"elem.id": parseInt(req.body.sub_id)}
                    ]
                  }
    )
    res.json("Updated!");
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

  app.post("/api/new_admin", (req, res) => {
    users.insertOne({
      username: req.body.username,
      password: hashFunction(req.body.password)
      })
      res.json("user accepted")
  })

  app.post('/api/contact', (req, res) => {
    let transporter = nodeMailer.createTransport({
      service:service,
      auth: {
        user: email,
        pass: pass
      }
    });
    let mailOptions = {
      from:email,
      to: email,
      subject:`New message from ${req.body.data.contact_name}`,
      text:'this is a test' + req.body.data.contact_name + req.body.data.contact_email + req.body.data.contact_message,
      html: `<div style="background:#e7e7e7;padding:20px 0;box-shadow:inset 4px -5px 1px 4px #73ad90 !important">
              <ol style="padding:0">
                <ul style="margin:10px 0">${req.body.data.contact_name} at  ${req.body.data.contact_email} says:</ul>
                <ul style="margin:30px 0;font-size:18px;color:#3c3c3c">${req.body.data.contact_message} </ul>
              </ol>
            </div>`
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

// delete

app.delete("/api/deleteMenuItem", (req, res) => {
  base.updateOne(
    { _id: req.body.id},
    {
      $pull: {
        "data.$[elem].data.$[elem2].data": {"id": parseInt(req.body.item_id)}
      }
    },
    {
      arrayFilters: [
                      {"elem.id": parseInt(req.body.sub_id)},
                      {"elem2.id":parseInt(req.body.super_sub_id)}
                    ]}
    )
    res.json("Deleted!");
})

app.delete("/api/deleteSubMenu", (req, res) => {
  base.updateOne(
    { _id: req.body.id},
    {
      $pull: {
        "data.$[elem].data": {"id": parseInt(req.body.super_sub_id)}
      }
    },
    {
      arrayFilters: [
                      {"elem.id": parseInt(req.body.sub_id)}
                    ]}
    )
    res.json("Deleted!");
})

app.delete("/api/deleteMain", (req, res) => {
  base.updateOne(
    { _id: req.body.id},
    {
      $pull: {
        "data": {"id": parseInt(req.body.sub_id)}
      }
    }
  )
    res.json("Deleted!");
})

// app.post("/api/reserve", (req, res) => {
//   reserves.insertOne({
//         name: req.body.data.appointment_name,
//         size: req.body.data.appointment_size,
//         time: req.body.data.appointment_time,
//         date: req.body.data.appointment_date,
//     })
//     res.json(req.body.data)
//   })
