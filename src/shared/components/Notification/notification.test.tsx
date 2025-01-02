import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Notification } from '.'

describe('<Notification />', () => {
  it('Close notification modal', async () => {
    const message = "I'm visible"
    render(<Notification message={message} />)
    const notificationMessage = screen.queryByText(message)
    expect(notificationMessage).toBeInTheDocument()
    const button = screen.getByRole('button')
    fireEvent.click(button)
    await waitFor(() => {
      expect(notificationMessage).not.toBeInTheDocument()
    })
  })
})
