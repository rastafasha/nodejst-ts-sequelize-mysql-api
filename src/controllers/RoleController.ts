import { Request, Response } from "express";
import Role from "../db/models/role";

const GetRole = async (req: Request, res: Response): Promise<Response> =>{
    try {
        const roles = await Role.findAll({
            where: {
                active: true
            }
        });
        return res.status(200).send({
            status: 200,
            message: 'Ok',
            data: roles
        });
    } catch (error: any) {
        if(error != null && error instanceof Error){
            return res.status(500).send({
                status: 500,
                message: error.message,
                errors: error
            });
        }
        return res.status(500).send({
            status: 500,
                message: 'Internal server error',
                errors: error
        });
    }
};

const CreateRole = async(req:Request, res: Response): Promise<Response> =>{
    try {
        const {roleName, active} = req.body;

        const create = await Role.create({
            roleName,
            active
        });

        return res.status(200).send({
            status: 200,
            message: 'Created',
            data: create
        })
        
    } catch (error: any) {
        if(error != null && error instanceof Error){
            return res.status(500).send({
                status: 500,
                message: error.message,
                errors: error
            });
        }
        return res.status(500).send({
            status: 500,
                message: 'Internal server error',
                errors: error
        });
        
    }
}

const UpdateRole = async(req:Request, res: Response): Promise<Response> =>{
    try {
        const { id} = req.params;
        const {roleName, active} = req.body;

        const role = await Role.findByPk(id);
        if(!role){
            return res.status(404).send({
                status: 404,
                message: 'Data not found',
                data: null
            });
        }

        role.roleName = roleName;
        role.active=active;

        await role.save();

        return res.status(200).send({
            status: 200,
            message: 'Ok',
            data: role
        });

        
    } catch (error: any) {
        if(error != null && error instanceof Error){
            return res.status(500).send({
                status: 500,
                message: error.message,
                errors: error
            });
        }
        return res.status(500).send({
            status: 500,
                message: 'Internal server error',
                errors: error
        });
        
    }
}

const DeleteRole = async(req:Request, res: Response): Promise<Response> =>{
    try {
        const { id} = req.params;

        const role = await Role.findByPk(id);
        if(!role){
            return res.status(404).send({
                status: 404,
                message: 'Data not found',
                data: null
            });
        }


        await role.destroy();

        return res.status(200).send({
            status: 200,
            message: 'Deleted data',
            data: role
        });
        
    } catch (error: any) {
        if(error != null && error instanceof Error){
            return res.status(500).send({
                status: 500,
                message: error.message,
                errors: error
            });
        }
        return res.status(500).send({
            status: 500,
                message: 'Internal server error',
                errors: error
        });
        
    }
}

const GetRoleById = async(req:Request, res: Response): Promise<Response> =>{
    try {
        const { id} = req.params;

        const role = await Role.findByPk(id);
        if(!role){
            return res.status(404).send({
                status: 404,
                message: 'Data not found',
                data: null
            });
        }

        return res.status(200).send({
            status: 200,
            message: 'Ok',
            data: role
        });
        
    } catch (error: any) {
        if(error != null && error instanceof Error){
            return res.status(500).send({
                status: 500,
                message: error.message,
                errors: error
            });
        }
        return res.status(500).send({
            status: 500,
                message: 'Internal server error',
                errors: error
        });
        
    }
}

export default {
    GetRole,
    CreateRole,
    UpdateRole,
    DeleteRole,
    GetRoleById
};