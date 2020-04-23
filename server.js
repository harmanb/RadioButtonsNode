
const http = require('http');
const { parse } = require('querystring');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/radioDB';
const tempID = 5;

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            result.user_id = tempID;
            console.log(result);
            updateRadioselection(result);
            res.end(`Saved.`);
        });
    } 
    else {
        res.end(`
        <!doctype html>
        <html>
        <body>
            <form action="/" method="post">
                <h5>Webpage rating</h5>
                <input type="radio" id="one" name="radio1" value="1">
                <label for="one">1</label><br>
                <input type="radio" id="two" name="radio1" value="2">
                <label for="two">2</label><br>
                <input type="radio" id="three" name="radio1" value="3">
                <label for="three">3</label><br>
                <input type="radio" id="four" name="radio1" value="4">
                <label for="four">4</label><br>
                <input type="radio" id="five" name="radio1" value="5">
                <label for="five">5</label><br><br>
                <h5>Webpage rerating</h5>
                <input type="radio" id="one2" name="radio2" value="1">
                <label for="one2">1</label><br>
                <input type="radio" id="two2" name="radio2" value="2">
                <label for="two2">2</label><br>
                <input type="radio" id="three2" name="radio2" value="3">
                <label for="three2">3</label><br>
                <input type="radio" id="four2" name="radio2" value="4">
                <label for="four2">4</label><br>
                <input type="radio" id="five2" name="radio2" value="5">
                <label for="five2">5</label><br>
                <button>Save</button>
            </form>
        </body>
        </html>
    `);
    }
});
server.listen(3000);

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

function updateRadioselection(data){
    
    MongoClient.connect(url, function(err, client) {
        var db = client.db('radioDB');
        db.collection('radio').updateOne(
            //normally I would get user_id from session not payload
            { "user_id" : data.user_id },
            { $set: {"user_id" : data.user_id, "radio1" : data.radio1, "radio2" : data.radio2 } },
            { upsert: true }
        );
    }); 
}