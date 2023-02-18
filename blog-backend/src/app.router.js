import authRouter from './modules/auth/auth.router.js';
import userRouter from './modules/user/user.router.js'
import blogRouter from './modules/blog/blog.router.js';
import mongoose from 'mongoose';
// import path from "path";
// import { fileURLToPath } from 'url';
import connectionDb from '../DB/connection.js';



const initApp = (app, express) => {
    // const __filename = fileURLToPath(import.meta.url);
    // const __dirname = path.dirname(__filename);
    app.use(express.json({}))
    mongoose.set('strictQuery', false)
    connectionDb()
    //for image
    // app.use("/images", express.static(path.join(__dirname, "public/images")));
    app.get('/', (req, res) => res.send('Hello World!'))

    app.use('/auth', authRouter)
    app.use('/user', userRouter)
    app.use('/blog', blogRouter)

    app.use("*" , (req,res)=>{
        return res.json({message:"404 Page Not Found"})
    })

}


export default initApp