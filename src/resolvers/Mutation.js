import { models } from "../db"

const Mutation = {
  createTicket: async (root, args, context) => {
    const { title, isCompleted } = args
    return models.Ticket.create({ title, isCompleted })
  },

  updateTicket: async (root, args, context) => {
    const { id, title } = args
    const ticket = await models.Ticket.findByPk(id)

    if (!ticket) {
      throw new Error('This ticket does not exist')
    }

    await ticket.update({ title })
    return ticket
  },

  toggleTicket: async (root, args, context) => {
    const { id, isCompleted } = args
    const ticket = await models.Ticket.findByPk(id)

    if (!ticket) {
      throw new Error('This ticket does not exist')
    }

    await ticket.update({ isCompleted })
    return ticket
  },

  removeTicket: async (root, args, context) => {
    return models.Ticket.destroy({
      where: { id: args.id }
    })
  },
  
  addChildrenToTicket: async (root, args, context) => {
    const { parentId, childrenIds } = args
    const parentTicket = await models.Ticket.findByPk(parentId)

    if (!parentTicket) {
      throw new Error('This parent ticket does not exist')
    }

    // Find and update all the child tickets
    Promise.all(
      childrenIds.map(id => {
        models.Ticket.update({ parentId }, {
          where: { id }
        })
      })
    )

    return parentTicket
  },
  
  setParentOfTicket: async (root, args, context) => {
    const { parentId, childId } = args
    const parentTicket = await models.Ticket.findByPk(parentId)
    const childTicket = await models.Ticket.findByPk(childId)

    // First check that both tickets exist
    if (!parentTicket || !childTicket) {
      throw new Error('One of these tickets does not exist')
    }

    await childTicket.update({ parentId })
    return childTicket
  },

  removeParentFromTicket: async (root, args, context) => {
    const { id } = args
    const ticket = await models.Ticket.findByPk(id)

    if (!ticket) {
      throw new Error('This ticket does not exist')
    }

    await ticket.update({ parentId: null })
    return ticket
  }
}

export default Mutation
