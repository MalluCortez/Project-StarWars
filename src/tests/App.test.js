import React from 'react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import mockFetch from '../../cypress/mocks/fetch';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import Table from '../components/Table';
import AppProvider from '../Context/AppProvider';

const renderWithContext = (ui) => {
  return {
    ...render(<AppProvider>{ ui }</AppProvider>),
  };
};

describe('testando a aplicação', () => {
  afterEach(() => jest.clearAllMocks());
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = mockFetch;
  });

  test('Verifica se todos os componentes estão seno renderizados na tela', async () => {

    renderWithContext(<App />)

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
  test('Verifica se o filtro de texto funcionam da forma esperada', async () => {
    renderWithContext(<App />)
    const inputText = await screen.findByTestId('name-filter')
    userEvent.type(inputText, 'aa')
  })
  test('Verifica se os filtros de numeros funcionam da forma esperada', async () => {
    renderWithContext(<App />)
    const selectColumn = await screen.findByTestId('column-filter')
    const selectComparison = await screen.findByTestId('comparison-filter')
    const inputValue = await screen.findByTestId('value-filter')
    const btnFil = await screen.getByRole('button', {
      name: /filtrar/i,
    });


    userEvent.selectOptions(selectColumn, 'population')
    userEvent.selectOptions(selectComparison, 'menor que')
    userEvent.type(inputValue, '900')
    userEvent.click(btnFil)
    const filtered = await screen.findByTestId('filter');
    userEvent.click(filtered.children[1])
    userEvent.selectOptions(selectColumn, 'diameter')
    userEvent.selectOptions(selectComparison, 'maior que')
    userEvent.type(inputValue, '3000')
    userEvent.click(btnFil)
    const filtered1 = await screen.findByTestId('filter');
    userEvent.click(filtered1.children[1])
    userEvent.selectOptions(selectColumn, 'orbital_period')
    userEvent.selectOptions(selectComparison, 'igual a')
    userEvent.type(inputValue, '7500')
    userEvent.click(btnFil)
    const filtered2 = await screen.findByTestId('filter');
    userEvent.click(filtered2.children[1])
  })
})