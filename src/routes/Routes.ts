import express from "express";
import userValidation from "../middleware/validation/userValidation";
import authorization from "../middleware/authorization";

import RoleController from "../controllers/RoleController";
import UserController from "../controllers/UserController";
import masterMenuController from "../controllers/masterMenuController";
import subMenuController from "../controllers/subMenuController";
import MenuValidation from "../middleware/validation/MenuValidation";


const router = express.Router();

router.get('/api/role/all', authorization.Authenticated, authorization.UserRole, RoleController.GetRole );
router.post('/api/role/create', authorization.Authenticated, RoleController.CreateRole );
router.put('/api/role/update/:id', authorization.Authenticated, RoleController.UpdateRole );
router.delete('/api/role/delete/:id',authorization.Authenticated, authorization.SuperAdminRole, RoleController.DeleteRole );
router.get('/api/role/:id', authorization.Authenticated, RoleController.GetRoleById );

//user routes
router.post('/api/user/signup',userValidation.RegisterValidation, UserController.Register );
router.post('/api/user/login', UserController.UserLogin );
router.get('/api/user/refreshtoken', UserController.RefeshToken );
router.get('/api/user/current-user', authorization.Authenticated, UserController.UserDetail );
router.get('/api/user/logout', authorization.Authenticated, UserController.UserLogout );
router.put('/api/user/updaterole/:id', authorization.Authenticated, authorization.SuperAdminRole, UserController.UpdateUserRole );
router.put('/api/user/update/:id', authorization.Authenticated, UserController.UpdateUser );
router.put('/api/user/activate/:id', authorization.Authenticated, authorization.SuperAdminRole, UserController.ActivateUser );

//master menu
router.post('/api/menu/create', authorization.Authenticated, MenuValidation.CreateMenuValidation, masterMenuController.CreateMenu );
router.get('/api/menu/:id', authorization.Authenticated, masterMenuController.GetDetailMenu );
router.get('/api/menu/all', authorization.Authenticated, authorization.AdminRole, masterMenuController.GetAllMenu);
router.get('/api/menu/list', authorization.Authenticated, authorization.SuperAdminRole, masterMenuController.GetListMenu);
router.put('/api/menu/update/:id', authorization.Authenticated, MenuValidation.CreateMenuValidation, masterMenuController.UpdateMenu );
router.delete('/api/menu/delete/:id',authorization.Authenticated, authorization.SuperAdminRole, masterMenuController.DeletePermanentMenu );
router.delete('/api/menu/softdelete/:id',authorization.Authenticated, authorization.SuperAdminRole, masterMenuController.SoftDeleteMenu );

// submenu 
router.post('/api/submenu/create', authorization.Authenticated, MenuValidation.CreateSubmenuValidation, subMenuController.CreateSubmenu );
router.get('/api/submenu/list', authorization.Authenticated, authorization.SuperAdminRole, subMenuController.GetListSubmenu);
router.get('/api/submenu/all', authorization.Authenticated, authorization.AdminRole, subMenuController.GetAllSubmenu);
router.get('/api/submenu/:id', authorization.Authenticated, subMenuController.GetDetailSubmenu );
router.put('/api/submenu/update/:id', authorization.Authenticated, MenuValidation.CreateSubmenuValidation, subMenuController.UpdateSubmenu );
router.delete('/api/submenu/delete/:id',authorization.Authenticated, authorization.SuperAdminRole, subMenuController.DeletePermanent );
router.delete('/api/submenu/softdelete/:id',authorization.Authenticated, authorization.SuperAdminRole, subMenuController.SoftDelete );



export default router;