"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userValidation_1 = __importDefault(require("../middleware/validation/userValidation"));
const authorization_1 = __importDefault(require("../middleware/authorization"));
const MenuValidation_1 = __importDefault(require("../middleware/validation/MenuValidation"));
const RoleController_1 = __importDefault(require("../controllers/RoleController"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const masterMenuController_1 = __importDefault(require("../controllers/masterMenuController"));
const subMenuController_1 = __importDefault(require("../controllers/subMenuController"));
const categoryController_1 = __importDefault(require("../controllers/categoryController"));
const addressController_1 = __importDefault(require("../controllers/addressController"));
const commentController_1 = __importDefault(require("../controllers/commentController"));
const reviewController_1 = __importDefault(require("../controllers/reviewController"));
const productController_1 = __importDefault(require("../controllers/productController"));
const tutorialController_1 = __importDefault(require("../controllers/tutorialController"));
const router = express_1.default.Router();
//roles
router.get('/api/role/all', authorization_1.default.Authenticated, authorization_1.default.UserRole, RoleController_1.default.GetRole);
router.post('/api/role/create', authorization_1.default.Authenticated, RoleController_1.default.CreateRole);
router.put('/api/role/update/:id', authorization_1.default.Authenticated, RoleController_1.default.UpdateRole);
router.delete('/api/role/delete/:id', authorization_1.default.Authenticated, authorization_1.default.SuperAdminRole, RoleController_1.default.DeleteRole);
router.get('/api/role/:id', authorization_1.default.Authenticated, RoleController_1.default.GetRoleById);
//user 
router.post('/api/user/signup', userValidation_1.default.RegisterValidation, UserController_1.default.Register);
router.post('/api/user/login', UserController_1.default.UserLogin);
router.get('/api/user/refreshtoken', UserController_1.default.RefeshToken);
router.get('/api/user/current-user', authorization_1.default.Authenticated, UserController_1.default.UserDetail);
router.get('/api/user/logout', authorization_1.default.Authenticated, UserController_1.default.UserLogout);
router.put('/api/user/updaterole/:id', authorization_1.default.Authenticated, authorization_1.default.SuperAdminRole, UserController_1.default.UpdateUserRole);
router.put('/api/user/update/:id', authorization_1.default.Authenticated, UserController_1.default.UpdateUser, UserController_1.default.upload);
router.put('/api/user/activate/:id', authorization_1.default.Authenticated, authorization_1.default.SuperAdminRole, UserController_1.default.ActivateUser);
//master menu
router.post('/api/menu/create', authorization_1.default.Authenticated, MenuValidation_1.default.CreateMenuValidation, masterMenuController_1.default.CreateMenu);
router.get('/api/menu/:id', authorization_1.default.Authenticated, masterMenuController_1.default.GetDetailMenu);
router.get('/api/menu/all', authorization_1.default.Authenticated, authorization_1.default.AdminRole, masterMenuController_1.default.GetAllMenu);
router.get('/api/menu/list', authorization_1.default.Authenticated, authorization_1.default.SuperAdminRole, masterMenuController_1.default.GetListMenu);
router.put('/api/menu/update/:id', authorization_1.default.Authenticated, MenuValidation_1.default.CreateMenuValidation, masterMenuController_1.default.UpdateMenu);
router.delete('/api/menu/delete/:id', authorization_1.default.Authenticated, authorization_1.default.SuperAdminRole, masterMenuController_1.default.DeletePermanentMenu);
router.delete('/api/menu/softdelete/:id', authorization_1.default.Authenticated, authorization_1.default.SuperAdminRole, masterMenuController_1.default.SoftDeleteMenu);
// submenu 
router.post('/api/submenu/create', authorization_1.default.Authenticated, MenuValidation_1.default.CreateSubmenuValidation, subMenuController_1.default.CreateSubmenu);
router.get('/api/submenu/list', authorization_1.default.Authenticated, authorization_1.default.SuperAdminRole, subMenuController_1.default.GetListSubmenu);
router.get('/api/submenu/all', authorization_1.default.Authenticated, authorization_1.default.AdminRole, subMenuController_1.default.GetAllSubmenu);
router.get('/api/submenu/:id', authorization_1.default.Authenticated, subMenuController_1.default.GetDetailSubmenu);
router.put('/api/submenu/update/:id', authorization_1.default.Authenticated, MenuValidation_1.default.CreateSubmenuValidation, subMenuController_1.default.UpdateSubmenu);
router.delete('/api/submenu/delete/:id', authorization_1.default.Authenticated, authorization_1.default.SuperAdminRole, subMenuController_1.default.DeletePermanent);
router.delete('/api/submenu/softdelete/:id', authorization_1.default.Authenticated, authorization_1.default.SuperAdminRole, subMenuController_1.default.SoftDelete);
//address
router.get('/api/address/all', authorization_1.default.Authenticated, addressController_1.default.GetAddresses);
router.post('/api/address/create', authorization_1.default.Authenticated, addressController_1.default.CreateAddress);
router.put('/api/address/update/:id', authorization_1.default.Authenticated, addressController_1.default.UpdateAddress);
router.delete('/api/address/delete/:id', authorization_1.default.Authenticated, addressController_1.default.DeleteAddress);
router.get('/api/address-user/:id', authorization_1.default.Authenticated, addressController_1.default.AddressDetail);
//category
router.get('/api/category/all', authorization_1.default.Authenticated, categoryController_1.default.GetCategory);
router.post('/api/category/create', authorization_1.default.Authenticated, categoryController_1.default.CreateCategory);
router.put('/api/category/update/:id', authorization_1.default.Authenticated, categoryController_1.default.UpdateCategory);
router.delete('/api/category/delete/:id', authorization_1.default.Authenticated, authorization_1.default.SuperAdminRole, categoryController_1.default.DeleteCategory);
router.get('/api/category/:id', authorization_1.default.Authenticated, categoryController_1.default.GetCategoryById);
//comment
router.get('/api/comment/all', authorization_1.default.Authenticated, commentController_1.default.GetComments);
router.post('/api/comment/create', authorization_1.default.Authenticated, commentController_1.default.CreateComment);
router.delete('/api/comment/delete/:id', authorization_1.default.Authenticated, authorization_1.default.SuperAdminRole, commentController_1.default.DeleteComment);
router.get('/api/commentbyuser/:id', authorization_1.default.Authenticated, commentController_1.default.GetCommentByUser);
router.get('/api/commentbyproduct/:id', authorization_1.default.Authenticated, commentController_1.default.GetCommentByProduct);
router.get('/api/commentbytutorial/:id', authorization_1.default.Authenticated, commentController_1.default.GetCommentByTutorial);
//review
router.get('/api/review/all', authorization_1.default.Authenticated, reviewController_1.default.GetReviews);
router.post('/api/review/create', authorization_1.default.Authenticated, reviewController_1.default.CreateReview);
router.delete('/api/review/delete/:id', authorization_1.default.Authenticated, authorization_1.default.SuperAdminRole, reviewController_1.default.DeleteReview);
router.get('/api/reviewbyuser/:id', authorization_1.default.Authenticated, reviewController_1.default.GetReviewByUser);
router.get('/api/reviewbyproduct/:id', authorization_1.default.Authenticated, reviewController_1.default.GetReviewByProduct);
router.get('/api/reviewbytutorial/:id', authorization_1.default.Authenticated, reviewController_1.default.GetReviewByTutorial);
//product
router.get('/api/product/all', authorization_1.default.Authenticated, productController_1.default.GetProducts);
router.get('/api/product/published', authorization_1.default.Authenticated, productController_1.default.GetProductsPublished);
router.post('/api/product/create', authorization_1.default.Authenticated, authorization_1.default.SuperAdminRole, productController_1.default.CreateProduct, productController_1.default.upload);
router.put('/api/product/update/:id', authorization_1.default.Authenticated, authorization_1.default.SuperAdminRole, productController_1.default.UpdateProduct, productController_1.default.upload);
router.delete('/api/product/delete/:id', authorization_1.default.Authenticated, authorization_1.default.SuperAdminRole, productController_1.default.DeleteProduct);
router.get('/api/product/:id', authorization_1.default.Authenticated, productController_1.default.GetProductById);
router.get('/api/productbyuser/:id', authorization_1.default.Authenticated, productController_1.default.GetProductByUser);
//tutorial
router.get('/api/tutorial/all', authorization_1.default.Authenticated, tutorialController_1.default.GetTutorials);
router.get('/api/tutorial/published', authorization_1.default.Authenticated, tutorialController_1.default.GetTutorialsPublished);
router.post('/api/tutorial/create', authorization_1.default.Authenticated, authorization_1.default.SuperAdminRole, tutorialController_1.default.CreateTutorial, tutorialController_1.default.upload);
router.put('/api/tutorial/update/:id', authorization_1.default.Authenticated, authorization_1.default.SuperAdminRole, tutorialController_1.default.UpdateTutorial, tutorialController_1.default.upload);
router.delete('/api/tutorial/delete/:id', authorization_1.default.Authenticated, authorization_1.default.SuperAdminRole, tutorialController_1.default.DeleteTutorial);
router.get('/api/tutorial/:id', authorization_1.default.Authenticated, tutorialController_1.default.GetTutorialById);
router.get('/api/tutorialbyuser/:id', authorization_1.default.Authenticated, tutorialController_1.default.GetTutorialByUser);
exports.default = router;
