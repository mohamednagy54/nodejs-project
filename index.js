const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/Article.js");
const app = express();

const mongoDbUrl =
  "mongodb+srv://mnagy14966:Aa0456258@myfirstnodejscluster.6h50t8z.mongodb.net/?retryWrites=true&w=majority&appName=MyFirstNodeJsCluster";

mongoose
  .connect(mongoDbUrl)
  .then(() => {
    console.log("connected Successfully");
  })
  .catch((err) => {
    console.log("error with connecting with the DB", err);
  });

// mongodb+srv://mnagy14966:<password>@myfirstnodejscluster.6h50t8z.mongodb.net/?retryWrites=true&w=majority&appName=MyFirstNodeJsCluster

app.use(express.json());
const port = 3000;

app.get("/", (req, res) => {
  res.send("Home Page");
});
app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.get("/numbers", (req, res) => {
  let numbers = "";

  for (let i = 0; i <= 100; i++) {
    numbers += i + " - ";
  }

  // res.send(`the numbers are ${numbers}`);
  // res.sendFile(__dirname + '/views/numbers.html')
  res.render("numbers.ejs", {
    name: "mohamed",
    numbers: numbers,
  });
});
app.put("/test", (req, res) => {
  res.send("You visited Test");
});

app.get("/findSummation/:number1/:number2", (req, res) => {
  const params = req.params;
  const total = Number(params.number1) + Number(params.number2);
  res.send(`${total}`);
});

app.get("/sayHello", (req, res) => {
  const { name, age } = req.query;

  // res.send(`
  // <div>
  // <p>Name is :${name}</p>
  // <p>Age is :${age}</p>
  // </div>
  // `)

  res.json({
    name: name,
    age: age,
    Language: "arabic",
  });
});

app.post("/addComment", (req, res) => {
  res.send("post request on add Comment");
});

app.delete("/testingDelete", (req, res) => {
  res.send("Delete");
});

//  Article EndPoints

app.post("/articles", async (req, res) => {
  const params = req.body;

  const newArticle = new Article();
  const artTitle = params.articleTitle;
  const artBody = params.articleBody;

  newArticle.title = artTitle;
  newArticle.body = artBody;
  newArticle.numberOfLikes = 100;
  await newArticle.save();

  res.json(newArticle);
});

app.get("/articles", async (req, res) => {
  const articles = await Article.find({});
  console.log(`the articles are : ${articles}`);

  res.json(articles);
});

app.get("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;

  try {
    const article = await Article.findById(id);
    res.json(article);
  } catch (error) {
    console.log(`error while reading article of id : ${id}`);
    return res.send(error)
  }

  
});

app.delete("/articles/:articleId",async (req, res) => { 
  const id = req.params.articleId;

  try {
    const article = await Article.findByIdAndDelete(id)
    res.json(article);
  } catch (error) {
    console.log(`error while reading article of id : ${id}`);
    return res.send(error)
  }

})



app.get("/showArticles", async(req, res) => { 
  const articles = await Article.find()

  res.render("articles.ejs", {
    allArticles:articles,
  })
})




app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
