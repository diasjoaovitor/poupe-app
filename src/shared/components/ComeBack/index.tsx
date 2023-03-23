import { Link } from 'react-router-dom'
import { ArrowBack } from '@mui/icons-material'
import { TMUIColor } from '../../types'

type Props = {
  color: TMUIColor
}

export const ComeBack: React.FC<Props> = ({ color }) => (
  <Link to="/">
    <ArrowBack color={color} fontSize="large" />
  </Link>
)
