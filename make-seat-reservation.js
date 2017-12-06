const uuid = require('./uuid')

const makeSeatReservation = () => {
  const id = uuid.generate()
  const name = 'make-seat-reservation'

  const iCommand = {
    id: () => id,
    name: () => name
  }

  return Object.assign(
    {},
    iCommand,
    {
      conferenceId: null,
      reservationId: null,
      numberOfSeats: null
    }
  )
}

module.exports.makeSeatReservation = makeSeatReservation
