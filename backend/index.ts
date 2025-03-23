import dotenv from 'dotenv';
import http from 'http';
import mongoose from 'mongoose';
import app from './app';

const server = http.createServer(app);
// io.on('connection', (socket) => {
//     setInterval(async () => {
//         try {
//             const device = await devices.createDevice();
//             socket.emit('newDevice', device);
//         } catch (error) {
//             console.error('Error generating and saving device:', error);
//         }
//     }, 10000);
// });
dotenv.config();
const PORT = process.env.PORT || 3001;
const MONGOURI =
    process.env.MONGODB_URI ||
    'mongodb+srv://marclaszlolucian:KillerMonstah14@mpp-cluster.oqnkv3y.mongodb.net/mppDB';
mongoose
    .connect(MONGOURI)
    .then(() => {
        console.log('Connected to MongoDB');

        server.listen(PORT, () => {
            console.log(
                `Server is running on port http://localhost:${PORT}/api`,
            );
            //populateDatabase(users);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
