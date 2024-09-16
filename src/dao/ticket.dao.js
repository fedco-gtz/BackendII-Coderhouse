import ticket from './models/ticket.model.js';
import { v4 as uuidv4 } from 'uuid';

class ticketDao {
  async create({ amount, purchaser }) {
    const ticket = new ticket({
      code: uuidv4(),
      purchase_datetime: new Date(),
      amount,
      purchaser,
    });
    return await ticket.save();
  }

  async getById(ticketId) {
    return await ticket.findById(ticketId);
  }

  async getAll() {
    return await ticket.find();
  }
}

export default new ticketDao();