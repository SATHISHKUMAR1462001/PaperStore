import express from 'express';
import { registerUser,loginUser,logoutUser,forgetPassword,updateUserRole,getAllUser,updateProfile,resetPassword,getUserDetails,updatePassword,getSingleUser, deleteUser } from '../controller/userControler.js';

import { roleBasedAccess, verifyUser } from "../helpers/userAuth.js";


const router=express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forget").post(forgetPassword);
router.route("/reset/:token").post(resetPassword);
router.route("/profile").get(verifyUser,getUserDetails);
router.route('/password/update').put(verifyUser,updatePassword)
router.route('/profile/update').put(verifyUser,updateProfile)
router.route('/admine/users').get(verifyUser,roleBasedAccess("admin"),getAllUser)
router.route('/admine/user/:id').get(verifyUser,roleBasedAccess("admin"),getSingleUser).put(verifyUser,roleBasedAccess("admin"),updateUserRole).delete(verifyUser,roleBasedAccess("admin"),deleteUser)


export default router;