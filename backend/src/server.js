import app from "./app.js";
import dotenv from 'dotenv';
import {sessionCheck} from "./middlewares/AuthMiddleWire.js";   
import AuthRoutes from "./routes2.0/AuthRoutes.js";
import CommentRoutes from "./routes2.0/CommentRoutes.js";

dotenv.config({path: './../.env'}); //configure path if current file is not as in root
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Hello");
})

app.use('/api/auth', AuthRoutes);
app.use("/api/comment", CommentRoutes);

app.use("/api", sessionCheck);  //??



app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`)
})   
