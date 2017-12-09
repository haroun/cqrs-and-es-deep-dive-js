const uuid = require('./uuid')

const command = ({id, name} = {}) => {
  id = id !== null && id !== undefined ? id : uuid.generate()

  return {
    id: () => id,
    name: () => name
  }
}

module.exports.command = command
