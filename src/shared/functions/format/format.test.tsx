import {
  formatCurrency,
  formatDate,
  formatPresentationOfTransactions,
  formatZero
} from '..'
import { TTransaction } from '../../types'

describe('Format zero', () => {
  it('Add zero before number less than zero', () => {
    expect(formatZero(3)).toBe('03')
    expect(formatZero(-35)).toBe(-35)
  })
})

describe('formatCurrency', () => {
  it('1 in Brazilian Real', () => {
    expect(formatCurrency(1)).toBe('R\$\u{00A0}1,00')
  })

  it('-1 in Brazilian Real', () => {
    expect(formatCurrency(-1)).toBe('-R\$\u{00A0}1,00')
  })

  it('Format to two decimal places', () => {
    expect(formatCurrency(1.0)).toBe('R\$\u{00A0}1,00')
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

describe('formatPresentationOfTransactions', () => {
  it('Presentation', () => {
    const a: TTransaction = {
      category: 'Outros',
      date: '2023/03/05',
      description: 'a',
      period: 'Março/2023',
      ref: 'ref',
      type: 'Despesa',
      value: 5
    }
    const b: TTransaction = {
      category: 'Mercado',
      date: '2023/03/05',
      description: 'b',
      period: 'Março/2023',
      ref: 'ref',
      type: 'Despesa',
      value: 6
    }
    const c: TTransaction = {
      category: 'Salario',
      date: '2023/03/06',
      description: 'c',
      period: 'Março/2023',
      ref: 'ref',
      type: 'Receita',
      value: 3
    }
    const transactions: TTransaction[] = [a, b, c]
    const expected = [
      {
        date: '05/mar',
        total: -11,
        transactions: [a, b]
      },
      {
        date: '06/mar',
        total: 3,
        transactions: [c]
      }
    ]
    const presentation = formatPresentationOfTransactions(transactions)
    expect(presentation).toEqual(expected)
  })
})

describe('formatDate', () => {
  it('Date to BR format', () => {
    const date = '2023/03/05'
    const expected = '05/03/2023'
    expect(formatDate(date)).toBe(expected)
  })
})
