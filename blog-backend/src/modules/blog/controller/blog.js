import CommentModel from "../../../../DB/model/Blog.model.js";
import UserModel from "../../../../DB/model/User.model.js";

export const getCommentModule =  async (req, res, next) => {

    try {

        //pageination
        const UserPage =req.query.page * 1  || 1 ;
        const blogPerPage = 3 ;
        const skipItems = (UserPage - 1) * blogPerPage;
        const posts = await CommentModel.find({}).skip(skipItems).limit(blogPerPage)
        .populate({path: "User_Id" ,select:"_id" });
       const totalpost =  await CommentModel.find({})
        const pagesCount =  Math.ceil(totalpost.length / blogPerPage);
        return res.json({ message: "Done",data: posts ,pagesCount:pagesCount , UserPage});
      } catch (error) {
        return res.json({
          message: "Catch error",
          error,
          stack: error.stack,
        });
      }
}
export const addComment =  async (req, res, next) => {

    try {
        const { User_Id } = req.query;
        const { title , body } = req.body;
        let UserExist = await UserModel.findById({_id: User_Id , isDeleted: false})
        if(UserExist === null){
         return res.status(404).json({ message: "This user isnot Exist Try again"})
        }else{
          const Post = await CommentModel.create({ title,body ,User_Id});
          return res.status(200).json({ message: "Your Post is added Successfully", Post });
    
        }
    
      } catch (err) {
        return res.json({
          message: "Catch error",
          err,
          stack: err.stack,
        });
      }
}
export const getCommentById =  async (req, res, next) => {

    try {
        const {id}= req.params
        const post = await CommentModel.findById({_id:id}).populate({path: "User_Id"});
        return res.json({ message: "Done", post });
      } catch (error) {
        return res.json({
          message: "Catch error",
          error,
          stack: error.stack,
        });
      }
}
export const updateComment =  async (req, res, next) => {

    try {
        const {id}= req.params
        const { user_Id } = req.query;
        const { body ,title } = req.body;
        let UserExist = await UserModel.findById({_id:user_Id  , isDeleted: false})
        
        if(UserExist === null){
          return res.status(404).json({ message: "This user isnot Exist in Database"})
        }
        const post = await CommentModel.findOneAndUpdate({_id:id ,User_Id:user_Id},{ body ,title },{new:true})
        .populate({path: "User_Id" ,select:"userName  -_id" });
        return post ? res.status(200).json({ message: "This comment updated successfully", post })
        : res.status(404).json({ message: "This User Is Not Uthorized"})
     ;
      } catch (error) {
        return res.json({
          message: "Catch error",
          error,
          stack: error.stack,
        });
      }
}
export const deleteComment =  async (req, res, next) => {

    try {
        const {id}= req.params
        const { user_Id } = req.query;
        
        let UserExist = await UserModel.findById({_id:user_Id  , isDeleted: false})
        
        if(UserExist === null){
          return res.json({ message: "This user isnot Exist in Database"})
        }
        const comments = await CommentModel.findOneAndDelete({_id:id ,User_Id:user_Id})
        return comments ? res.json({ message: "This comment deleted successfully" })
        : res.json({ message: "This User Is Not Uthorized"})
     ;
      } catch (error) {
        return res.json({
          message: "Catch error",
          error,
          stack: error.stack,
        });
      }
}
