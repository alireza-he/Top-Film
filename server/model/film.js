const mongoose = require("mongoose");
const voteSchema = require("./vote");
const commentSchema = require("./comment");

const {Schema} = mongoose;

const filmSchema = new Schema({
    name: {type: String, required: true},
    content: {type: String, required: true},
    imdb_score: {type: Number, required: true},
    date: {type: Number, required: true},
    time: {type: Number, required: true},
    score: {type: Number, default: 0},
    votes: [voteSchema],
    comments: [commentSchema],
    poster: {
        type: Schema.Types.ObjectId,
        ref: "Media",
        // autopopulate:true
    },
    video: {
        type: Schema.Types.ObjectId,
        ref: "Media",
        // autopopulate:true
    },
    views: {type: Number, default: 0},
    category: {
        type: String,
        enum: ["scifi", "documantry", "animation", "action"],
        required: true
    },
    created: {type: Date, default: Date.now, required: true}
})
// filmSchema.plugin(require('mongoose-autopopulate'));
filmSchema.set('toJSON', {gettes: true})
filmSchema.options.toJSON.transform = (doc, ret) => {
    const abj = {...ret}
    delete abj.__v
    return abj
}
filmSchema.pre(/^find/, function () {
    this.populate('poster')
    // this.populate('video')
})
module.exports = mongoose.models.Film || mongoose.model('Film', filmSchema)