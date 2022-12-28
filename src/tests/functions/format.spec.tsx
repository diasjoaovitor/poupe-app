import { formatCurrency } from "../../shared/functions"

describe('FormatCurrency', () => {
  it('1 in Brazilian Real', () => {
    expect(formatCurrency(1)).toBe('R\$\u{00A0}1,00')
  })

  it('-1 in Brazilian Real', () => {
    expect(formatCurrency(-1)).toBe('-R\$\u{00A0}1,00')
  })

  it('Format to two decimal places', () => {
    expect(formatCurrency(1.00000)).toBe('R\$\u{00A0}1,00')
  })

  it('Math ceil', () => {
    expect(formatCurrency(100.539)).toBe('R\$\u{00A0}100,54')
    expect(formatCurrency(100.535)).toBe('R\$\u{00A0}100,54')
    expect(formatCurrency(100.545)).toBe('R\$\u{00A0}100,55')
  })

  it('Math floor', () => {
    expect(formatCurrency(100.534)).toBe('R\$\u{00A0}100,53')
  })
})
