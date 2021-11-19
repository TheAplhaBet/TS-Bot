import { Event } from "../structures/Event";
import mongoose from 'mongoose';

export default new Event("ready", () => {
    console.log("Bot is online");


    if (!process.env.mongoURL) return;

    mongoose.connect(process.env.mongoURL).then(() => console.log('Connected to mongodb'));
});
