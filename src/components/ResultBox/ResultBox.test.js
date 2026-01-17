import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const testCasesPLN = [
  { amount: '200', expected: 'PLN 200.00 = $57.14' },
  { amount: '300', expected: 'PLN 300.00 = $85.71' },
  { amount: '400', expected: 'PLN 400.00 = $114.29' },
  { amount: '500', expected: 'PLN 500.00 = $142.86' },
];

const testCasesUSD = [
  { amount: '100', expected: '$100.00 = PLN 350.00' },
  { amount: '200', expected: '$200.00 = PLN 700.00' },
  { amount: '300', expected: '$300.00 = PLN 1,050.00' },
  { amount: '400', expected: '$400.00 = PLN 1,400.00' },
];

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from='PLN' to='USD' amount={100} />);
  });
  it('should render proper info about conversion when PLN -> USD', () => {
    for (const testObjPLN of testCasesPLN) {
      //render component
      render(
        <ResultBox from='PLN' to='USD' amount={parseInt(testObjPLN.amount)} />,
      );

      //find result div element
      const output = screen.getByTestId('output');

      //check if the result div gives a proper output
      expect(output).toHaveTextContent(testObjPLN.expected);

      // unmount component
      cleanup();
    }
  });
  it('should render proper info about conversion when USD -> PLN', () => {
    for (const testObjUSD of testCasesUSD) {
      //render component
      render(
        <ResultBox from='USD' to='PLN' amount={parseInt(testObjUSD.amount)} />,
      );

      //find result div element
      const output = screen.getByTestId('output');

      //check if the result div gives a proper output
      expect(output).toHaveTextContent(testObjUSD.expected);

      // unmount component
      cleanup();
    }
  });
  it('should render proper info about conversion when the currency is the same', () => {
    //render component
    render(<ResultBox from='USD' to='USD' amount={100} />);

    //find result div element
    const output = screen.getByTestId('output');

    //check if the result div gives a proper output
    expect(output).toHaveTextContent('$100.00 = $100.00');
  });
  it('should render "Wrong value" if the value is lower than zero', () => {
    //render component
    render(<ResultBox from='PLN' to='USD' amount={-100} />);

    //find result div element
    const output = screen.getByTestId('output');

    //check if the result div gives a proper output
    expect(output).toHaveTextContent('Wrong value...');
  });
});
