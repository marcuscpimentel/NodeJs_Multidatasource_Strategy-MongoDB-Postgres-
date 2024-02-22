const mongoS = require('./db/strategies/mongodb')
const postgS = require('./db/strategies/postgres')
const Context = require('./db/strategies/base/ContextStrategy')

const contextM = new Context(new mongoS())
console.log(contextM.create())

const contextP = new Context(new postgS())
console.log(contextP.create())