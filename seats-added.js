const event = require('./event')

const seatsAdded = ({sourceId, conferenceId, totalQuantity, addedQuantity} = {}) => {
  return Object.assign(
    {},
    event(sourceId),
    {
      conferenceId: () => conferenceId,
      totalQuantity: () => totalQuantity,
      addedQuantity: () => addedQuantity
    }
  )
}

module.exports.seatsAdded = seatsAdded
