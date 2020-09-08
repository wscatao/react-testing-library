import React from 'react';
import Item from '../Item';
import { render } from '@testing-library/react';

const listTodo = ['Realizar CR', 'Ler Post no Medium', 'Beber água'];

describe('Testes do componente Item isolado', () => {
  test('Ao passar a tarefa é esperado que essa tarefa esteja no DOM', () => {
    listTodo.forEach((todo) => {
      const { getByText } = render(<Item content={todo} />);
      expect(getByText(todo)).toBeInTheDocument();
      expect(getByText(todo).textContent).toBe(todo);
    });
  });
});