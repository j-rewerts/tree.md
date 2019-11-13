const GitTree = require('./git-tree')

beforeEach(() => {
  console.log('Prep files')
})

afterEach(() => {
  console.log('Cleanup files')
})

test('passes easily', () => {
  expect(true).toBe(true)
})

test('clones repository', () => {
  return GitTree._gitClone('https://github.com/j-rewerts/tree.md').then(path => {
    expect(path).toBe('tree.md')
  })
})