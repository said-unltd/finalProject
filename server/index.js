const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const multer = require('multer');

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

const db  = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DBHOST,
    user            : process.env.DBUSER,
    password        : process.env.DBPASSWORD,
    database        : process.env.DBNAME,
});

const saltRounds = 10;


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});
  
const upload = multer({ storage: storage });


app.post('/additem', upload.single('file'), async (req, res) => {
    console.log(req.file);
    const user = req.body.user;
    const userId = req.body.userId;
    const collectionId = req.body.collectionId
    const name = req.body.name;
    const description = req.body.description;
    const file = req.body.file;
    const formData = req.body.formData;

    db.query("INSERT INTO items (collection_id, name, description, item_author) VALUES (?, ?, ?, ?)", [ collectionId, name, description, userId], (err, result) => {
        if (err) {
            res.status(418).send('Could not create the collection 😬')
        } else {
            // console.log(result);
            console.log(userId)
            res.send({name: name})
        }}
    )
})

app.post('/createcollection', upload.single('image'), async (req, res) => {
    console.log(req.file);
    
    const user = req.body.user
    const userId = req.body.userId
    const name = req.body.name;
    const description = req.body.description;
    const image = req.body.image;
    const string1State = req.body.string1State;
    const string1Name = req.body.string1Name;
    const string2State = req.body.string2State;
    const string2Name = req.body.string2Name; 
    const string3State = req.body.string3State; 
    const string3Name = req.body.string3Name; 
    const int1State = req.body.int1State; 
    const int1Name = req.body.int1Name; 
    const int2State = req.body.int2State;
    const int2Name = req.body.int2Name;
    const int3State = req.body.int3State 
    const int3Name = req.body.int3Name; 
    const description1State = req.body.description1State; 
    const description1Name = req.body.description1Name;
    const description2State = req.body.description2State; 
    const description2Name = req.body.description2Name; 
    const description3State = req.body.description3State; 
    const description3Name = req.body.description3Name;
    const bool1State = req.body.bool1State; 
    const bool1Name = req.body.bool1Name; 
    const bool2State = req.body.bool2State;
    const bool2Name = req.body.bool2Name;
    const bool3State = req.body.bool3State; 
    const bool3Name = req.body.bool3Name; 
    const date1State = req.body.date1State;
    const date1Name = req.body.date1Name; 
    const date2State = req.body.date2State; 
    const date2Name = req.body.date2Name;
    const date3State = req.body.date3State;
    const date3Name = req.body.date3Name;
    const formData = req.body.formData;

    db.query("INSERT INTO collection (name, description, user) VALUES (?, ?, ?)", [name, description, userId], (err, result) => {
        if (err) {
            res.status(418).send('Could not create the collection 😬')
        } else {
            // console.log(result);
            console.log(userId)
            res.send({name: name})
        }}
    )
})

app.post('/signup', (req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            res.status(418).send('Could not hash password..')
        } else {
            db.query("INSERT INTO users (username, name, surname, email, password) VALUES (?, ?, ?, ?, ?)", [username, name, surname, email, hashedPassword], (err, result) => {
                if (err) {
                    res.status(418).send('Could not register the user 😬')
                } else {
                    db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
                        if (err) {
                           res.status(418).send(err.message);
                        } else if (result.length < 1) {
                           res.status(418).send('Username does not match 🤣');
                        } else {
                           bcrypt.compare(password, result[0].password, (err, match) => {
                               if (match) {
                                   console.log(result[0])
                                   const userId = result[0].user_id;
                                   res.send({username, userId});
                               }
                               if (!match) {
                                   res.status(418).send('Password does not match 😘');
                               }
                           })
                        }
                   })
                }
            })
        }
    });
});

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
         if (err) {
            res.status(418).send(err.message);
         } else if (result.length < 1) {
            res.status(418).send('Username does not match 🤣');
         } else {
            bcrypt.compare(password, result[0].password, (err, match) => {
                if (match) {
                    // console.log(result[0])
                    const userId = result[0].user_id;
                    res.send({username, userId});
                }
                if (!match) {
                    res.status(418).send('Password does not match 😘');
                }
            })
         }
    })
});

app.get('/usermanagement', (req, res) => {
    const username = req.query.username;
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            res.status(418).send("An error occured could not fetch data 🫡");
        }
        if (result) {
            res.send(result);
        }
    })
})

app.get('/collection', (req, res) => {
    const userId = req.query.userId;
    console.log(userId);
    const username = req.query.username;
    db.query("SELECT * FROM collection c WHERE c.user = ?", [userId], (err, result) => {
        if (err) {
            res.status(418).send("An error occured could not fetch data 🫡");
        }
        if (result) {
            console.log(result)
            res.send(result);
        }
    })
    // db.query("SELECT * FROM collection c WHERE c.user = ?", [userId], (err, result) => {
    //     if (err) {
    //         res.status(418).send("An error occured could not fetch data 🫡");
    //     }
    //     if (result) {
    //         console.log(result)
    //         res.send(result);
    //     }
    // })
    // db.query("SELECT * FROM collection", (err, result) => {
    //     if (err) {
    //         res.status(418).send("An error occured could not fetch data 🫡");
    //     }
    //     if (result) {
    //         res.send(result);
    //     }
    // })
})

// "SELECT c.name FROM collection c WHERE c.user IN (SELECT u.user_id FROM users u WHERE user = "

app.get('/collection/items', (req, res) => {
    const userId = req.query.userId;
    const collectionID = req.query.collectionID;
    // console.log(userId);
    console.log(collectionID);
    const username = req.query.username;
    db.query("SELECT * FROM items i WHERE i.collection_id = ?", [collectionID], (err, result) => {
        if (err) {
            res.status(418).send("An error occured could not fetch data 🫡");
        }
        if (result) {
            res.send(result);
        }
    })
})

app.get('/collection/items/view', (req, res) => {
    // const userId = req.query.userId;
    // const collectionID = req.query.collectionID;
    const currentItemId = req.query.currentItemId;
    // console.log(userId);
    console.log("THIS IS CURRENT ITEM IF", currentItemId);
    const username = req.query.username;
    db.query("SELECT * FROM items i WHERE i.item_id = ?", [currentItemId], (err, result) => {
        if (err) {
            res.status(418).send("An error occured could not fetch data 🫡");
        }
        if (result) {
            res.send(result);
        }
    })
})

app.listen(8080, () => {
    console.log('server listening on port 8080');
});