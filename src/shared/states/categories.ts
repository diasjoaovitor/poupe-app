import {
  AccountBalance,
  AttachMoney,
  BeachAccess,
  DriveEta,
  FitnessCenter,
  LinearScale,
  LocalAirport,
  LocalAtm,
  LocalHospital,
  OndemandVideo,
  Redeem,
  School,
  Score,
  Shop,
  ShoppingCart,
  TrendingUp
} from '@mui/icons-material'

export const expenseCategories = [
  {
    name: 'Aposta',
    icon: Score
  },
  {
    name: 'Assinaturas',
    icon: OndemandVideo
  },
  {
    name: 'Compras',
    icon: Shop
  },
  {
    name: 'Educação',
    icon: School
  },
  {
    name: 'Esporte',
    icon: FitnessCenter
  },
  {
    name: 'Investimentos',
    icon: TrendingUp
  },
  {
    name: 'Lazer',
    icon: BeachAccess
  },
  {
    name: 'Mercado',
    icon: ShoppingCart
  },
  {
    name: 'Saúde',
    icon: LocalHospital
  },
  {
    name: 'Transporte',
    icon: DriveEta
  },
  {
    name: 'Viagem',
    icon: LocalAirport
  },
  {
    name: 'Outros',
    icon: LinearScale
  }
]

export const incomeCategories = [
  {
    name: 'Bônus',
    icon: AttachMoney
  },
  {
    name: 'Comissão',
    icon: AccountBalance
  },
  {
    name: 'Ivestimentos',
    icon: TrendingUp
  },
  {
    name: 'Presente',
    icon: Redeem
  },
  {
    name: 'Salário',
    icon: LocalAtm
  },
  {
    name: 'Outros',
    icon: LinearScale
  }
]
