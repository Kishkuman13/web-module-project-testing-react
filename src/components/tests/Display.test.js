import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Display from '../Display'
import mockFetchShow from '../../api/fetchShow'
import {testShow} from './Show.test'

jest.mock('../../api/fetchShow')

test('Test that the Display component renders without any passed in props', () => {
  render(<Display />)
})

test('Test that when the fetch button is pressed, the show component will display', async () => {
  mockFetchShow.mockResolvedValueOnce(testShow)
  render(<Display />)
  const btn = screen.getByRole('button', { name: /Press to Get Show Data/i})
  userEvent.click(btn)
  await waitFor(()=>{})
  const getData = screen.getByTestId('show-container')
  expect(getData).toBeInTheDocument()
})

test('Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data', async () => {
  mockFetchShow.mockResolvedValueOnce(testShow)
  render(<Display />)
  const btn = screen.getByRole('button')
  userEvent.click(btn)
  await waitFor(()=>{})
  const seasonOptions = screen.getAllByTestId('season-option')
  expect(seasonOptions).toHaveLength(2)
})

test('Test that when the fetch button is pressed, this function is called', async () => {
  const mockDisplayFunc = jest.fn()
  mockFetchShow.mockResolvedValueOnce(mockDisplayFunc)
  render(<Display />)
  const btn = screen.getByRole('button')
  userEvent.click(btn)
  await waitFor(()=>{})
  expect(mockDisplayFunc).toHaveBeenCalled()
})





///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.