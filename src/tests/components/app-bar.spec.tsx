import { render, screen } from "@testing-library/react"
import { AppBar } from "../../shared/components"
import { ThemeProvider } from "../../shared/contexts"

const setup = () => {
  render(
    <ThemeProvider>
      <AppBar />
    </ThemeProvider>
  )
}

describe('<AppBar />', () => {
  it('list items', async () => {
    setup()
    const listItems = screen.getAllByRole('listitem')
    listItems.forEach(li => {
      expect(li.hasAttribute('href')).toBeFalsy()
    })
  })

  it('links', () => {
    setup()
    const links = screen.getAllByRole('link')
    links.forEach(a => {
      expect(a.hasAttribute('href')).toBeTruthy()
    })
  })
})
