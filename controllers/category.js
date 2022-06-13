const {errorHandler}=require('../helper/dbhandler');
const category = require('../models/category');
exports.categoryById=(req,res,next,id)=>{
    Category.findById(id).exec((err,category)=>{
        if(err || !category){
            return res.status(400).json({
                error:"Category does not exist"
            })

        }
        req.category=category
        next();
    })
}
const Category=require('../models/category');
exports.create=(req,res)=>{
    const category=new Category(req.body)
    category.save((err,data)=>{
if(err){
    return res.status(400).json({
        error:errorHandler(err)
    })
}
res.json({data})
    });
}
exports.Read=(req,res)=>{
    return res.json(req.category)
}
exports.modify=(req,res)=>{
    const category=req.category
    category.name=req.body.name
    category.save((err,data)=>{
        if(err){
            res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json(data)
    })
}
exports.cancel=(req,res)=>{
    const category=req.category
    category.remove((err,data)=>{
        if(err){
            res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json({
            message:"category deleted"
        })
    })
}
exports.list=(req,res)=>{
    Category.find().exec((err,data)=>{
        if(err){
            res.status(400).json({
                error:errorHandler(err)
            })
        }
res.json(data)
    })
}
