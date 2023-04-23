import { Request, Response } from "express";
import User from "../db/models/user";
import Role from "../db/models/role";
import helper from "../helpers/helper";
import passwordHelper from "../helpers/passwordHelper";

const Register = async(req: Request, res: Response): Promise<Response>=>{
    try {
        const {firstName, lastName, email, roleId, password, confirmPassword} = req.body;

        const hashed = await passwordHelper.PasswordHashing(password);

       const user =  await User.create({
           firstName,
           lastName,
           email,
           password: hashed,
           roleId: roleId,
           active: true,
           verified: true,
       });

       return res.status(201).send(helper.ResponseData(201, "Created", null, user));

    } catch (error:any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}

const UserLogin = async(req: Request, res: Response): Promise<Response>=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if(!user){
            return res.status(401).send(helper.ResponseData(401,"Unauthorized", null, null));
        }

        const matched = await passwordHelper.PaswordCompare(password, user.password);
        if(!matched){
            return res.status(401).send(helper.ResponseData(401,"Unauthorized", null, null));
        }
        const dataUser ={
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            roleId: user.roleId,
            verified: user.verified,
            active: user.active
        };
        const token = helper.GenerateToken(dataUser);
        const refreshToken = helper.GenerateFreshToken(dataUser);
        
        user.accessToken = refreshToken;
        await user.save();

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        const responseUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            roleId: user.roleId,
            verified: user.verified,
            active: user.active,
            token: token
        }

        return res.status(200).send(helper.ResponseData(200, "Ok", null, responseUser));


    } catch (error:any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}

const RefeshToken = async(req: Request, res: Response): Promise<Response>=>{
    try {
        const refreshToken = req.cookies?.refreshToken;
        if(!refreshToken){
            return res.status(401).send(helper.ResponseData(401,"Unauthorized", null, null));
        }

        const decodedUser = helper.ExtractRefreshToken(refreshToken);
        if(!decodedUser){
            return res.status(401).send(helper.ResponseData(401,"Unauthorized", null, null));
        }

        const token = helper.GenerateToken({
            firstName: decodedUser.firstName,
            lastName: decodedUser.lastName,
            email: decodedUser.email,
            roleId: decodedUser.roleId,
            verified: decodedUser.verified,
            active: decodedUser.active
        });

        const resultUser = {
            firstName: decodedUser.firstName,
            lastName: decodedUser.lastName,
            email: decodedUser.email,
            roleId: decodedUser.roleId,
            verified: decodedUser.verified,
            active: decodedUser.active,
            token: token
        }

        return res.status(200).send(helper.ResponseData(200, "Ok", null, resultUser))

    } catch (error:any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}

const UserDetail = async (req: Request, res: Response): Promise<Response> => {
	try {
		const email = res.locals.userEmail;
		const user = await User.findOne({
			where: {
				email: email
			},
            include: {
                model: Role,
                attributes: ["id", "roleName"]
            }
		});

		if (!user) {
			return res.status(404).send(helper.ResponseData(404, "User not found", null, null));
		}

		user.password = "";
		user.accessToken = "";
		return res.status(200).send(helper.ResponseData(200, "OK", null, user));
	} catch (error:any) {
		return res.status(500).send(helper.ResponseData(500, "", error, null));
	}
};

const UserLogout = async (req: Request, res: Response): Promise<Response> => {
    try {
        const refreshToken = req.cookies?.refreshToken;
        if(!refreshToken){
            return res.status(200).send(helper.ResponseData(200, "User logout", null, null));
        }
        const email = res.locals.userEmail;
		const user = await User.findOne({
			where: {
				email: email
			}
		});
        if(!user){
            res.clearCookie('refreshToken');
            return res.status(200).send(helper.ResponseData(200, "User logout", null, null));
        }

        await user.update({accessToken: null}, {where: {email:email}} );
        res.clearCookie('refreshToken');
        return res.status(200).send(helper.ResponseData(200, "User logout", null, null));

    } catch (error:any) {
		return res.status(500).send(helper.ResponseData(500, "", error, null));
	}
}
export default {
    Register,
    UserLogin,
    RefeshToken,
    UserDetail,
    UserLogout
}