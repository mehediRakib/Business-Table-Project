const express=require('express');
const router=express.Router();
const productController=require('../Controller/productController');

router.get('/productList/:pageNo/:perPage/:searchKey',productController.productList);




module.exports=router;