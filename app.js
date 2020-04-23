var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/radioDB';

// MongoClient.connect(url, function(err, client) {
//     var db = client.db('EmployeeDB')
//     db.collection('Employee').insertOne({
//         Employeeid: 4,
//         EmployeeName: "NewEmployee"
//     });
// }); 



MongoClient.connect(url, function(err, client) {
    var db = client.db('radioDB');
    var cursor = db.collection('radio').find();

    cursor.each(function(err, doc) {

        console.log(doc);

    });
}); 
