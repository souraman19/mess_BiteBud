import app from "./app.js";
import dotenv from 'dotenv';
import {sessionCheck} from "./middlewares/AuthMiddleWire.js";   
import AuthRoutes from "./routes2.0/AuthRoutes.js";
import CommentRoutes from "./routes2.0/CommentRoutes.js";
import ComplaintRoutes from "./routes2.0/ComplaintRoutes.js";
import galleryRoutes from "./routes2.0/galleryRoutes.js";
import messMenuRoutes from "./routes2.0/MessMenuRoutes.js";
import userProfileRoutes from "./routes2.0/userProfileRoutes.js";
import expenseRoutes from "./routes2.0/ExpenseRoutes.js";
import groceryRoutes from "./routes2.0/GroceryRoutes.js";
import { authMiddleware } from "./middlewares/AuthMiddleWire.js";

dotenv.config({path: './../.env'}); //configure path if current file is not as in root
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Hello");
})

// app.use((req, res, next) => {
//     console.log('Session Data:', req.session);
//     next();
// });

app.get("/set-cookie", (req, res) => {
  res.cookie("testCookie", "testValue", { httpOnly: true });
  res.send("Cookie set");
});

app.get("/read-cookie", (req, res) => {
  console.log(req.cookies);  // Should log { testCookie: 'testValue' }
  res.send(req.cookies);
});

app.get('/api/check-session', (req, res) => {
    if (req.isAuthenticated()) {
      return res.json({ message: 'Session is active', user: req.user });
    } else {
      return res.status(401).json({ message: 'Session expired or user not logged in' });
    }
  });


app.use((req, res, next) => {
    // return;
    // console.log(req.path);
    if (req.path === "/api/auth/login" || req.path === "/api/auth/verify-otp" || req.path === "/api/auth/get-otp" || req.path === "/api/auth/register-user") {
        // console.log(req.path);
        return next(); // Skip auth check for login & signup
    }
    // console.log("h", req.path);
    else {
        authMiddleware(req, res, next);
    }
});

app.use('/api/auth', AuthRoutes);
app.use('/api/user-profile', userProfileRoutes);
app.use("/api/comment", CommentRoutes);
app.use("/api/complaint", ComplaintRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/mess-menu", messMenuRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/grocery", groceryRoutes);




app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`)
})   
