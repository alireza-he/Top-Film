const mongoose = require("mongoose");

const {Schema} = mongoose;

const sliderSchema = new Schema({
    film: {type: Schema.Types.ObjectId, ref: "Film"},
    banner: {type: Schema.Types.ObjectId, ref: "Media"},
    created: {type: Date, default: Date.now(), required: true},
    show: {type: Boolean, default: false, required: true},
})
sliderSchema.set('toJSON', {gettes: true})
sliderSchema.options.toJSON.transform = (doc, ret) => {
    const abj = {...ret}
    delete abj.__v
    return abj
}
sliderSchema.pre(/^find/,function(){
    this.populate('film')
})
module.exports = mongoose.models.Slider || mongoose.model('Slider', sliderSchema)