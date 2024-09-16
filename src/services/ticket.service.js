import ticketRepository from "../repositories/ticket.repository.js";

class TicketService {
  async createTicket(amount, purchaser) {
    return await ticketRepository.createTicket(amount, purchaser);
  }
}

export default new TicketService();