import { models } from "../db";

const Mutation = {
  createTicket: async (root, args, context) => {
    const { title, isCompleted } = args
    return models.Ticket.create({ title, isCompleted });
  },
  updateTicket: async (root, args, context) => {
    const { id, title } = args
    await models.Ticket.update(
      { title }, {
      where: { id }
    });

    // Find and return the updated ticket (Sequelize does not return it by default)
    return models.Ticket.findByPk(id);
  }
}

export default Mutation
