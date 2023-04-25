import { Request, Response } from "express";
import Product from "../db/models/product";
import helper from "../helpers/helper";
import User from "../db/models/user";
import multer from 'multer';
import path from 'path';

const GetProducts = async (req: Request, res: Response): Promise<Response> =>{
    try {

        const products = await Product.findAll({
            where: {
                active: true
            }
        });
        return res.status(200).send(helper.ResponseData(200, "OK", null, products));
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}
const GetProductsPublished = async (req: Request, res: Response): Promise<Response> =>{
    try {

        const products = await Product.findAll({
            where: {
                published: true
            }
        });
        return res.status(200).send(helper.ResponseData(200, "OK", null, products));
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}
const CreateProduct = async (req: Request, res: Response): Promise<Response> =>{
    try {

        const {name, image, price, description, published, active} = req.body;

        const product = await Product.create({
            name, 
            // image: image.file.path, 
            image, 
            price, 
            description, 
            published, 
            active
        });

        return res.status(201).send(helper.ResponseData(201, "Created", null, product));
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}
const UpdateProduct = async (req: Request, res: Response): Promise<Response> =>{
    try {

        const { id} = req.params;
        const {name, image, price, description, published, active} = req.body;

        const product = await Product.findByPk(id);
        if(!product){
            return res.status(404).send(helper.ResponseData(404, "NotFound", null, null));
        }

        product.name = name;
        product.image = image;
        // product.image = image.file.path;
        product.price = price;
        product.description = description;
        product.published=published;
        product.active=active;

        await product.save();

        return res.status(200).send(helper.ResponseData(200, "OK", null, product));
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}
const DeleteProduct = async (req: Request, res: Response): Promise<Response> =>{
    try {

        const { id} = req.params;

        const product = await Product.findByPk(id);
        if(!product){
            return res.status(404).send(helper.ResponseData(404, "Not Found", null, null));
        }

        await product.destroy();

        return res.status(200).send(helper.ResponseData(200, "Product Deleted", null, product));
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}
const GetProductById = async (req: Request, res: Response): Promise<Response> =>{
    try {

        const { id} = req.params;

        const product = await Product.findByPk(id);

        if(!product){
            return res.status(404).send(helper.ResponseData(404, "Not Found", null, null));
        }

        return res.status(200).send(helper.ResponseData(200, "OK", null, product));
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}
const GetProductByUser = async (req: Request, res: Response): Promise<Response> =>{
    try {

        const { userId } = req.params;
		const product = await Product.findOne({
			where: {
				userId: userId
			},
            include: {
                model: User,
                attributes: ["id", "firstName"]
            }
		});

		if (!product) {
			return res.status(404).send(helper.ResponseData(404, "Product not found", null, null));
		}

		return res.status(200).send(helper.ResponseData(200, "OK", null, product));
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}


// 8. Upload Image Controller

const storage = multer.diskStorage({
    destination: (req: any,file: any,cb: any) => {
        cb(null, 'uploads/products/')
    },
    filename: (req: any,file: any,cb: any) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})



const upload = multer({
    storage: storage,
    limits: {
        // fileSize: '1000000'
        fileSize: 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }
        cb(new Error('Give proper files formate to upload'))
    }
}).single('image')


export default {
    GetProducts,
    GetProductsPublished,
    CreateProduct,
    UpdateProduct,
    DeleteProduct,
    GetProductById,
    GetProductByUser,
    upload
};