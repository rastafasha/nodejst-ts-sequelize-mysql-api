import { Request, Response } from "express";
import Comment from "../db/models/comment";
import helper from "../helpers/helper";
import User from "../db/models/user";
import Product from "../db/models/product";
import Tutorial from "../db/models/tutorial";

const GetComments = async (req: Request, res: Response): Promise<Response> =>{
    try {
        const comments = await Comment.findAll();
        return res.status(200).send(helper.ResponseData(200, "OK", null, comments));
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}
const CreateComment = async (req: Request, res: Response): Promise<Response> =>{
    try {
        const {name, productId, userId, tutorialId, text} = req.body;

        const comment = await Comment.create({
            name, 
            productId, 
            userId, 
            tutorialId, 
            text
        });

        return res.status(201).send(helper.ResponseData(201, "Created", null, comment));
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}

const DeleteComment = async (req: Request, res: Response): Promise<Response> =>{
    try {

        const { id } = req.params;
		const comment = await Comment.findOne({
			where: {
				id: id
			}
		});

		if (!comment) {
			return res.status(404).send(helper.ResponseData(404, "NotFound", null, null));
		}

		await comment.destroy();
		return res.status(200).send(helper.ResponseData(200, "Deleted", null, comment));
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}
const GetCommentByUser = async (req: Request, res: Response): Promise<Response> =>{
    try {
        const { userId } = req.params;
		const comment = await Comment.findOne({
			where: {
				userId: userId
			},
            include: {
                model: User,
                attributes: ["id", "firstName"]
            }
		});

		if (!comment) {
			return res.status(404).send(helper.ResponseData(404, "Comment not found", null, null));
		}

		return res.status(200).send(helper.ResponseData(200, "OK", null, comment));
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}

const GetCommentByProduct = async (req: Request, res: Response): Promise<Response> =>{
    try {
        const { productId } = req.params;
		const comment = await Comment.findOne({
			where: {
				productId: productId
			},
            include: {
                model: Product,
                attributes: ["id", "name"]
            }
		});

		if (!comment) {
			return res.status(404).send(helper.ResponseData(404, "Comment not found", null, null));
		}

		return res.status(200).send(helper.ResponseData(200, "OK", null, comment));
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}
const GetCommentByTutorial = async (req: Request, res: Response): Promise<Response> =>{
    try {
        const { tutorialId } = req.params;
		const comment = await Comment.findOne({
			where: {
				tutorialId: tutorialId
			},
            include: {
                model: Tutorial,
                attributes: ["id", "name"]
            }
		});

		if (!comment) {
			return res.status(404).send(helper.ResponseData(404, "Comment not found", null, null));
		}

		return res.status(200).send(helper.ResponseData(200, "OK", null, comment));
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}

export default {
    GetComments,
    CreateComment,
    DeleteComment,
    GetCommentByUser,
    GetCommentByProduct,
    GetCommentByTutorial
};