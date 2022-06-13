const express=require('express');
const req = require('express/lib/request');
const router=express.Router()
const{ create,categoryById,Read,modify,cancel,list }=require('../controllers/category');
const{requireSignin,isAuth,isAdmin }=require('../controllers/auth');
const{ userById }=require('../controllers/user');
const read = require('body-parser/lib/read');
router.get('/category/:categoryId',Read)
router.post("/category/create/:userId",requireSignin,isAuth,isAdmin,create);
router.put("/category/:categoryId/:userId",requireSignin,isAuth,modify);
router.delete("/category/:categoryId/:userId",requireSignin,isAuth,cancel);
router.get('/categories',list)
router.param('categoryId',categoryById)
router.param('userId',userById)


module.exports=router