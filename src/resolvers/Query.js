import { models } from "../db";

const Query = {
  ticket: async (root, args, context) => {
    return models.Ticket.findByPk(args.id);
  },
  tickets: async (root, args, context) => {
    return models.Ticket.findAll({
      where: {
        parentId: null
      }
    });
  }
}

export default Query
