'use strict';

const axios =require('axios');
const mongoose =require('mongoose');
const ChocolateModel = require('./moduls');


async function getChocolateAPI(req, res) {
    //http://localhost:3005/getChocolateAPI?email=a.nazzal1995@gmail.com
    //https://ltuc-asac-api.herokuapp.com/allChocolateData
    const {email}=req.query;

    let chocolateURL= await axios.get(`https://ltuc-asac-api.herokuapp.com/allChocolateData`);
    // console.log(chocolateURL.data);
    let arrayOfChocolate=[];
 
    chocolateURL.data.map((chocolate)=>{
        const Chocolates={
            name: chocolate.title,
            img: chocolate.imageUrl,
            email: email
        }
        arrayOfChocolate.push(Chocolates);
    })
    res.send(arrayOfChocolate)

}


module.exports=getChocolateAPI;