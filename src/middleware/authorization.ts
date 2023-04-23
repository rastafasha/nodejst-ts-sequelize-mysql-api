import {Request, Response, NextFunction} from 'express';
import helper from '../helpers/helper';

const Authenticated = (req: Request, res: Response, next: NextFunction)=>{
    try {
        const authtoken = req.headers['authorization'];
        const token = authtoken && authtoken.split(" ")[1];

        if(token === null){
            return res.status(401).send(helper.ResponseData(401,"Unauthorized", null, null));
        }

        const result = helper.ExtractToken(token!);
        if(!result){
            return res.status(401).send(helper.ResponseData(401,"Unauthorized", null, null));
        }
        res.locals.userEmail = result?.email;
        res.locals.roleId = result?.roleId;
        next();


    } catch (error:any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}

const SuperAdminRole = (req: Request, res: Response, next: NextFunction) =>{
    try {
       const roleId = res.locals.roleId;
       if(roleId !== 1){
        return res.status(401).send(helper.ResponseData(401,"Forbidden", null, null));
       }
       next(); 

    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}

const AdminRole = (req: Request, res: Response, next: NextFunction) =>{
    try {
       const roleId = res.locals.roleId;
       if(roleId !== 2){
        return res.status(401).send(helper.ResponseData(401,"Forbidden", null, null));
       }
       next(); 

    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}

const UserRole = (req: Request, res: Response, next: NextFunction) =>{
    try {
       const roleId = res.locals.roleId;
       if(roleId !== 3){
        return res.status(401).send(helper.ResponseData(401,"Forbidden", null, null));
       }
       next(); 

    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}

export default {
    Authenticated,
    SuperAdminRole,
    AdminRole,
    UserRole
}