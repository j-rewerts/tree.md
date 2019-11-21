const fastify = require('fastify')({
  logger: true
})
const converters = require('./converters')
const GitTree = require('./git-tree')
let gitTree = new GitTree()


fastify.get('/converter/:id', async (request, reply) => {
  let id = request.params.id
  if (!converters[id]) {
    reply.type('text/plain').code(400)
    return `No ${id} converter available.`
  }

  let url = request.query['url']
  if (!url) {
    reply.type('text/plain').code(422)
    return `Please provide a url as a search parameter.`
  }

  const tree = await gitTree.getTree(url)
  const convertedTree = converters[id].converter(tree)
  reply.type(converters[id].type).code(200)
  return convertedTree
})

fastify.listen(process.env.PORT || 80, '0.0.0.0', (err, address) => {
  if (err) throw err
  fastify.log.info(`server listening on ${address}`)
})