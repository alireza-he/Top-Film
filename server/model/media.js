const mongoose = require("mongoose");

const {Schema} = mongoose;

const mediaSchema = new Schema({
    alt: String,
    name: {type: String, required: true},
    size: {type: String, required: true},
    media: {
        data: {type: Buffer, required: true},
        contentType: {type: String, required: true},
    },
    created: {type: Date, default: Date.now, required: true},
})
mediaSchema.set('toJSON', {gettes: true})
mediaSchema.options.toJSON.transform = (doc, ret) => {
    const abj = {...ret}
    delete abj.__v
    return abj
}
module.exports = mongoose.models.Media || mongoose.model('Media', mediaSchema)