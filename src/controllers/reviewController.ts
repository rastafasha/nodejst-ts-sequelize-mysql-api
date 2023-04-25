import { Request, Response } from "express";
import Review from "../db/models/review";
import helper from "../helpers/helper";
import User from "../db/models/user";
import Product from "../db/models/product";
import Tutorial from "../db/models/tutorial";

const GetReviews = async (req: Request, res: Response): Promise<Response> =>{
    try {
        const reviews = await Review.findAll();
        return res.status(200).send(helper.ResponseData(200, "OK", null, reviews));
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}
const CreateReview = async (req: Request, res: Response): Promise<Response> =>{
    try {
        const {rating, productId, userId, tutorialId, description} = req.body;

        const review = await Review.create({
            rating, 
            productId, 
            userId, 
            tutorialId, 
            description
        });

        return res.status(201).send(helper.ResponseData(201, "Created", null, review));
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}
const DeleteReview = async (req: Request, res: Response): Promise<Response> =>{
    try {
        const { id } = req.params;
		const review = await Review.findOne({
			where: {
				id: id
			}
		});

		if (!review) {
			return res.status(404).send(helper.ResponseData(404, "NotFound", null, null));
		}

		await review.destroy();
		return res.status(200).send(helper.ResponseData(200, "Deleted", null, review));
        
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}
const GetReviewByUser = async (req: Request, res: Response): Promise<Response> =>{
    try {
        const { userId } = req.params;
		const review = await Review.findOne({
			where: {
				userId: userId
			},
            include: {
                model: User,
                attributes: ["id", "firstName"]
            }
		});

		if (!review) {
			return res.status(404).send(helper.ResponseData(404, "Review not found", null, null));
		}

		return res.status(200).send(helper.ResponseData(200, "OK", null, review));
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}
const GetReviewByProduct = async (req: Request, res: Response): Promise<Response> =>{
    try {

        const { productId } = req.params;
		const review = await Review.findOne({
			where: {
				productId: productId
			},
            include: {
                model: Product,
                attributes: ["id", "name"]
            }
		});

		if (!review) {
			return res.status(404).send(helper.ResponseData(404, "Review not found", null, null));
		}

		return res.status(200).send(helper.ResponseData(200, "OK", null, review));
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}
const GetReviewByTutorial = async (req: Request, res: Response): Promise<Response> =>{
    try {

        const { tutorialId } = req.params;
		const review = await Review.findOne({
			where: {
				tutorialId: tutorialId
			},
            include: {
                model: Tutorial,
                attributes: ["id", "name"]
            }
		});

		if (!review) {
			return res.status(404).send(helper.ResponseData(404, "Review not found", null, null));
		}

		return res.status(200).send(helper.ResponseData(200, "OK", null, review));
        
    } catch (error: any) {
        return res.status(500).send(helper.ResponseData(500, "", error, null));
    }
}

export default {
    GetReviews,
    CreateReview,
    DeleteReview,
    GetReviewByUser,
    GetReviewByProduct,
    GetReviewByTutorial
};