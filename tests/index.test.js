import axios from 'axios';
import "@testing-library/jest-dom";
import {  render, screen } from "@testing-library/react";

import {apiBaseUrl} from '../utils/constants';
import Home from "../pages/index";
import {mockData} from './constants';

jest.mock('axios');

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }))
});

describe("Heading", () => {
  it("renders a calculator", () => { 
      render(<Home />);
      // check if all components are rendered
      expect(screen.getByTestId("heading")).toBeInTheDocument();
   
    });
  });
  describe("Get data",()=>{
      it('should fetch data', async () => {
        const resp = {data: mockData};
        axios.get.mockResolvedValue(resp);
      
        return axios.get(`${apiBaseUrl}converter/currenyCodes`).then(response =>{
          expect(response.data).toEqual(mockData)
      });
      
      });
  })

