/* Specifies server properties and export as 'app' */
import express from 'express'
import cors from 'cors'
import routes from './routes.js'

const app = express();

/* Set server to use cors, json */
app.use(cors());
app.use(express.json());
app.use("/motorcycleTripsProject", routes);//This url will be the base url for dabase requests - extensions managed by routes.js
app.use("*", (req, res) => res.status(404).json({error:"not found"}))//any url request which base request does not match required shows error

export default app;