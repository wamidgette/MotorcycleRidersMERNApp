const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TripSchema = new Schema({
    trip_name: {
        type: String,
        required: true,
    },
    trip_start: {
        type: Date,
        required: true,
    },
    trip_end: {
        type: Date,
        required: true,
    },
    start_location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    end_location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    /* Could be many riders for one trip */
    rider_id: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ]
    });

export default TripSchema