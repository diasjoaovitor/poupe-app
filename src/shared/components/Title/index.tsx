import { AttachMoney } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"
import { useThemeContext } from "../../contexts"
import * as S from './style'

type Props = {
  variant?: 'h6' | 'h5'
  iconFontSize?: 'large' | 'medium'
  color?: 'dark' | 'main'
} 

export const Title: React.FC<Props> = ({ variant, iconFontSize, color }) => {
  const { theme } = useThemeContext()

  const { main, dark } = theme.palette.primary
  const backgroundColor = color === 'dark' ? dark : main

  return (
    <Box className="Title" sx={S.title}>
      <Box className="svg-container" sx={{ ...S.icon, backgroundColor }}>
        <AttachMoney fontSize={iconFontSize} /> 
      </Box>
      <Typography component="h1" variant={variant}>
        Poupe App
      </Typography>
    </Box>
  )
}