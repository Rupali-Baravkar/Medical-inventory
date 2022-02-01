 var db = require('connection');
  db.query("SELECT * FROM demo.new", function (err, result, fields) {
    if (err){
        console.log(err);}
     else
        console.log(result);
  });
  //con.end();


