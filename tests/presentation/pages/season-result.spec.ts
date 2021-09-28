import { SeasonResult } from '@/presentation/pages'
import { getSeasonResultState } from '@/presentation/pages/season-result/components'
import { UnexpectedError } from '@/domain/errors'
import { GetResultsForYearSpy, GetChampionForYearSpy, mockGetResultsForYearModel, mockGetChampionForYearModel } from '@/tests/domain/mocks'
import { renderWithHistory } from '@/tests/presentation/mocks'

import { screen, waitFor, fireEvent } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { GetChampionForYear, GetResultsForYear } from '@/domain/usecases'

type SutTypes = {
  getResultsForYearSpy: GetResultsForYearSpy
  getChampionForYearSpy: GetChampionForYearSpy
  history: MemoryHistory
  pageRender: void
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
  
  const pageRender = renderWithHistory({
    history,
    Page: () => SeasonResult({ loadSeasonResult: getResultsForYearSpy, loadSeasonChampion: getChampionForYearSpy }),
  })

  return {
    getResultsForYearSpy,
    getChampionForYearSpy,
    history,
    pageRender
  }
}

describe('SurveyResult Component', () => {
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

  test('Should call LoadSurveyResult on reload', async () => {
    const getResultsForYearSpy = new GetResultsForYearSpy()
    jest.spyOn(getResultsForYearSpy, 'getResultsForYear').mockRejectedValueOnce(new UnexpectedError())
    makeSut({ getResultsForYearSpy })
    await waitFor(() => screen.getByTestId('season-result'))

    fireEvent.click(screen.getByTestId('reload'))

    expect(getResultsForYearSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByTestId('season-result'))
  })

  test('Should goto SurveyList on back button click', async () => {
    const { history } = makeSut()
    await waitFor(() => screen.getByTestId('season-result'))

    fireEvent.click(screen.getByTestId('go-home'))

    expect(history.location.pathname).toBe('/seasons')
  })
})
