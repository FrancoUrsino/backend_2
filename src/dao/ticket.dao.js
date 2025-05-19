import Ticket from '../models/ticket.model.js';

export class TicketDAO {
  async createTicket(data) {
    const ticket = new Ticket(data);
    return await ticket.save();
  }

  // Podés agregar otros métodos si querés (getTickets, getTicketById, etc)
}

export default new TicketDAO();
