import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Props, Transaction } from '.'
import { transaction } from '../../states'

const setup = (props: Props) => {
  render(<Transaction {...props} />)
}

const props: Props = {
  transaction,
  color: 'error',
  handleUpdate: jest.fn(),
  handleDelete: jest.fn()
}

describe('<Transaction />', () => {
  it('Closed transaction modal', () => {
    setup({ ...props, transaction: undefined })
    const component = screen.queryByTestId('transaction')
    expect(component).not.toBeInTheDocument()
  })

  it('Close opened transaction modal', async () => {
    setup(props)
    const component = screen.queryByTestId('transaction')
    expect(component).toBeInTheDocument()
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    await waitFor(() => {
      expect(component).not.toBeInTheDocument()
    })
  })

  it('Button actions', () => {
    setup(props)
    const buttons = screen.getAllByRole('button')
    const update = buttons[1]
    const del = buttons[2]
    fireEvent.click(update)
    expect(props.handleUpdate).toHaveBeenCalled()
    fireEvent.click(del)
    expect(props.handleDelete).toHaveBeenCalled()
  })
})
