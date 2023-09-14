const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const Contact = require('./model/contact');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

var contactList = [
    {name: "user1",
    phone: "11111"},
    {name: "user2",
    phone: "22222"},
    {name: "user3",
    phone: "33333"},
]

// app.post('/create-contact', function(req, res){
//     Contact.create({
//         name: req.body.name,
//         phone:req.body.phone
//     }, function(err, newContact){
//         if(err){
//             console.log('error');
//             return;
//         }
//         console.log('********', newContact);
//         return res.redirect('back');
//     }
//     );
// });

app.post('/create-contact', (req, res) => {
    Contact.create({
        name: req.body.name,
        phone: req.body.phone,
    })
        .then((result) => {
            console.log("contact created", result)
            return res.redirect('back')
        })
        .catch((err) => {
            console.log("Error creating contact", err)
            return res.redirect('back');

        })
})

// app.get('/', function(req, res){
//     Contact.find({}, function(err, contacts){
//         if (err){
//             console.log(err)
//             return;
//         }
//         return  res.render('home', {
//             title : "Contact List",
//             contact_list : contactList,
//     })  
//  });
//  })

app.get('/', function (req, res) {
    Contact.find({})
      .then((contacts) => {
        return res.render('home', {
          title: "Contact List",
          contact_list: contacts, // Use the "contacts" variable here, not "contactList"
        });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).send('An error occurred while fetching the contacts.');
      });
  });

  app.post('/delete-contact', function(req, res) {
    let id = req.body.id; // Assuming the ID is sent as a POST parameter
    Contact.findByIdAndDelete(id)
      .then((result) => {
        if (!result) {
          return res.status(404).send('Contact not found.');
        }
        return res.redirect('back');
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).send('An error occurred while deleting the contact.');
      });
  });

app.listen(port, function(err){
    if(err){
        console.log('Error:', err)
    }
    console.log('server is running:', port);
})
