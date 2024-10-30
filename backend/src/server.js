import app from "./app.js";
import dotenv from 'dotenv';
import AuthRoutes from "./routes2.0/AuthRoutes.js";

dotenv.config({path: './../.env'}); //configure path if current file is not as in root
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Hello");
})

app.use('/api/auth', AuthRoutes);

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`)
})   
