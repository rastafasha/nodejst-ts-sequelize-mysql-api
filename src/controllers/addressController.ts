import { Request, Response } from "express";
import Address from "../db/models/address";
import helper from "../helpers/helper";
import User from "../db/models/user";

const GetAddresses = async(req: Request, res: Response): Promise<Response>=>{
    try {

        const addresses = await Address.findAll();

		return res.status(200).send(helper.ResponseData(200, "OK", null, addresses));
        
    } catch (error:any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}

const CreateAddress = async(req: Request, res: Response): Promise<Response>=>{
    try {
        
		
		const { phone1, phone2, userId, type, city, state, zip } = req.body;

		// const address = await Address.findOne({
		// 	where: {
		// 		userId: userId
		// 	}
		// });

		const address = await Address.create({
            userId, phone1, phone2, type, city, state, zip
        });
		


		return res.status(201).send(helper.ResponseData(201, "Created", null, address));
        
    } catch (error:any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}

const UpdateAddress = async(req: Request, res: Response): Promise<Response>=>{
    try {

        const { id } = req.params;
		const { phone1, phone2, userId, type, city, state, zip} = req.body;
		const address = await Address.findOne({
			where: {
				id: id
			}
		});

		if (!address) {
			return res.status(404).send(helper.ResponseData(404, "NotFound", null, null));
		}

		address.phone1 = phone1;
		address.phone2 = phone2;
		address.userId = userId;
		address.type = type;
		address.city = city;
		address.state = state;
		address.zip = zip;

		await address.save();
		return res.status(200).send(helper.ResponseData(200, "Updated", null, address));
        
    } catch (error:any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}

const DeleteAddress = async(req: Request, res: Response): Promise<Response>=>{
    try {

        const {id} = req.params;
        
        const address = await Address.findByPk(id);
        if(!address){
            return res.status(404).send(helper.ResponseData(404, "Not Found", null, null));
        }

        await address.destroy();

        return res.status(200).send(helper.ResponseData(200, "Deleted", null, address));
        
    } catch (error:any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}

const AddressDetail = async (req: Request, res: Response): Promise<Response> => {
	try {
		const userId = res.locals.userId;
		const address = await Address.findOne({
			where: {
				userId: userId
			},
            include: {
                model: User,
                attributes: ["id", "userId"]
            }
		});

		if (!address) {
			return res.status(404).send(helper.ResponseData(404, "Address not found", null, null));
		}

		return res.status(200).send(helper.ResponseData(200, "OK", null, address));
	} catch (error:any) {
		return res.status(500).send(helper.ResponseData(500, "", error, null));
	}
};


export default {
    GetAddresses,
    CreateAddress,
    UpdateAddress,
    DeleteAddress,
    AddressDetail
};