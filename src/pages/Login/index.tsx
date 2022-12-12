import { Auth, Loader, Notification } from '../../shared/components'
import { TAuthService } from '../../shared/types'
import { useAuth } from '../../shared/hooks'

type Props = {
  login: TAuthService
}

export const Login: React.FC<Props> = ({ login }) => {
  const {
    loader, message,
    handleClose, handleSubmit 
  } = useAuth(login)

  return (
    <>
    <Auth
      title="Login"
      inputs={[
        {
          label: 'Email',
          name: 'email',
          type: 'email',
        },
        {
          label: 'Senha',
          name: 'password',
          type: 'password',
        }
      ]}
      buttonText="Acessar"
      link={{
        to: '/register',
        text: 'Não tem uma conta? Cadastre-se!'
      }}
      handleSubmit={handleSubmit}
    />
    <Loader open={loader} />
    <Notification message={message} handleClose={handleClose} />
    </>
  )
}
