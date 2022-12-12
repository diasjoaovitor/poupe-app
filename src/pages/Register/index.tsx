import { Auth, Loader, Notification } from '../../shared/components'
import { useAuth } from '../../shared/hooks'
import { TAuthService } from '../../shared/types'

type Props = {
  register: TAuthService
}

export const Register: React.FC<Props> = ({ register }) => {
  const {
    loader, message,
    handleClose, handleSubmit
  } = useAuth(register)

  return (
    <>
    <Auth
      title="Criar Conta"
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
        },
        {
          label: 'Repita sua senha',
          name: 'passwordConfirm',
          type: 'password',
        }
      ]}
      buttonText="Cadastrar"
      link={{
        to: '/login',
        text: 'Já tenho uma conta'
      }}
      handleSubmit={handleSubmit}
    />
    <Loader open={loader} />
    <Notification message={message} handleClose={handleClose} />
    </>
  )
}
