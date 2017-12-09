const command = require('./command')

const makeSeatReservation = ({id, conferenceId, reservationId, numberOfSeats} = {}) => {
  const name = 'make-seat-reservation'

  return Object.assign(
    {},
    command({id, name}),
    {
      conferenceId: () => conferenceId,
      reservationId: () => reservationId,
      numberOfSeats: () => numberOfSeats
    }
  )
}

module.exports.makeSeatReservation = makeSeatReservation
