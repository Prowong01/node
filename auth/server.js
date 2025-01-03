require('dotenv').config();
const express = require('express');
const connectToDB = require("./database/db");

const authRoutes = require('./routes/auth-routes')
const homeRoutes = require('./routes/home-routes')
const adminRoutes = require('./routes/admin-routes')
const uploadImageRoutes = require("./routes/image-routes");

const app = express();
const port = process.env.PORT || 3000;

connectToDB();

// Middlewares
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/image", uploadImageRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
