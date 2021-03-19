import { models } from "../db"

const Ticket = {
  children (parent) {
    // Fetch all tickets that have this parentId
    return models.Ticket.findAll({
      where: {
        parentId: parent.id
      }
    })
  }
}

export default Ticket
