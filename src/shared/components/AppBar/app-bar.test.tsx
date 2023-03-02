import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { AppBar } from '.'

const setup = (md: boolean) => {
  const router = createMemoryRouter(
    [
      { path: '/app-bar', element: <AppBar page="App" md={md} /> },
      { path: '/login', element: <></> },
      { path: '/', element: <></> },
    ],
    {
      initialEntries: ['/app-bar']
    }
  )
  render(<RouterProvider router={router} />)
  return router
}

const getLinks = () => screen.queryAllByRole('link')

describe('<AppBar />', () => {
  it('Menu', () => {
    setup(false)
    expect(getLinks()).toHaveLength(0)
    const menu = screen.getByRole('menu')
    fireEvent.click(menu)
    expect(getLinks()).toHaveLength(4)
    fireEvent.click(menu)
    expect(getLinks()).toHaveLength(0)
    setup(true)
    expect(getLinks()).toHaveLength(4)
  }) 
  
  it('Navigate', () => {
    const router = setup(false)
    const menu = screen.getByRole('menu')
    fireEvent.click(menu)
    const dashboard = screen.getByText('Dashboard')
    fireEvent.click(dashboard)
    expect(router.state.location.pathname).toBe('/')
  })
})
