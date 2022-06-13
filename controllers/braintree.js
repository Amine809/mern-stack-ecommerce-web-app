const User=require('../models/user')
const braintree=require('braintree')
require('dotenv').config();

//BRAINTRE_KARMOUS_PRIVATE_KEY=aa3e10f6308c658bd9e7c0060a874ea9
//BRAINTRE_KARMOUS_PUBLIC_KEY=cmtw53k97dftmzvy
//BRAINTRE_KARMOUS_ID=8pfhy44vnzkctwd9
const gateway = braintree.connect({
    environment: braintree.Environment.Sandbox, // Production
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
});
exports.generateToken=(req,res)=>{
    gateway.clientToken.generate({},function(err,response){
        if(err){
            res.status(500).send(err)
        }else{
            res.send(response);
        }
    })

};
exports.processPayment=(req,res)=>{
    let nonceFromTheClient=req.body.paymentMethodNonce
    let amountFromTheClient=req.body.amount
    //charge 
    let newTransaction=gateway.transaction.sale({
        amount:amountFromTheClient,
        paymentMethodNonce:nonceFromTheClient,
        options:{
            submitForSettlement:true
        }
    },(error,result)=>{
        if(error){
            res.status(500).json(error)
        }else{
            res.json(result)
        }
    }
    )}

    
    