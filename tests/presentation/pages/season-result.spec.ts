import { SeasonResult } from '@/presentation/pages'
import { UnexpectedError } from '@/domain/errors'
import { GetResultsForYearSpy, GetChampionForYearSpy, mockGetResultsForYearModel, mockGetChampionForYearModel } from '@/tests/domain/mocks'
import { renderWithHistory } from '@/tests/presentation/mocks'

import { screen, waitFor, fireEvent, cleanup } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { GetChampionForYear, GetResultsForYear } from '@/domain/usecases'
import '@testing-library/jest-dom'

type SutTypes = {
  getResultsForYearSpy: GetResultsForYearSpy
  getChampionForYearSpy: GetChampionForYearSpy
  history: MemoryHistory
  setMock: (mock: any) => void
}

type SutParams = {
  getResultsForYearSpy?: GetResultsForYearSpy
  getChampionForYearSpy?: GetChampionForYearSpy
  initialState?: {
    isLoading: boolean
    error: string
    seasonResult: GetResultsForYear.Model,
    seasonChampion: GetChampionForYear.Model,
    reload: boolean
  }
}

const makeSut = ({ getResultsForYearSpy = new GetResultsForYearSpy(), getChampionForYearSpy = new GetChampionForYearSpy(), initialState = null }: SutParams = {}): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/', '/seasons/any_year'], initialIndex: 1 })
  
  const { setMock } = renderWithHistory({
    history,
    Page: () => SeasonResult({ loadSeasonResult: getResultsForYearSpy, loadSeasonChampion: getChampionForYearSpy }),
  })

  return {
    getResultsForYearSpy,
    getChampionForYearSpy,
    history,
    setMock
  }
}

describe('SurveyResult Component', () => {
  afterEach(cleanup)
  test('Should present correct initial state', async () => {
    makeSut()
    const seasonResult = screen.getByTestId('season-result')

    expect(seasonResult.childElementCount).toBe(1)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).toBeInTheDocument()
    await waitFor(() => seasonResult)
  })

  test('Should call LoadSeasonResult', async () => {
    const { getResultsForYearSpy } = makeSut()
    await waitFor(() => screen.getByTestId('season-result'))

    expect(getResultsForYearSpy.callsCount).toBe(1)
  })

  test('Should present SeasonResult data on success', async () => {
    const getResultsForYearSpy = new GetResultsForYearSpy();
    const results = {
      ...mockGetResultsForYearModel(),
    }
    getResultsForYearSpy.results = results;

    makeSut({ getResultsForYearSpy })
    await waitFor(() => screen.getByTestId('season-result'))
    await waitFor(() => screen.getByTestId('season-results'))

    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    expect(screen.getByTestId('circuit-name')).toHaveTextContent("Albert Park Grand Prix Circuit");
    expect(screen.getByTestId('race-round')).toHaveTextContent("Round 1");
    expect(screen.getByTestId('date-of-race')).toHaveTextContent("Sun Mar 15 2015");
    expect(screen.getByTestId('driver-full-name')).toHaveTextContent("Lewis Hamilton");
    expect(screen.getByTestId('race-time')).toHaveTextContent("1:31:54.067");
  })

  test('Should render error on UnexpectedError', async () => {
    const getResultsForYearSpy = new GetResultsForYearSpy()
    const error = new UnexpectedError()
    jest.spyOn(getResultsForYearSpy, 'getResultsForYear').mockRejectedValueOnce(error)
    makeSut({ getResultsForYearSpy })
    await waitFor(() => screen.getByTestId('season-result'))

    expect(screen.getByTestId('error')).toHaveTextContent(error.message)
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })

  test('Should call LoadSeasonResult on reload', async () => {
    const getResultsForYearSpy = new GetResultsForYearSpy()
    jest.spyOn(getResultsForYearSpy, 'getResultsForYear').mockRejectedValueOnce(new UnexpectedError())
    makeSut({ getResultsForYearSpy })
    await waitFor(() => screen.getByTestId('season-result'))

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()

    fireEvent.click(screen.getByTestId('reload'))
    expect(getResultsForYearSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByTestId('season-result'))
  })

  test('Should goto SeasonList on home icon click', async () => {
    const { history } = makeSut()
    await waitFor(() => screen.getByTestId('season-result'))

    fireEvent.click(screen.getByTestId('go-home'))

    expect(history.location.pathname).toBe('/seasons')
  })
})
