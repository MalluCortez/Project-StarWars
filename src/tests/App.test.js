import React from 'react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import mockFetch from '../../cypress/mocks/fetch';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import Table from '../components/Table';


describe('testando a aplicação', () => {
  afterEach(() => jest.clearAllMocks());
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = mockFetch;
  });

  test('Verifica se todos os componentes estão seno renderizados na tela', async () => {

    render(<Table />)

    const tablePlanets = await screen.getByRole('table');
    expect(tablePlanets).toBeInTheDocument();

    const inputText = await screen.findByTestId('name-filter')
    expect(inputText).toBeInTheDocument();

    const selectColumn = await screen.findByTestId('column-filter')
    expect(selectColumn).toBeInTheDocument();

    const selectComparison = await screen.findByTestId('comparison-filter')
    expect(selectComparison).toBeInTheDocument();

    const inputValue = await screen.findByTestId('value-filter')
    expect(inputValue).toBeInTheDocument();

    const btnFil = await screen.getByRole('button', {
      name: /filtrar/i,
    });
    expect(btnFil).toBeInTheDocument()
  })
})