const express=require('express');
const req = require('express/lib/request');
const router=express.Router()
const{ create,productById,read, Remove,Update,List,listRelated,listCategories,listBySearch,photo,listSearch }=require('../controllers/product');
const{requireSignin,isAuth,isAdmin }=require('../controllers/auth');
const{ userById }=require('../controllers/user');
const { remove } = require('lodash');
router.get("/product/:productId",read)
router.post("/product/create/:userId",requireSignin,isAuth,isAdmin,create);
router.delete('/product/:productId/:userId',requireSignin,isAuth,isAdmin,Remove)
router.put('/product/:productId/:userId',requireSignin,isAuth,isAdmin,Update)
router.get('/products',List)
router.get("/products/search", listSearch);
router.get('/products/related/:productId',listRelated)
router.get('/products/categories',listCategories)
router.post("/products/by/search", listBySearch);
router.get('/product/photo/:productId',photo)
router.param('userId',userById)
router.param('productId',productById)


module.exports=router