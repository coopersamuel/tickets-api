import { models } from "../db"

const Query = {
  ticket: async (root, args, context) => {
    const ticket = await models.Ticket.findByPk(args.id)

    if (!ticket) {
      throw new Error('This ticket does not exist')
    }

    return ticket
  },
  tickets: async (root, args, context) => {
    return models.Ticket.findAll({
      where: {
        parentId: null
      }
    })
  }
}

export default Query
