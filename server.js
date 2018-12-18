var express = require('express'),
    app = express(),
    mongojs = require('mongojs'),
    db = mongojs('rentalease', ['rentalease']),
    bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/rentalease', function (req, res) {
    console.log('I received a GET request');

    db.rentalease.find(function (err, docs) {
        console.log(docs);
        res.json(docs);
    });
});

app.post('/rentalease', function (req, res) {
    db.rentalease.insert(req.body, function (err, doc) {
        res.json(doc);
    })
});

app.delete('/rentalease/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.rentalease.remove({
        _id: mongojs.ObjectId(id)
    }, function (err, doc) {
        res.json(doc);
    });
});

app.get('/rentalease/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.rentalease.findOne({
        _id: mongojs.ObjectId(id)
    }, function (err, doc) {
        res.json(doc);
    });
});
app.patch('/rentalease/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.params);
    db.rentalease.update({
            query: {
                _id: mongojs.ObjectId(id)
            },
            $set: {
                rent_start_date: req.body.rent_start_date
            },
            new: true
        },
        function (err, doc) {
            res.json(doc);
        });
});
// app.put('/rentalease/:id', function (req, res) {
//     var id = req.params.id;
//     console.log(req.params);
//     db.rentalease.findAndModify({
//             query: {
//                 _id: mongojs.ObjectId(id)
//             },
//             update: {
//                 $set: {
//                     rent_start_date: req.body.rent_start_date,
//                     rent_over_date: req.body.rent_over_date
//                 }
//             },
//             new: true
//         },
//         function (err, doc) {
//             res.json(doc);
//         });
// });

app.listen(3000);
console.log("Server is on")