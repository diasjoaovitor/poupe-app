import { fireEvent, render, screen } from "@testing-library/react"
import { AppBar } from "../../shared/components"
import { ThemeProvider } from "../../shared/contexts"

const setup = (handleLogout: () => void) => {
  render(
    <ThemeProvider>
      <AppBar handleLogout={handleLogout} />
    </ThemeProvider>
  )
}

describe('<AppBar />', () => {
  it('list items', () => {
    setup(jest.fn())
    const listItems = screen.getAllByRole('listitem')
    listItems.forEach(li => {
      expect(li.hasAttribute('href')).toBeFalsy()
    })
  })

  it('links', () => {
    setup(jest.fn())
    const links = screen.getAllByRole('link')
    links.forEach(a => {
      expect(a.hasAttribute('href')).toBeTruthy()
    })
  })

  it('logout', () => {
    const handleLogout = jest.fn()
    setup(handleLogout)
    const logout = screen.getByText('Logout')
    fireEvent.click(logout)
    expect(handleLogout).toBeCalled()
  })
})
