import { Request, Response } from "express";
import SubMenu from "../db/models/submenu";
import helper from "../helpers/helper";

const CreateSubmenu = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } = req.body;

		const submenu = await SubMenu.create({
			name, masterMenuId, url, title, icon, ordering, isTargetSelf,
			active: true
		});

		return res.status(201).send(helper.ResponseData(201, "Created", null, submenu));
	} catch (error:any) {
		return res.status(500).send(helper.ResponseData(500, "", error, null));
	}
};

const GetListSubmenu = async (req: Request, res: Response): Promise<Response> => {
	try {
		const submenu = await SubMenu.findAll({
			where: {
				active: true
			}
		});

		return res.status(200).send(helper.ResponseData(200, "OK", null, submenu));
	} catch (error:any) {
		return res.status(500).send(helper.ResponseData(500, "", error, null));
	}
}
const GetAllSubmenu = async (req: Request, res: Response): Promise<Response> => {
	try {
		const submenu = await SubMenu.findAll();

		return res.status(200).send(helper.ResponseData(200, "OK", null, submenu));
	} catch (error:any) {
		return res.status(500).send(helper.ResponseData(500, "", error, null));
	}
}
const GetDetailSubmenu = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { id } = req.params;
		const submenu = await SubMenu.findOne({
			where: {
				id: id,
				active: true
			}
		});

		if (!submenu) {
			return res.status(404).send(helper.ResponseData(404, "NotFound", null, null));
		}

		return res.status(200).send(helper.ResponseData(200, "OK", null, submenu));
	} catch (error:any) {
		return res.status(500).send(helper.ResponseData(500, "", error, null));
	}
}
const UpdateSubmenu = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { id } = req.params;
		const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } = req.body;
		const submenu = await SubMenu.findOne({
			where: {
				id: id,
				active: true
			}
		});

		if (!submenu) {
			return res.status(404).send(helper.ResponseData(404, "NotFound", null, null));
		}

		submenu.name = name;
		submenu.masterMenuId = masterMenuId;
		submenu.url = url;
		submenu.title = title;
		submenu.icon = icon;
		submenu.ordering = ordering;
		submenu.isTargetSelf = isTargetSelf;
		await submenu.save();
		return res.status(200).send(helper.ResponseData(200, "Updated", null, null));
	} catch (error:any) {
		return res.status(500).send(helper.ResponseData(500, "", error, null));
	}
}
const SoftDelete = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { id } = req.params;
		const submenu = await SubMenu.findOne({
			where: {
				id: id,
				active: true
			}
		});

		if (!submenu) {
			return res.status(404).send(helper.ResponseData(404, "NotFound", null, null));
		}

		submenu.active = false;
		await submenu.save();

		return res.status(200).send(helper.ResponseData(200, "Removed", null, null));
	} catch (error:any) {
		return res.status(500).send(helper.ResponseData(500, "", error, null));
	}
}

const DeletePermanent = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { id } = req.params;
		const submenu = await SubMenu.findOne({
			where: {
				id: id,
				active: true
			}
		});

		if (!submenu) {
			return res.status(404).send(helper.ResponseData(404, "NotFound", null, null));
		}

		await submenu.destroy();
		return res.status(200).send(helper.ResponseData(200, "Deleted", null, null));
	} catch (error:any) {
		return res.status(500).send(helper.ResponseData(500, "", error, null));
	}
};

export default {
	CreateSubmenu,
	GetListSubmenu,
	GetAllSubmenu,
	GetDetailSubmenu,
	UpdateSubmenu,
	SoftDelete,
	DeletePermanent
}