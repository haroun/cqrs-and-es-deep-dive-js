const id = null
const version = null
const events = []

const iEventSourced = {
  id: () => id,
  version: () => version,
  events: () => events
}

module.exports.iEventSourced = iEventSourced
