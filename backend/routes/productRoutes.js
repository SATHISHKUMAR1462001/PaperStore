import { Router } from "express";
import { addProduct, getAllProducts,createProductReview, getSingleProduct, getUpdateProduct, viewProductRevies,DeleteAdmineReviews } from "../controller/productController.js";
import { verifyUser } from "../helpers/userAuth.js";
//import {createProductReview} from '../controller/userControler.js'
import { roleBasedAccess } from "../helpers/userAuth.js";
const router = Router();



router.route("/products").get(getAllProducts)
router.route("/product").post(getAllProducts)
router.route("/product/:id").get(getSingleProduct)
router.route("/review").put(verifyUser,createProductReview)
router.route("/admin/product/create").post(verifyUser,roleBasedAccess("admin"),addProduct);
router.route("/admin/product/:id").put(verifyUser,roleBasedAccess("admin"),getUpdateProduct).delete(verifyUser,roleBasedAccess("admin"),DeleteAdmineReviews);
router.route("/admin/review").put(verifyUser,roleBasedAccess("admin"),getUpdateProduct).delete(verifyUser,roleBasedAccess("admin"),DeleteAdmineReviews);
router.route("/admin/reviews").get(verifyUser,roleBasedAccess("admin"), viewProductRevies)
// router.post("/admin/product/new",Product);

//user review


export default router;