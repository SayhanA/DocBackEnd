require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/datebase");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();
        
        app.listen(PORT, () => {
            console.log('----------------------------------------------------------');
            console.log(`Doctor Tracking System Server Started`);
            console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
            console.log(`Doctor Tracking System Server is running on port ${PORT}`);
            console.log(`URL: http://localhost:${PORT}`);
            console.log('----------------------------------------------------------');
        });

    } catch (error) {
        onsole.error(`Error occurred while starting the server: ${error.message}`);
        process.exit(1);
    }
};

startServer();