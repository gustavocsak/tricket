const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: { type: String, maxlength: 30, required: true },
    author: { type: String, maxlength: 30, required: true },
    tickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }],
});

exports.ProjectSchema = ProjectSchema;
exports.Project = mongoose.model('Project', ProjectSchema);
