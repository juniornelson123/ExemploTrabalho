const CHANNEL = "TESTE"
const sampleItems = [
  {name: 'Apple'},
  {name: 'Banana'},
  {name: 'Orange'},
  {name: 'Melon'},
]
  
  
export const resolvers = {
  Query: {
    items: () => sampleItems,
  },

  Mutation: {
    addItem: (parent, { name }, { pubsub }) => {
      const newItem = { name: name }
      sampleItems.push(newItem)

      pubsub.publish(CHANNEL, {itemAdd: newItem})
      return newItem
    }
  },

  Subscription: {
    itemAdd: {
      subscribe: (parent, args, { pubsub }) => {
        return pubsub.asyncIterator(CHANNEL)
      },
    }
  },
}
  