import app from './server.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
/* import RidersDAO from './dao/ridersDAO.js' */
import TripsDAO from './dao/tripsDAO.js'
/* import EventsDAO from './dao/eventsDAO.js'
import MotorcyclesDAO from './dao/motorcyclesDAO.js' */
/* Configure database connection string, collections, and port - see .env*/
dotenv.config()
 
const MongoClient = mongodb.MongoClient

const port = process.env.port || 8000

MongoClient.connect(
    process.env.MOTORCYCLE_TRIPS_DB_URI, 
    {
        /* poolSize:50, */ //is not supported - look into this 
        wtimeoutMS:2500,
        /* useNewUrlParse:true */ //Is not supported - look into this 
    }
)

.catch(err=>{
    console.error(err.stack)
    process.exit(1)
})

.then(async client => {
    /* await RidersDAO.injectDB(client) */
    await TripsDAO.injectDB(client)
    /* await EventsDAO.injectDB(client)
    await MotorcyclesDAO.injectDB(client) */ 
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})  