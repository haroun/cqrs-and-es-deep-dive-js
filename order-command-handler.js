const orderCommandHandler = repository => {
  const handleRegisterToConference = command => {
    const items = command.seats.Select(t => new OrderItem(t.seatType, t.quantity)).ToList()
    const order = repository.find(command.orderId)
    if (order === null) {
      order = new Order(command.orderId, command.conferenceId, items)
    } else {
      order.updateSeats(items)
    }

    repository.save(order, command.id)
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
