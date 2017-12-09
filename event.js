const event = ({sourceId} = {}) => ({
  sourceId: () => sourceId
})

module.exports.event = event
