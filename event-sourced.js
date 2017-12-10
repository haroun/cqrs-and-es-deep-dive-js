/**
 * [eventSourcedMixin description]
 * @param  {[type]}                  id         [description]
 * @param  {[type]}                  pastEvents [description]
 * @param  {Object.<string, Object>} handlers   "{event-type: event}"
 * @return {[type]}                             [description]
 */
const eventSourcedMixin = ({id, pastEvents, handlers} = {}) => {
  /**
   * @type {Object[]} event collection
   */
  const pendingEvents = []

  let version = -1

  const handles = (type, handler) => {
    handlers[type] = handler
  }

  const loadFrom = pastEvents => {
    pastEvents.forEach(pastEvent => {
      handlers[pastEvent.type].call(pastEvent)
      version = pastEvent.version
    })
  }

  const update = versionedEvent => {
    versionedEvent.sourceId = id
    versionedEvent.version = version + 1
    handlers[versionedEvent.type].call(versionedEvent)
    version = versionedEvent.version
    pendingEvents.push(versionedEvent)
  }

  loadFrom(pastEvents)
  Object.entries(handlers).forEach(handles)

  return Object.assign(
    {},
    {
      update, // FIXME: should remain internal
      id: () => id,
      version: () => version,
      events: () => pendingEvents
    }
  )
}

module.exports.eventSourced = eventSourcedMixin
