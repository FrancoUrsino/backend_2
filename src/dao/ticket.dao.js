import Ticket from '../models/ticket.model.js';

export class TicketDAO {
  async createTicket(data) {
    const ticket = new Ticket(data);
    return await ticket.save();
  }
}

export default new TicketDAO();