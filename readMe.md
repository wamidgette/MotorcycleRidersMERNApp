# MotorcycleTripsMERNApp
Motorcycle trips web application using MongoDB, Express.js, React.js, and Node.js. 

## Main Goal
- The end goal is to create a web application where riders can browse and sign up for trips and events with other riders. The rider can make a profile with their personal information as well as what kind of motorcycle they ride, so they can see if the other riders signed up for the trip are a good match for them. Admin users have additional permissions of being able to update and delete events, trips, motorcycles, and riders.

## Collections
- The database collections are: Trips, Events, Motorcycles, and Riders. CRUD functionality in backend currently complete for Trips entity. Front end in progress.

## Current Status 
- CRUD functionality for Trips controller working. DAO methods dbAddTrip, dbGetTrip, dbGetTripById, dbEditTrip, dbDeleteTrip all tested well using postman 

## Future Expansion
- Currently, there are websites that allow riders to sign up for paid trips. However, these do not really have a community feeling, and the main purpose is not to get riders in touch with one another. I want this app to be a place where riders can make friends, join fun trips - not for profit - and learn about places they can take lessons or rent a motorcycle from. I also want to include a blog section that allows riders to post about trips they have done, so that other riders who are interested in going to the same place are able to get ideas for similar trips.
