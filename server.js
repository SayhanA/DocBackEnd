require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

const server =app.listen(PORT, () => {
    console.log('----------------------------------------------------------');
    console.log(`Doctor Tracking System Server Started`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`Doctor Tracking System Server is running on port ${PORT}`);
    console.log(`URL: http://localhost:${PORT}`);
    console.log('----------------------------------------------------------');
});

server.on("error", (error) => {
    console.error(`Error occurred while starting the server: ${error.message}`);
    process.exit(1);
});