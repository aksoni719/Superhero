const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname+ "/index.html");
})

app.post("/",function(req,res){
  const query=req.body.superheroName;
  const url="https://www.superheroapi.com/api.php/1835354273272558/"+query+"/image";
  https.get(url,function(response){
    console.log(response.statusCode);

  response.on("data",function(data){
  const HeroName=JSON.parse(data);
  const H_name=HeroName.name;
  const imageLocation=HeroName.url;

//  res.write(JSON.stringify(HeroName));
  res.write("<h1>The name of the Hero is: </h1>"+"<h1>"+H_name+"</h1>");
  res.write("<a href="+imageLocation+">Click here for "+H_name+" image</a>");

  //res.send();
  })
  const url2="https://www.superheroapi.com/api.php/1835354273272558/"+query+"/biography";
  https.get(url2,function(response){
    console.log(response.statusCode);

  response.on("data",function(data){
  const Publisher_Name=JSON.parse(data);
  const P_name=Publisher_Name.publisher;
  const F_name=Publisher_Name["full-name"];
  const Pob=Publisher_Name["place-of-birth"];
//  res.write(JSON.stringify(HeroName));
  res.write("<h3>The name of the Publisher is: </h3"+"<h2>"+P_name+"</h2>");
  res.write("<h3>The Full Name is: </h3"+"<h2>"+F_name+"</h2>");
  res.write("<h3>Place of birth is: </h3>"+"<h2>"+Pob+"</h2>");

  res.send();
  })
  })
  })
})

app.listen(3000,function(){
  console.log("Hey there server is running at port 3000");
})
