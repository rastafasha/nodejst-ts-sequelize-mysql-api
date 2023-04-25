import { Request, Response } from "express";
import Tutorial from "../db/models/tutorial";
import helper from "../helpers/helper";
import User from "../db/models/user";
import multer from 'multer';
import path from 'path';

const GetTutorials = async (req: Request, res: Response): Promise<Response> =>{
    try {
        const tutorials = await Tutorial.findAll({
            where: {
                active: true
            }
        });
        return res.status(200).send(helper.ResponseData(200, "OK", null, tutorials));
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}
const GetTutorialsPublished = async (req: Request, res: Response): Promise<Response> =>{
    try {

        const tutorials = await Tutorial.findAll({
            where: {
                published: true
            }
        });
        return res.status(200).send(helper.ResponseData(200, "OK", null, tutorials));
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}
const CreateTutorial = async (req: Request, res: Response): Promise<Response> =>{
    try {
        const {name, image, price, description, published, active} = req.body;

        const tutorial = await Tutorial.create({
            name, 
            // image: image.file.path, 
            image, 
            price, 
            description, 
            published, 
            active
        });

        return res.status(201).send(helper.ResponseData(201, "Created", null, tutorial));
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}
const UpdateTutorial = async (req: Request, res: Response): Promise<Response> =>{
    try {
        const { id} = req.params;
        const {name, image, price, description, published, active} = req.body;

        const tutorial = await Tutorial.findByPk(id);
        if(!tutorial){
            return res.status(404).send(helper.ResponseData(404, "NotFound", null, null));
        }

        tutorial.name = name;
        tutorial.image = image;
        // tutorial.image = image.file.path;
        tutorial.price = price;
        tutorial.description = description;
        tutorial.published=published;
        tutorial.active=active;

        await tutorial.save();

        return res.status(200).send(helper.ResponseData(200, "OK", null, tutorial));
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}
const DeleteTutorial = async (req: Request, res: Response): Promise<Response> =>{
    try {

        const { id} = req.params;

        const tutorial = await Tutorial.findByPk(id);
        if(!tutorial){
            return res.status(404).send(helper.ResponseData(404, "Not Found", null, null));
        }

        await tutorial.destroy();

        return res.status(200).send(helper.ResponseData(200, "Tutorial Deleted", null, tutorial));
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}
const GetTutorialById = async (req: Request, res: Response): Promise<Response> =>{
    try {
        const { id} = req.params;

        const tutorial = await Tutorial.findByPk(id);

        if(!tutorial){
            return res.status(404).send(helper.ResponseData(404, "Not Found", null, null));
        }

        return res.status(200).send(helper.ResponseData(200, "OK", null, tutorial));
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}
const GetTutorialByUser = async (req: Request, res: Response): Promise<Response> =>{
    try {

        const { userId } = req.params;
		const tutorial = await Tutorial.findOne({
			where: {
				userId: userId
			},
            include: {
                model: User,
                attributes: ["id", "firstName"]
            }
		});

		if (!tutorial) {
			return res.status(404).send(helper.ResponseData(404, "Tutorial not found", null, null));
		}

		return res.status(200).send(helper.ResponseData(200, "OK", null, tutorial));
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}


const storage = multer.diskStorage({
    destination: (req: any,file: any,cb: any) => {
        cb(null, 'uploads/tutorials/')
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
    GetTutorials,
    GetTutorialsPublished,
    CreateTutorial,
    UpdateTutorial,
    DeleteTutorial,
    GetTutorialById,
    GetTutorialByUser,
    upload
};