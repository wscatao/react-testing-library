import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

describe('Testando a aplicação, testando input', () => {
  const { getByLabelText, getByText } = render(<App />)
  const inputTask = getByLabelText('Tarefa:');
  const labelTask = getByText('Tarefa:');

  test('Verificando se o label e o input existem no documento', () => {
    expect(labelTask).toBeInTheDocument();
    expect(inputTask).toBeInTheDocument();
  });
    
  test('Verificando o tipo do input', () => {
    expect(inputTask.type).toBe('text');
  });
});

describe('Testando botão na página inicial e sua funcionalidade', () => {
  test('Verificando se existe um botão para adicionar a tarefa', () => {
    const { getByRole } = render(<App />);
    const btnAdicionar = getByRole('button');

    expect(btnAdicionar).toBeInTheDocument();
    expect(btnAdicionar.value).toBe('Adicionar');
  });
  
  test('Verificando se ao clicar no botão a tarefa é adicionada', () => {
    const { getByRole, getByLabelText, getByText } = render(<App />);
    const inputTask = getByLabelText('Tarefa:');
    const btnAdicionar = getByRole('button');
    const tarefa = 'Aqui vai uma tarefa';

    fireEvent.change(inputTask, { target: { value: tarefa } });
    fireEvent.click(btnAdicionar);

    expect(getByText(tarefa)).toBeInTheDocument();
    expect(getByText(tarefa).textContent).toBe('Aqui vai uma tarefa');
  });
});

describe('Testando uma lista de tarefas', () => {
    test('Ao passar a lista é esperado que todos as tarefas estejam no DOM', () => {
    const { getByRole, getByLabelText, getByText } = render(<App />);
    const inputTask = getByLabelText('Tarefa:');
    const btnAdd = getByRole('button');
    const listTodo = ['Realizar CR', 'Ler Post no Medium', 'Beber água'];
    
    listTodo.forEach((todo) => {
      fireEvent.change(inputTask, { target: { value: todo } });
      fireEvent.click(btnAdd);
    });

    listTodo.forEach((todo) => {
      expect(getByText(todo)).toBeInTheDocument();
      expect(getByText(todo).textContent).toBe(todo);
    });
  });
});