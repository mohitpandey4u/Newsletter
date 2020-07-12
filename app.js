const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.post("/",function(req,res){
  const Fname = req.body.fname;
  const Mname = req.body.mname;
  const Email = req.body.email;
  const data = {
    members: [
      {
        email_address : Email,
        status : "subscribed",
        merge_fields:{
          FNAME: Fname,
          LNAME: Mname
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us10.api.mailchimp.com/3.0/lists/8631ed0e78";
  const options = {
    method: "POST",
    auth: "mohit01:9bd1617cd9cc767443720b4c06bfd087-us10"
  };
const request = https.request(url, options, function(response){

    if(response.statusCode==200)
    {
      res.sendFile(__dirname +"/success.html");
    }
    else{
      res.sendFile(__dirname +"/failure.html");
    }
  //  response.on("data", function(data){
    //  console.log(JSON.parse(data));
  //  });
  });
  request.write(jsonData);
  request.end();

});



app.get("/", function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/failure", function(req,res){
  res.redirect("/")
});
app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running");
});

//9bd1617cd9cc767443720b4c06bfd087-us10
// 8631ed0e78
