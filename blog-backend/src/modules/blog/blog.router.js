import {Router} from 'express'
import * as blogController from  './controller/blog.js'
const router = Router();


router.get("/" , blogController.getCommentModule)
router.post("/" , blogController.addComment)
router.get("/:id" , blogController.getCommentById)
router.put("/updateBlog/:id" , blogController.updateComment)
router.delete("/deleteBlog/:id" , blogController.deleteComment)

export default  router