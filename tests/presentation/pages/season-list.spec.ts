import { createMemoryHistory, MemoryHistory } from 'history';
import { screen, waitFor, fireEvent } from '@testing-library/react';

import { SeasonList } from '@/presentation/pages';
import { UnexpectedError } from '@/domain/errors';

import { GetDriverStandingsSpy } from '@/tests/domain/mocks';
import { renderWithHistory } from '@/tests/presentation/mocks'

type SutTypes = {
  getDriverStandingsSpy: GetDriverStandingsSpy,
  history: MemoryHistory,
  renderPage: void
}

const makeSut = (getDriverStandingsSpy = new GetDriverStandingsSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/', '/seasons'] })
  
  const renderPage = renderWithHistory({
    history,
    Page: () => SeasonList({ loadSeasonList: getDriverStandingsSpy })
  })

  return {
    getDriverStandingsSpy,
    history,
    renderPage
  }
}

describe('SeasonList Component', () => {
  test('Should call LoadSeasonList', async () => {
    const { getDriverStandingsSpy } = makeSut();

    expect(getDriverStandingsSpy.callsCount).toBe(1);
    await waitFor(() => screen.getByRole('heading'));
  })

  test('Should render SeasonItem on success', async () => {
    makeSut();
    const surveyList = screen.getByTestId('seasons-list');
    await waitFor(() => surveyList);

    expect(surveyList.querySelectorAll('li.driverStandingsItemWrap')).toHaveLength(1);
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
  })

  test('Should render error on UnexpectedError', async () => {
    const getDriverStandings = new GetDriverStandingsSpy();
    const error = new UnexpectedError();

    jest.spyOn(getDriverStandings, 'getDriverStandings').mockRejectedValueOnce(error);
    makeSut(getDriverStandings);
    await waitFor(() => screen.getByRole('heading'));

    expect(screen.queryByTestId('seasons-list')).not.toBeInTheDocument()
    expect(screen.getByTestId('error')).toHaveTextContent(error.message)
  })

  test('Should call LoadSeasonList on reload', async () => {
    const getDriverStandings = new GetDriverStandingsSpy();

    jest.spyOn(getDriverStandings, 'getDriverStandings').mockRejectedValueOnce(new UnexpectedError());

    makeSut(getDriverStandings);
    await waitFor(() => screen.getByRole('heading'));

    fireEvent.click(screen.getByTestId('reload'));

    expect(getDriverStandings.callsCount).toBe(1);
    await waitFor(() => screen.getByRole('heading'));
  })
})