import express from "express";
import RoleController from "../controllers/RoleController";
import UserController from "../controllers/UserController";
import masterMenuController from "../controllers/masterMenuController";
import userValidation from "../middleware/validation/userValidation";
import authorization from "../middleware/authorization";

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

//master menu
router.post('/api/menu/create', authorization.Authenticated, masterMenuController.CreateMenu );
router.get('/api/menu/:id', authorization.Authenticated, masterMenuController.GetDetailMenu );
router.get('/api/menu/all', authorization.Authenticated, authorization.AdminRole, masterMenuController.GetAllMenu);
router.get('/api/menu/list', authorization.Authenticated, authorization.SuperAdminRole, masterMenuController.GetListMenu);
router.put('/api/menu/update/:id', authorization.Authenticated, masterMenuController.UpdateMenu );
router.delete('/api/menu/delete/:id',authorization.Authenticated, authorization.SuperAdminRole, masterMenuController.DeletePermanentMenu );
router.delete('/api/menu/softdelete/:id',authorization.Authenticated, authorization.SuperAdminRole, masterMenuController.SoftDeleteMenu );


export default router;