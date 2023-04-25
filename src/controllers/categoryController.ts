import { Request, Response } from "express";
import Category from "../db/models/category";
import helper from "../helpers/helper";

const GetCategory = async (req: Request, res: Response): Promise<Response> =>{
    try {
        const categories = await Category.findAll({
            where: {
                active: true
            }
        });
        return res.status(200).send(helper.ResponseData(200, "OK", null, categories));
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
};

const CreateCategory = async(req:Request, res: Response): Promise<Response> =>{
    try {
        const {name, description, active} = req.body;

        const category = await Category.create({
            name,
            description,
            active
        });

        return res.status(201).send(helper.ResponseData(201, "Created", null, category));
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
        
    }
}

const UpdateCategory = async(req:Request, res: Response): Promise<Response> =>{
    try {
        const { id} = req.params;
        const {name, description, active} = req.body;

        const category = await Category.findByPk(id);
        if(!category){
            return res.status(404).send(helper.ResponseData(404, "NotFound", null, null));
        }

        category.name = name;
        category.description = description;
        category.active=active;

        await category.save();

        return res.status(200).send(helper.ResponseData(200, "OK", null, category));

        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
        
    }
}

const DeleteCategory = async(req:Request, res: Response): Promise<Response> =>{
    try {
        const { id} = req.params;

        const category = await Category.findByPk(id);
        if(!category){
            return res.status(404).send(helper.ResponseData(404, "NotFound", null, null));
        }


        await category.destroy();

        return res.status(200).send(helper.ResponseData(200, "Category Deleted", null, category));
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
        
    }
}

const GetCategoryById = async(req:Request, res: Response): Promise<Response> =>{
    try {
        const { id} = req.params;

        const category = await Category.findByPk(id);
        if(!category){
            return res.status(404).send(helper.ResponseData(404, "NotFound", null, null));
        }

        return res.status(200).send(helper.ResponseData(200, "OK", null, category));
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
        
    }
}

export default {
    GetCategory,
    CreateCategory,
    UpdateCategory,
    DeleteCategory,
    GetCategoryById
};