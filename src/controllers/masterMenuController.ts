import { Request, Response } from "express";
import MasterMenu from "../db/models/mastermenu";
import helper from "../helpers/helper";

const CreateMenu = async(req: Request, res: Response): Promise<Response>=>{
    try {
        const {name, icon, ordering} =req.body;
        const mastermenu = await MasterMenu.create({
            name, icon, ordering,
            active:true
        })
        return res.status(201).send(helper.ResponseData(201, "Created", null, mastermenu));
    } catch (error:any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
};
const GetListMenu = async(req: Request, res: Response): Promise<Response>=>{
    try {
		const menu = await MasterMenu.findAll({
			where: {
				active: true
			}
		});

		return res.status(200).send(helper.ResponseData(200, "OK", null, menu));
	} catch (error:any) {
		return res.status(500).send(helper.ResponseData(500, "", error, null));
	}
};

const GetAllMenu = async (req: Request, res: Response): Promise<Response> => {
	try {
		const menu = await MasterMenu.findAll();

		return res.status(200).send(helper.ResponseData(200, "OK", null, menu));
	} catch (error:any) {
		return res.status(500).send(helper.ResponseData(500, "", error, null));
	}
}

const GetDetailMenu = async(req: Request, res: Response): Promise<Response>=>{
    try {
        const {id} = req.params;
        const menu = await MasterMenu.findOne({
            where:{
                id: id,
                active: true
            }
        })
        if(!menu){
            return res.status(404).send(helper.ResponseData(404, "Not Found", null, null));
        }
        return res.status(200).send(helper.ResponseData(200, "Ok", null, menu));

    } catch (error:any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
};
const UpdateMenu = async(req: Request, res: Response): Promise<Response>=>{
    try {
        const {id} = req.params;
        const {name, icon, ordering} = req.body;
        
        const menu = await MasterMenu.findOne({
            where:{
                id: id,
                active: true
            }
        })
        if(!menu){
            return res.status(404).send(helper.ResponseData(404, "Not Found", null, null));
        }
        menu.name = name;
        menu.icon = icon;
        menu.ordering = ordering;

        await menu.save();

        return res.status(200).send(helper.ResponseData(200, "Ok", null, menu));
        
    } catch (error:any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
};
const SoftDeleteMenu = async(req: Request, res: Response): Promise<Response>=>{
    try {
        const {id} = req.params;
        
        const menu = await MasterMenu.findOne({
            where:{
                id: id,
                active: true
            }
        })
        if(!menu){
            return res.status(404).send(helper.ResponseData(404, "Not Found", null, null));
        }
        menu.active = false;
        await menu.save();

        return res.status(200).send(helper.ResponseData(200, "Removed", null, menu));
        
    } catch (error:any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
};
const DeletePermanentMenu = async(req: Request, res: Response): Promise<Response>=>{
    try {
        const {id} = req.params;
        
        const menu = await MasterMenu.findByPk(id);
        if(!menu){
            return res.status(404).send(helper.ResponseData(404, "Not Found", null, null));
        }

        await menu.destroy();

        return res.status(200).send(helper.ResponseData(200, "Deleted", null, menu));
        
    } catch (error:any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
};

export default {
    CreateMenu,
    GetListMenu,
    GetAllMenu,
    GetDetailMenu,
    UpdateMenu,
    SoftDeleteMenu,
    DeletePermanentMenu,
};
