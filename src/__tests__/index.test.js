import {
  fireEvent,
  getByDisplayValue,
  getByPlaceholderText,
  getByText,
} from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import fs from 'fs';
import { JSDOM } from 'jsdom';
import path from 'path';

const current = process.cwd();
const html = fs.readFileSync(path.resolve(current, 'index.html'), 'utf8');

let dom;
let container;

beforeEach(() => {
  dom = new JSDOM(html, { runScripts: 'dangerously' });
  container = dom.window.document.body;
});

describe('index.html', () => {
  it('dom elements must be in document', () => {
    const containerWrapper = container.querySelector('.container');
    const tableHeadWrapper = container.querySelector('.table-head-wrapper');
    const tableBodyWrapper = container.querySelector('.table-body-wrapper');
    const form = container.querySelector('.form');

    expect(containerWrapper).toBeInTheDocument();
    expect(tableHeadWrapper).toBeInTheDocument();
    expect(tableBodyWrapper).toBeInTheDocument();
    expect(form).toBeInTheDocument();
  });

  it('if submit with empty inputs', () => {
    const input = getByText(container, 'Add book');
    fireEvent.submit(input);
    const tableRow = container.querySelector('.table-body-wrapper');

    expect(input).toBeInTheDocument();
    expect(tableRow.childNodes.length).toBe(0);
  });

  it('input values should be in document', () => {
    const input = getByText(container, 'Add book');
    const inputTitle = getByPlaceholderText(container, 'Tytuł książki');
    const inputAuthor = getByPlaceholderText(container, 'Autor książki');
    const inputPriority = getByPlaceholderText(container, 'Priorytet przeczytania');

    fireEvent.change(inputTitle, { target: { value: 'Book Title' } });
    fireEvent.change(inputAuthor, { target: { value: 'Book Author' } });
    fireEvent.change(inputPriority, { target: { value: 1 } });
    fireEvent.submit(input);
    const tableRow = container.querySelector('.table-body-wrapper');

    expect(getByDisplayValue(container, 'Book Title')).toBeInTheDocument();
    expect(getByDisplayValue(container, 'Book Author')).toBeInTheDocument();
    expect(getByDisplayValue(container, '1')).toBeInTheDocument();
  });
});
