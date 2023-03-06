import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Recurrence } from '.'
import { TRecurrence } from '../../types'

const setup = (recurrence: TRecurrence | undefined) => {
  const { container } = render(<Recurrence color="error" recurrence={recurrence} />)
  return container
}

const getInputs = (container: HTMLElement) => {
  const button = screen.getByRole('button')
  fireEvent.click(button)
  const inputs = Array.from(container.querySelectorAll('input'))
  return inputs
}

describe('<Recurrence />', () => {
  it('Default state', () => {
    const container = setup(undefined)
    const [ quantityInput, frequencyInput ] = getInputs(container)
    const result = {
      quantity: quantityInput.value,
      frequency: frequencyInput.value,
      disabled: quantityInput.disabled
    }
    const expected = {
      quantity: '1',
      frequency: 'Não Repetir',
      disabled: true
    }
    expect(result).toEqual(expected)
  }) 

  it('Change state', () => {
    const container = setup(undefined)
    const frequencyInput = getInputs(container)[1]
    const [ selectButton ] = Array.from(screen.getAllByRole('button'))
    fireEvent.mouseDown(selectButton)
    const listBox = within(screen.getByRole('listbox'))
    const monthlyOption = listBox.getAllByRole('option')[2]
    fireEvent.click(monthlyOption)
    const quantityInput = screen.getByLabelText('Quantidade') as HTMLInputElement
    userEvent.clear(quantityInput)
    userEvent.type(quantityInput, '3')
    const result = {
      quantity: quantityInput.value,
      frequency: frequencyInput.value,
      disabled: quantityInput.disabled
    }
    const expected = {
      quantity: '3',
      frequency: 'MONTHLY',
      disabled: false
    }
    expect(result).toEqual(expected)
  }) 
})
