/* Routes file to direct url and request type to proper controller and method */
//import controllers
import express from "express"
import TripsCtrl from "./controllers/tripsController.js"
/* import RidersCtrl from "./controllers/ridersController.js" */
import EventsCtrl from "./controllers/eventsController.js"
/* import MotorcyclesCtrl from "./controllers/motorcyclesController.js"  */

const router = express.Router()
//from base url /motorcycleTripsProject - route extensions

/* Trips Routes*/
/* Get requests */
router.route("/trips").get(TripsCtrl.getTrips);
router.route("/trips/id/:id").get(TripsCtrl.getTripById); 
/* All other requests C, U, D */
router.route("/trips").post(TripsCtrl.addTrip);
router.route("/trips").put(TripsCtrl.editTrip);
router.route("/trips").delete(TripsCtrl.deleteTrip) 

/* ROUTES TO BE CODED... */
/* Riders Routes*/
/* router.route("/riders").get(RidersCtrl.getRiders);
router.route("/riders/id/:id").get(RidersCtrl.getRiderById);

router.route("/riders").post(RidersCtrl.addRider);
router.route("/riders").put(RidersCtrl.editRider);
router.route("/riders").delete(RidersCtrl.deleteRider) */

/* Events Routes*/
router.route("/events").get(EventsCtrl.getEvents);
router.route("/events/id/:id").get(EventsCtrl.getEventById);

router.route("/events").post(EventsCtrl.addEvent);
router.route("/events").put(EventsCtrl.editEvent);
router.route("/events").delete(EventsCtrl.deleteEvent) 
/* Motorcycles Routes*/
/* router.route("/motorcycles").get(MotorcyclesCtrl.getMotorcycles);
router.route("/motorcycles/id/:id").get(MotorcyclesCtrl.getMotorcycleById);

router.route("/motorcycles").post(MotorcyclesCtrl.addMotorcycle);
router.route("/motorcycles").put(MotorcyclesCtrl.editMotorcycle);
router.route("/motorcycles").delete(MotorcyclesCtrl.deleteMotorcycle); */

export default router