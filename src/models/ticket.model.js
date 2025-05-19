import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  purchase_datetime: { type: Date, required: true },
  amount: { type: Number, required: true },
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;