const eventSourced = require('./event-sourced')
const orderUpdated = require('./order-udpated')

const orderMixin = ({id, history} = {}) => {
  /**
   * @type {Object[]} seatQuantity collection
   */
  let seats = [] // FIXME: something missing here

  const onOrderUpdated = orderUpdated => {
    seats = orderUpdated.seats
  }

  const order = Object.assign(
    {},
    eventSourced(id, history, {'order-updated': onOrderUpdated}),
    {
      updateSeats: seats => {
        this.update(orderUpdated({seats}))
      }
    }
  )

  return order
}

module.exports.order = orderMixin

// public struct SeatQuantity
// {
//     ...
// }
