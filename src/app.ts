
import express from "express";
import { PrismaClient } from "@prisma/client";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { Request,Response,NextFunction } from "express";
import  router from "./routes/userroutes";
import batchrouter from "./routes/batchroutes";
import subscriptionrouter from "./routes/subscriptionroutes";
const app = express();
const PORT = 3000;

export const prisma = new PrismaClient();

// compresses all the responses
app.use(compression());
// make the headers secure
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', router);
app.use('/batch', batchrouter);
app.use('/subscription',subscriptionrouter);
app.get('/', (req: Request, res: Response) => {
    res.send('Yoga Form API');
});

app.listen(PORT, ()=> {
    console.log(`Yoga server is running on port ${PORT}`);
})
