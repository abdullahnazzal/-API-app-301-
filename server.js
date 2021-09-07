'use strict'
const express = require('express');
const server = express();
const cors = require('cors');

require('dotenv').config();

const mongoose = require('mongoose');

server.use(cors());
server.use(express.json());
const PORT = process.env.PORT;

mongoose.connect(`${process.env.MONGO_LINK}`, { useNewUrlParser: true, useUnifiedTopology: true });

const ChocolateModel = require('./moduls');

server.get('/test', (req, res) => {
    res.send("OK")
})

server.get('/chocolate', getChocolate);
server.post('/chocolate', addChocolate);
server.delete('/chocolate/:chocolate_id',deleteChocolate);
server.put('/chocolate/:chocolate_id',updateChocolate);

function getChocolate(req, res) {
    // http://localhost:3005/chocolate?email=a.nazzal1995@gmail.com
    const { email } = req.query;
    ChocolateModel.find({ email }, (error, chocolates) => {
        if (error) {
            console.log("Error getting data");
        } else {
            res.send(chocolates);
        }
    })


}
async function addChocolate(req, res) {
    // http://localhost:3005/chocolate, chocolateInfo
    const { name, img, email } = req.body;
    const chocolate = new ChocolateModel({
        name: name,
        img: img,
        email: email
    })
    await chocolate.save();
    ChocolateModel.find({email},(error,chocolates)=>{
        if (error) {
            console.log("Error getting data");
        } else {
            res.send(chocolates);
        }
    })


}
function deleteChocolate(req, res) {
    // http://localhost:3005/chocolate/3454354345?email=a.nazzal1995@gmail.com
    const { email } = req.query;
    const { chocolate_id } = req.params;
    ChocolateModel.remove({_id:chocolate_id},(error, chocolates)=>{
        if (error) {
            console.log("Error delete data");
        } else {
            ChocolateModel.find({ email }, (error, chocolates) => {
                if (error) {
                    console.log("Error getting data");
                } else {
                    res.send(chocolates);
                }
            })
        }
    })
    


}
function updateChocolate(req, res) {
    // http://localhost:3005/chocolate/3454354345,chocolateInfo
    const { name, img, email } = req.body;
    const { chocolate_id } = req.params;
    ChocolateModel.findByIdAndUpdate(chocolate_id,{name, img, email},(error, chocolates)=>{
        if (error) {
            console.log("Error update data");
        } else {
            ChocolateModel.find({ email }, (error, chocolates) => {
                if (error) {
                    console.log("Error getting data");
                } else {
                    res.send(chocolates);
                }
            })
        }
    })
    


}
////////////////////////////
const getChocolateAPI=require('./getChocolateAPI')
server.get('/getChocolateAPI',getChocolateAPI);
server.listen(PORT, () => {
    console.log("SERVER IS A LIVE");
})