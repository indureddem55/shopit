const product = require('../models/product');
const Product = require('../models/product')

const errorHandler = require('../utils/ErrorHandler');

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const ApiFeatures = require('../utils/apiFeatures');

//create new product  =>  /api/v1/product/new


exports.newProduct = catchAsyncErrors(async(req, res, next) => {

    const product = await Product.create(req.body);

    res.status(201).json({
        succes: true,
        product
    })
});

//get all products =>  /api/v1/products?keyword=apple


exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 4;

    const productCount = await Product.countDocuments();

    const apiFeatures = new ApiFeatures(Product.find(), req.query)
                            .search()
                            .filter()
                            .pagination(resPerPage)

    const products = await apiFeatures.query;
    res.status(200).json({
        success:true,
        count: products.length,
        productCount,
        products
    })
});

exports.getSingleProduct = catchAsyncErrors( async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if(!product){

        return next(new errorHandler('Product not found', 404));
    }

    res.status(200).json({

        success: true,
        product
    })
});

//update product

exports.updateProduct = catchAsyncErrors(async(req, res, next) => {

    let product = await Product.findById(req.params.id);

    if(!product){

        return res.status(404).json({
            success: false,
            message: "product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({

        success:true,
        product
    })


});

//Delete Product => /api/v1/admin/product/:id

exports.deleteProduct = catchAsyncErrors(async(req, res, next) => {

    const product = await Product.findById(req.params.id);

    if(!product){

        return res.status(404).json({
            success: false,
            message: "product not found"
        })
    }

    await product.remove();

    res.status(200).json({

        success:true,
        message:"product is deleted"
    })
});



