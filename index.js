const express = require('express');
const { resolve } = require('path');
const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./schema.js")

const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(express.json());

const uri = process.env.MONGODB_URI
mongoose.connect(uri)
.then(() => { console.log("Connected to database..")})
.catch((err) => { console.error("Failed to connect!", err)})


app.put("/menu/:id",async(res,req)=>{
  
  try{
    const newProduct =await new Product(req.body);
    const updateProduct = await Product.findByIdAndUpdate(req.params.id,newProduct);

    if (!updateProduct){
      return res.status(404).json({message:"Product not Found"})
    }
    res.status(200).json({message:"Successfully updated!",updateProduct})
  }catch(error){
    res.status(500).json({error:"Internal server Error"})
  }
});
app.delete("/menu/:id", async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deleteProduct) {
      return res.status(404).json({ message: "Product not Found" });
    }
    res.status(200).json({ message: "Successfully deleted!", deleteProduct });
  } catch (error) {
    res.status(500).json({ error: "Internal server Error" });
  }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
