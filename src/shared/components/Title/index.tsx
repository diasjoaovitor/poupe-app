import { Box, Typography } from '@mui/material'
import { AttachMoney } from '@mui/icons-material'
import { Variant } from '@mui/material/styles/createTypography'
import * as S from './style'

type Props = {
  fontSize: 'small' | 'inherit' | 'medium' | 'large'
  variant: Variant
}

export const Title: React.FC<Props> = ({ fontSize, variant }) => (
  <Box className="Title" sx={S.Title}>
    <Box sx={S.Icon}>
      <AttachMoney fontSize={fontSize} />
    </Box>
    <Typography component="h2" variant={variant}>
      Poupe App
    </Typography>
  </Box>
)
