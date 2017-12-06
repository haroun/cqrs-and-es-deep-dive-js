const iEventSourced = require('./i-event-sourced')

const eventSourcedMixin = id => {
  const handlers = {}
  const pendingEvents = []

  let version = -1

  const handles = event => {
    handlers[event.type] = () => handler
  }

  const loadFrom = pastEvents => {
    pastEvents.forEach((pastEvent) => {
      handlers[pastEvent.type].invoke(pastEvent)
      version = event.version
    })
  }

  const update = versionedEvent => {
    versionedEvent.sourceId = id
    versionedEvent.version = version + 1
    handlers[versionedEvent].invoke(versionedEvent)
    version = versionedEvent.version
    pendingEvents.push(versionedEvent)
  }

  Object.assign(
    {},
    iEventSourced,
    {
      events: () => pendingEvents
    }
  )
}

module.exports.eventSourced = eventSourcedMixin
