import Validator from 'validatorjs';
import {Request, Response, NextFunction} from 'express';
import helper from "../../helpers/helper";
import User from '../../db/models/user';

const RegisterValidation = async(req:Request, res: Response, next: NextFunction)=>{
    try {
        const {firstName, lastName, email, password, confirmPassword} = req.body;

        const data ={
            firstName, lastName, email, password, confirmPassword
        }

        const rules: Validator.Rules={
            "firstName": "required|string|max:50",
            "lastName": "required|string|max:50",
            "email": "required|email",
            "password": "required|min:5",
            "confirmPassword": "required|same:password"

        }

        const validate = new Validator(data, rules);

        if(validate.fails()){
            return res.status(400).send(helper.ResponseData(400, 'Bad Request', validate.errors, null));

        }
        const user = await User.findOne({
            where: {
                email: data.email,
            }
        });
        if(user){
            const errorData ={
                errors:{
                    email:[
                        "Email already used"
                    ]
                }
            }

            return res.status(400).send(helper.ResponseData(400, "Bad Request", errorData, null));
        }
        next();

    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }

};

export default{
    RegisterValidation   
}