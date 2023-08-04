import * as Searcher from '@/index'

const buffer = Searcher.loadContentFromFile(Searcher.defaultDbFile)
const searcher1 = Searcher.newWithBuffer(buffer)

const vectorIndex = Searcher.loadVectorIndexFromFile(Searcher.defaultDbFile)
const searcher2 = Searcher.newWithVectorIndex(
  Searcher.defaultDbFile,
  vectorIndex
)

const searcher3 = Searcher.newWithFileOnly(Searcher.defaultDbFile)

describe('ip2region', () => {
  it('#newWithFileOnly and search', async () => {
    const d = await searcher3.search('218.4.167.70')
    expect(d.region).equal('中国|0|江苏省|苏州市|电信')
  })

  it('#newWithVectorIndex and search', async () => {
    const d = await searcher2.search('218.4.167.70')
    expect(d.region).equal('中国|0|江苏省|苏州市|电信')
  })

  it('#newWithBuffer and search', async () => {
    const d = await searcher1.search('218.4.167.70')
    expect(d.region).equal('中国|0|江苏省|苏州市|电信')
  })
})
