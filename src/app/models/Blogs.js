const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Post = new Schema(
    {
        _id: {type :Number},
        name: { type: String, maxLength: 255, require: true },
        description: { type: String, maxLength: 400 },
        image: { type: String },
        videoId: { type: String, maxLengt: 255 },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        _id: false,
        timestamps: true,
    },
);
Post.plugin(AutoIncrement)
//Phải ghi đè vì nếu không nó sẽ apply mặc định thay vì soft delete
Post.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true
})
mongoose.plugin(slug);
module.exports = mongoose.model('Blog', Post);
