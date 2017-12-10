const seatsAvailability = require('./seats-availability')

const eventHandler = ({repository} = {}) => ({
  handle: seatsAdded => {
    const availability = repository.find(seatsAdded.conferenceId()) ||
      seatsAvailability({conferenceId: seatsAdded.conferenceId()})

    availability.addSeats({sourceId: seatsAdded.sourceId(), quantity: seatsAdded.addedQuantity()})

    repository.save(availability)
  }
})

module.exports.eventHandler = eventHandler
