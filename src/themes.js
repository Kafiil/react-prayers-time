import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

`;

export const dark = {
  header: {
    container: 'text-blue-100 bg-blue-900',
  },
  spinner: {
    border: 'white',
  },
  footer: {
    container: 'text-blue-100 bg-blue-900',
  },
  defaultLayout: {
    container: 'text-white bg-black',
  },
  main: {
    container: 'bg-gray-900',
  },
  daily: {
    difference: 'text-red-600',
  },
};

export const light = {
  header: {
    container: 'bg-gray-300',
  },
  spinner: {
    border: 'black',
  },
  footer: {
    container: 'bg-gray-300',
  },
  defaultLayout: {
    container: 'text-black bg-white',
  },
  main: {
    container: 'bg-red-100',
  },
  daily: {
    difference: 'text-red-500',
  },
};
