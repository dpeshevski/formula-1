import faker from 'faker';

import { HttpRequest } from '@/data/protocols/http'
import { HttpClientDecorator } from '@/main/decorators';

import { mockHttpRequest, HttpClientSpy } from '@/tests/data/mocks';

type SutTypes = {
  sut: HttpClientDecorator,
  httpClientSpy: HttpClientSpy,
}

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy();

  const sut = new HttpClientDecorator(httpClientSpy);

  return { 
    sut,
    httpClientSpy
  }
}

describe('HttpClientDecorator', () => {
  test('Should not add headers', async () => {
    const { sut, httpClientSpy } = makeSut();

    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['get', 'GET']),
      headers: {
        field: faker.random.words()
      }
    }

    await sut.request(httpRequest);

    expect(httpClientSpy.url).toBe(httpRequest.url);
    expect(httpClientSpy.method).toBe(httpRequest.method);
    expect(httpClientSpy.headers).toEqual(httpRequest.headers);
  })

  test('Should add headers to HttpClient', async () => {
    const { sut, httpClientSpy } = makeSut();

    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['get', 'GET'])
    }

    await sut.request(httpRequest);

    expect(httpClientSpy.url).toBe(httpRequest.url);
    expect(httpClientSpy.method).toBe(httpRequest.method);
    expect(httpClientSpy.headers).toEqual({
      'Content-Type': 'application/json'
    })
  })

  test('Should merge headers to HttpClientSpy', async () => {
    const { sut, httpClientSpy} = makeSut();
    const field = faker.random.words();

    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['get', 'GET']),
      headers: {
        field
      }
    }

    await sut.request(httpRequest);

    expect(httpClientSpy.url).toBe(httpRequest.url);
    expect(httpClientSpy.method).toBe(httpRequest.method);
    expect(httpClientSpy.headers).toEqual({
      field,
      'Content-Type': 'application/json'
    })
  })

  test('Should return the same result as HttpClient', async () => {
    const { sut, httpClientSpy} = makeSut();

    const httpResponse = await sut.request(mockHttpRequest());

    expect(httpResponse).toEqual(httpClientSpy.response);
  })
})