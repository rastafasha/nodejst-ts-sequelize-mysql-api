import express from "express";
import userValidation from "../middleware/validation/userValidation";
import authorization from "../middleware/authorization";
import MenuValidation from "../middleware/validation/MenuValidation";

import RoleController from "../controllers/RoleController";
import UserController from "../controllers/UserController";
import masterMenuController from "../controllers/masterMenuController";
import subMenuController from "../controllers/subMenuController";
import categoryController from "../controllers/categoryController";
import addressController from "../controllers/addressController";
import commentController from "../controllers/commentController";
import reviewController from "../controllers/reviewController";
import productController from "../controllers/productController";
import tutorialController from "../controllers/tutorialController";


const router = express.Router();


//roles
router.get('/api/role/all', authorization.Authenticated, authorization.UserRole, RoleController.GetRole );
router.post('/api/role/create', authorization.Authenticated, RoleController.CreateRole );
router.put('/api/role/update/:id', authorization.Authenticated, RoleController.UpdateRole );
router.delete('/api/role/delete/:id',authorization.Authenticated, authorization.SuperAdminRole, RoleController.DeleteRole );
router.get('/api/role/:id', authorization.Authenticated, RoleController.GetRoleById );

//user 
router.post('/api/user/signup',userValidation.RegisterValidation, UserController.Register );
router.post('/api/user/login', UserController.UserLogin );
router.get('/api/user/refreshtoken', UserController.RefeshToken );
router.get('/api/user/current-user', authorization.Authenticated, UserController.UserDetail );
router.get('/api/user/logout', authorization.Authenticated, UserController.UserLogout );
router.put('/api/user/updaterole/:id', authorization.Authenticated, authorization.SuperAdminRole, UserController.UpdateUserRole );
router.put('/api/user/update/:id', authorization.Authenticated, UserController.UpdateUser, 
// UserController.upload 
);
router.put('/api/user/activate/:id', authorization.Authenticated, authorization.SuperAdminRole, UserController.ActivateUser );

//address
router.get('/api/user/address/:id', authorization.Authenticated, UserController.getUserAddress );
router.get('/api/address/all', authorization.Authenticated,  addressController.GetAddresses );
router.post('/api/address/create', authorization.Authenticated, addressController.CreateAddress);
router.put('/api/address/update/:id', authorization.Authenticated, addressController.UpdateAddress );
router.delete('/api/address/delete/:id',authorization.Authenticated,  addressController.DeleteAddress );


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


//category
router.get('/api/category/all', authorization.Authenticated, categoryController.GetCategory);
router.post('/api/category/create', authorization.Authenticated, categoryController.CreateCategory);
router.put('/api/category/update/:id', authorization.Authenticated, categoryController.UpdateCategory );
router.delete('/api/category/delete/:id',authorization.Authenticated, authorization.SuperAdminRole, categoryController.DeleteCategory );
router.get('/api/category/:id', authorization.Authenticated, categoryController.GetCategoryById );

//comment
router.get('/api/comment/all', authorization.Authenticated, commentController.GetComments);
router.post('/api/comment/create', authorization.Authenticated, commentController.CreateComment);
router.delete('/api/comment/delete/:id',authorization.Authenticated, authorization.SuperAdminRole, commentController.DeleteComment );
router.get('/api/commentbyuser/:id', authorization.Authenticated, commentController.GetCommentByUser );
router.get('/api/commentbyproduct/:id', authorization.Authenticated, commentController.GetCommentByProduct );
router.get('/api/commentbytutorial/:id', authorization.Authenticated, commentController.GetCommentByTutorial );

//review
router.get('/api/review/all', authorization.Authenticated, reviewController.GetReviews);
router.post('/api/review/create', authorization.Authenticated, reviewController.CreateReview);
router.delete('/api/review/delete/:id',authorization.Authenticated, authorization.SuperAdminRole, reviewController.DeleteReview );
router.get('/api/reviewbyuser/:id', authorization.Authenticated, reviewController.GetReviewByUser );
router.get('/api/reviewbyproduct/:id', authorization.Authenticated, reviewController.GetReviewByProduct );
router.get('/api/reviewbytutorial/:id', authorization.Authenticated, reviewController.GetReviewByTutorial );


//product
router.get('/api/product/all', authorization.Authenticated,  productController.GetProducts );
router.get('/api/product/published', authorization.Authenticated,  productController.GetProductsPublished );
router.post('/api/product/create', authorization.Authenticated, authorization.SuperAdminRole, productController.CreateProduct,
// productController.upload
);
router.put('/api/product/update/:id', authorization.Authenticated, authorization.SuperAdminRole, productController.UpdateProduct, 
// productController.upload 
);
router.delete('/api/product/delete/:id',authorization.Authenticated, authorization.SuperAdminRole, productController.DeleteProduct );
router.get('/api/product/:id', authorization.Authenticated, productController.GetProductById );
router.get('/api/productbyuser/:id', authorization.Authenticated, productController.GetProductByUser );

//tutorial
router.get('/api/tutorial/all', authorization.Authenticated, tutorialController.GetTutorials );
router.get('/api/tutorial/published', authorization.Authenticated, tutorialController.GetTutorialsPublished );
router.post('/api/tutorial/create', authorization.Authenticated, authorization.SuperAdminRole, tutorialController.CreateTutorial, 
// tutorialController.upload
 );
router.put('/api/tutorial/update/:id', authorization.Authenticated, authorization.SuperAdminRole, tutorialController.UpdateTutorial, 
// tutorialController.upload
 );
router.delete('/api/tutorial/delete/:id',authorization.Authenticated, authorization.SuperAdminRole, tutorialController.DeleteTutorial );
router.get('/api/tutorial/:id', authorization.Authenticated, tutorialController.GetTutorialById );
router.get('/api/tutorialbyuser/:id', authorization.Authenticated, tutorialController.GetTutorialByUser );


export default router;