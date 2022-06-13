const Media = require("../model/media");
const fs = require("fs");
const path = require("path")

const createMedia = async (req, res, next) => {
    const medias = req.files;
    try {
        const response = await medias.reduce(
            async (memo, {fieldName, originalname, mimetype, filename, size}) => {
                const beforeResults = await memo;

                const obj = {
                    alt: originalname,
                    name: filename,
                    size,
                    media: {
                        data: fs.readFileSync(
                            path.resolve(__dirname, `../../uploads/${filename}`)
                        ),
                        contentType: mimetype
                    },
                }
                console.log(obj)
                const newMedia = await Media.create(obj)
                console.log(newMedia)
                fs.unlinkSync(path.resolve(__dirname, `../../uploads/${filename}`))
                return [...beforeResults, newMedia]
            },
            [])

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}

const deleteMedia = async (id) => {
    try {
        const deletedMedia = await Media.findByIdAndDelete(id)

        return deletedMedia

    } catch (err) {
        throw err
    }
}

module.exports = {
    createMedia,
    deleteMedia
}