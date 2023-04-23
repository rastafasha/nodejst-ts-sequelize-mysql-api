import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

interface UserData {
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    roleId: string | null,
    verified: boolean | null,
    active: boolean | null

}


const ResponseData = (status: number, message: string | null, error:any | null, data: any | null)=>{
    if(error != null && error instanceof Error){
        const response = {
            status: status,
            message: message,
            errors: error,
            data: null
        }

        return response;
    }

    const res = {
        status,
        message,
        errors: error,
        data: data
    };

    return res;
}

const GenerateToken =(data:any): string=>{
    const token = jwt.sign(data, process.env.JWT_TOKEN as string, {expiresIn: "10m"});

    return token;
}
const GenerateFreshToken =(data:any): string=>{
    const token = jwt.sign(data, process.env.JWT_REFRESH_TOKEN as string, {expiresIn: "1d"});

    return token;
}

const ExtractToken = (token: string): UserData | null =>{
    const secretKey:string = process.env.JWT_TOKEN as string; 

    let respData: any;
    const res = jwt.verify(token, secretKey,(err, decoded)=>{
        if(err){
            respData = null
        }else{
            respData = decoded
        }
    } );

    if(respData){
        const result: UserData = <UserData>(respData);
        return result;
    }

    return null;
}

const ExtractRefreshToken = (token: string): UserData | null =>{
    const secretKey:string = process.env.JWT_REFRESH_TOKEN as string; 

    let respData: any;
    const res = jwt.verify(token, secretKey,(err, decoded)=>{
        if(err){
            respData = null
        }else{
            respData = decoded
        }
    } );

    if(respData){
        const result: UserData = <UserData>(respData);
        return result;
    }

    return null;
}

export default {
    ResponseData,
    GenerateToken,
    GenerateFreshToken,
    ExtractToken,
    ExtractRefreshToken
};