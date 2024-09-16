import ticketModel from "../dao/models/ticket.model.js";

class ticketRepository {
  async createTicket(amount, purchaser) {
    const ticket = new ticketModel({
      code: Date.now().toString(),
      purchase_datetime: new Date(),
      amount,
      purchaser,
    });
    return await ticketModel.save();
  }
}

export default new ticketRepository();