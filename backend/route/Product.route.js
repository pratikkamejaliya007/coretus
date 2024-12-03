import { Router } from "express";
import { createProduct , getProducts , getProductById , updateProduct , deleteProduct } from "../controller/Product.controller.js";

import uploadpic from "../middleware/multer.js";

const ProductRouter = Router()

ProductRouter.post("/",uploadpic,createProduct)
ProductRouter.get("/",getProducts)
ProductRouter.get("/:id",getProductById)
ProductRouter.put("/:id",uploadpic,updateProduct)
ProductRouter.delete("/:id",deleteProduct)

export default ProductRouter