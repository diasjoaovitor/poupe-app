import { SvgIconComponent } from '@mui/icons-material'
import { fireEvent, render, screen } from '@testing-library/react'
import { Category } from '..'
import { incomeCategories } from '../../states/categories'

type TCategories = {
  name: string
  icon: SvgIconComponent
}[]

const getDefaultSelected = (radiogroup: HTMLElement) =>
  radiogroup.querySelector('input:checked') as HTMLInputElement

const setup = (category: string, categories: TCategories) => {
  render(
    <Category
      category={category}
      categories={categories}
      color={{ hex: '#d32f2f', mui: 'error' }}
    />
  )
  const radiogroup = screen.getByRole('radiogroup')
  return radiogroup
}

describe('<Category />', () => {
  it('Default Category if not exists', () => {
    const radiogroup = setup('not exists category', incomeCategories)
    const defaultSelected = getDefaultSelected(radiogroup)

    expect(defaultSelected.value).toBe('Outros')
    expect(defaultSelected.parentElement).toHaveStyle('color: #d32f2f')
  })

  it('Select Category', () => {
    const radiogroup = setup('Outros', incomeCategories)
    const radioInputs = radiogroup.querySelectorAll('input[type=radio]')

    const radio = Array.from(radioInputs).find(
      (radio) => (radio as HTMLInputElement).value === 'Salário'
    ) as HTMLInputElement

    expect(radio.parentElement).not.toHaveStyle('color: #d32f2f')

    fireEvent.click(radio)
    expect(radio.parentElement).toHaveStyle('color: #d32f2f')
  })
})
