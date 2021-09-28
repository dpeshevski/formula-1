import axios from 'axios';

import { AxiosHttpClient } from '@/infra/http';
import { mockAxios, mockHttpResponse } from '@/tests/infra/mocks';

import { mockHttpRequest } from '@/tests/data/mocks';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient,
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();

  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockHttpRequest();
    const { sut, mockedAxios } = makeSut();

    await sut.request(request);

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      data: request.body,
      method: request.method,
      headers: request.headers,
    })
  })

  test('Should return correct response', async () => {
    const { sut, mockedAxios } = makeSut();

    const httpResponse = await sut.request(mockHttpRequest());
    const axiosResponse = await mockedAxios.request.mock.results[0].value;

    expect(httpResponse).toEqual({
      statusCode: axiosResponse.statusCode,
      body: axiosResponse.body,
    })
  })

  test('Should return correct error response', async () => {
    const { sut, mockedAxios } = makeSut();

    mockedAxios.request.mockRejectedValueOnce({
      response: mockHttpResponse()
    })

    const promise = await sut.request(mockHttpRequest());

    expect(promise).toEqual(mockedAxios.request.mock.results[0].value);
  })
})

