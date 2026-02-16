import express from "express";
import auth from "../middleware/auth.js";
import { createCustomer, getCustomers, getCustomerById, updateCustomer, deleteCustomer } from "../controller/customer.js";


const customerRouter = express.Router();

customerRouter.post("/create", auth, createCustomer);
customerRouter.get("/get", auth, getCustomers);
customerRouter.get("/:id", auth, getCustomerById);
customerRouter.put("/update/:id", auth, updateCustomer);
customerRouter.delete("/delete/:id", auth, deleteCustomer);

export default customerRouter;