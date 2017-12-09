const versionedEvent = require('./versioned-event')

const availableSeatsChanged = ({sourceId, version, seats} = {}) => {
  return Object.assign(
    {},
    versionedEvent({sourceId, version}),
    {
      seats: () => seats
    }
  )
}

module.exports.availableSeatsChanged = availableSeatsChanged
