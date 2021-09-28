import { createMemoryHistory, MemoryHistory } from 'history';
import { screen, waitFor, fireEvent } from '@testing-library/react';

import { SeasonList } from '@/presentation/pages';
import { UnexpectedError } from '@/domain/errors';

import { GetDriverStandingsSpy } from '@/tests/domain/mocks';
import { renderWithHistory } from '@/tests/presentation/mocks'

type SutTypes = {
  getDriverStandingsSpy: GetDriverStandingsSpy,
  history: MemoryHistory
}

const makeSut = (getDriverStandingsSpy = new GetDriverStandingsSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/seasons'] });

  return {
    getDriverStandingsSpy,
    history
  }
}

describe('SeasonList Component', () => {
  test('Should call GetDriverStandings', async () => {
    const { getDriverStandingsSpy } = makeSut();

    expect(getDriverStandingsSpy.callsCount).toBe(1);
    await waitFor(() => screen.getByRole('heading'));
  })

  test('Should render SeasonItem on success', async () => {
    makeSut();

    const seasonList = screen.getByTestId('season-list');
    await waitFor(() => seasonList);

    expect(seasonList.querySelectorAll('li.season-item')).toHaveLength(11);
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })
})