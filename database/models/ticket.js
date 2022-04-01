const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    author: { type: String, maxlength: 30, required: true },
    title: { type: String, maxlength: 30, required: true },
    description: { type: String, maxlength: 240, required: false },
    status: { type: String, enum: ['Open', 'Work in progress', 'Closed'], required: true },
});

exports.TicketSchema = TicketSchema;
exports.Ticket = mongoose.model('Ticket', TicketSchema);
