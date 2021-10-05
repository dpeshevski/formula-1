import { createMemoryHistory, MemoryHistory } from 'history'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/seasons'] })
  return {
    history,
  }
}

describe('Header Component', () => {
  test('Should render seasons page correctly', () => {
    const { history } = makeSut()

    expect(history.location.pathname).toBe('/seasons')
  })
})