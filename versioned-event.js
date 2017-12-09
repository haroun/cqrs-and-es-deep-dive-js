const versionedEvent = ({sourceId, version} = {}) => ({
  sourceId: () => sourceId,
  version: () => version
})

module.exports.versionedEvent = versionedEvent
