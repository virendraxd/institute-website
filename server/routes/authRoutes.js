import express from "express";
import jwt from "jsonwebtoken";

// dotenv.config();
const router = express.Router();

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
    ) {
        const token = jwt.sign(
            { role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
        );

        return res.json({ token });
    }

    return res.status(401).json({
        message: "Invalid credentials",
    });
});

export default router;