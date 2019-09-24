const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _schema = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    uid: {
        type: String,
        index: true
    },
    type: {type: Number},
    title: {type: String},
    text: {type: String},
    source: {type: String},
    comment_total: {type: Number},
    like_total: {type: Number},
    medias: {type: Array},
    user: {type: Object},
    cover: {type: String},
    create_time: {
        type: Date,
        default: new Date()
    },
    update_time: {
        type: Date
    }
});


class TaskModel {

}

_schema.loadClass(TaskModel);
const model = mongoose.model('oasis_posts', _schema, 'oasis_posts');
export default model;
