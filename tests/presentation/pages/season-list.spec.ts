import { createMemoryHistory, MemoryHistory } from 'history';
import { screen, waitFor, fireEvent, cleanup } from '@testing-library/react';

import { SeasonList } from '@/presentation/pages';
import { UnexpectedError } from '@/domain/errors';

import { GetDriverStandingsSpy } from '@/tests/domain/mocks';
import { renderWithHistory } from '@/tests/presentation/mocks'

type SutTypes = {
  getDriverStandingsSpy: GetDriverStandingsSpy,
  history: MemoryHistory,
  setMock: (mock: any) => void
}

const makeSut = (getDriverStandingsSpy = new GetDriverStandingsSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/', '/seasons'] })
  
  const { setMock } = renderWithHistory({
    history,
    Page: () => SeasonList({ loadSeasonList: getDriverStandingsSpy })
  })

  return {
    getDriverStandingsSpy,
    history,
    setMock
  }
}

describe('SeasonList Component', () => {
  afterEach(cleanup)
  test('Should call LoadSeasonList', async () => {
    const { getDriverStandingsSpy } = makeSut();

    expect(getDriverStandingsSpy.callsCount).toBe(1);
    await waitFor(() => screen.getByRole('heading'))
  })

  test('Should render SeasonItem on success', async () => {
    makeSut();
    const sesonsList = screen.getByTestId('seasons-list');
    await waitFor(() => sesonsList);
    
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()

    const driverFullName = screen.getByTestId('driver-full-name');
    await waitFor(() => driverFullName);

    const season = screen.getByTestId('year');
    await waitFor(() => season);

    expect(driverFullName).toHaveTextContent('Lewis Hamilton');
    expect(season).toHaveTextContent('2015');
    expect(sesonsList.querySelectorAll('li.driverStandingsItemWrap')).toHaveLength(1);
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
  })

  test('Should render error on UnexpectedError', async () => {
    const getDriverStandings = new GetDriverStandingsSpy();
    const error = new UnexpectedError();

    jest.spyOn(getDriverStandings, 'getDriverStandings').mockRejectedValueOnce(error);
    makeSut(getDriverStandings);
    await waitFor(() => screen.getByTestId('seasons-list'))

    expect(screen.getByTestId('error')).toHaveTextContent(error.message)
  })

  test('Should call LoadSeasonList on reload', async () => {
    const getDriverStandingsSpy = new GetDriverStandingsSpy();

    jest.spyOn(getDriverStandingsSpy, 'getDriverStandings').mockRejectedValueOnce(new UnexpectedError());
    makeSut(getDriverStandingsSpy);
    await waitFor(() => screen.getByTestId('seasons-list'))

    fireEvent.click(screen.getByTestId('reload'))
    expect(getDriverStandingsSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByTestId('seasons-list'))
    await waitFor(() => screen.getByRole('heading'))
  })
})