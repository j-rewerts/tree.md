const fastify = require('fastify')({
  logger: true
})
const converters = require('./converters')
const filters = require('./filters')
const GitTree = require('./git-tree')

let gitTree = new GitTree()
let filterOptionReg = new RegExp('filter(\\d)([a-zA-Z]+)')

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

  // Parse filter options. See buildFilters for why we do it this way.
  let filterQuery = Object.entries(request.query).filter(([key, value]) => {
    return key.includes('filter')
  })
  let filterArray;
  try {
    filterArray = buildFilters(filterQuery)
  } catch (err) {
    reply.type('text/plain').code(422)
    return err.message
  }

  let tree = await gitTree.getTree(url)
  for ({ type, options, f } of filterArray) {
    try {
      tree = f(tree, options)
    } catch (err) {
      reply.type('text/plain').code(500)
      return `Failed when running ${type} filter.`
    }
  }
  const convertedTree = converters[id].converter(tree)
  reply.type(converters[id].type).code(200)
  return convertedTree
})

fastify.listen(process.env.PORT || 80, '0.0.0.0', (err, address) => {
  if (err) throw err
  fastify.log.info(`server listening on ${address}`)
})

/** 
 * Builds the set of filters from the url query params. This could be improved
 * in the future.
 * @param {Array} filterQueries An array of key value pairs.
 * @param {Array} filterQueries.0 An array of the form [key, value].
 * Key would be filter1 or filter1optionName and value would be folder, 
 * or optionValue
 * @returns {Array} An array of Objects. Each Object is of the form:
 * {
 *   type: 'filterType',
 *   f: func(),
 *   options: {
 *     option1: 'abcdefg'
 *   }
 * }
 */
let buildFilters = (filterQueries) => {
  let filtersArray = []
  let i;
  let findNext = ([key, value]) => {
    return key === `filter${i}`
  }
  for (i = 1, filter = filterQueries.find(findNext); filter != undefined; i++ , filter = filterQueries.find(findNext)) {
    let [key, value] = filter
    let f = filters[value]

    if (f === undefined) {
      throw new Error(`No filter called ${value}.`)
    }

    let options = {}
    let filterOptions = filterQueries.filter(([key, value]) => {
      let ts = filterOptionReg.test(key)
      return key.includes(`filter${i}`) && filterOptionReg.test(key)
    })
    filterOptions.forEach(([longName, value]) => {
      let opts = longName.match(filterOptionReg)
      options[opts[2]] = value
    })
    filtersArray.push({
      type: value,
      options,
      f: filters[value]
    })
  }
  return filtersArray
}