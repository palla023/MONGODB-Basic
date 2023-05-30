const express = require('express');
const mongoose = require('mongoose');
const BrandName = require("./model");
const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://branduser:branduser@cluster0.scnemhb.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log("DB Connected..."))
  .catch(err => console.log(err));

app.post('/addbrands', async (req, res) => {
  const { brandName } = req.body;
  try {
    const newData = new BrandName({ brandName });
    await newData.save();
    const brands = await BrandName.find(); // Retrieve all brands
    return res.json(brands); // Return serialized version of brands
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getbrands',async (req,res)=>{
	try{
		const brands = await BrandName.find();
		return res.json(brands)
	}catch(err){
		console.log(err.message)
		return res.status(500).json({ error:'Internal Server Error' })
	}
})

app.get('/getbrands/:id', async (req,res)=>{
	try{
	let specific = await BrandName.findById(req.params.id);
	return res.json(specific);
	}catch(err){
		console.log(err.message)
		return res.status(500).json({ error:'Internal Server Error' })
	}
})

app.delete('/deletebrand/:id', async (req,res)=>{
	try{
		await BrandName.findByIdAndDelete(req.params.id)
		return res.send('Record deleted Successfully')
	}catch(err){
		console.log(err.message)
		return res.status(500).json({ error:'Internal Server Error' })
	}
})

app.listen(5000, () => console.log("Server is running..."));
