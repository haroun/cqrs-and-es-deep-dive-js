const order = require('./order')
const orderItem = require('./order-item')

const orderCommandHandler = repository => {
  const handleRegisterToConference = command => {
    const items = command.seats.map(
      seat => orderItem({seatType: seat.seatType, quantity: seat.quantity})
    )

    let currentOrder = repository.find(command.orderId)
    if (currentOrder === null) {
      currentOrder = order({orderId: command.orderId, conferenceId: command.conferenceId, items})
    } else {
      currentOrder.updateSeats(items)
    }

    repository.save(currentOrder, command.id)
  }

  const handleConfirmOrder = command => {
    const order = repository.get(command.orderId)
    order.confirm()
    repository.save(order, command.id)
  }

  const handleAssignRegistrantDetails = () => null // ...

  const handleMarkSeatsAsReserved = () => null // ...

  const handleRejectOrder = () => null // ...

  return Object.assign(
    {},
    {
      handle: command => {
        if (command.name === 'register-to-conference') {
          handleRegisterToConference(command)
        } else if (command.name === 'confirm-order') {
          handleConfirmOrder(command)
        } else if (command.name === 'assign-registrant-details') {
          handleAssignRegistrantDetails(command)
        } else if (command.name === 'mark-seats-as-reserved') {
          handleMarkSeatsAsReserved(command)
        } else if (command.name === 'reject-order') {
          handleRejectOrder(command)
        }
      }
    }
  )
}

module.exports.orderCommandHandler = orderCommandHandler
