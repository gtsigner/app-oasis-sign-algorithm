const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _schema = new Schema({
    uid: {
        type: String,
        unique: true,
        required: true,
    },
    name: {type: String},
    nickname: {type: String},
    description: {type: String, default: ''},
    gender: {type: String},
    city: {type: String},
    avatar: {type: String},
    birthday: {type: String},
    create_time: {
        type: Date,
        default: new Date()
    },
    update_time: {
        type: Date,
    }
});


class TaskModel {

}

_schema.loadClass(TaskModel);
const model = mongoose.model('oasis_users', _schema, 'oasis_users');
export default model;
