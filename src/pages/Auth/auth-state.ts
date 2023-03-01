import { login, register } from "../../shared/firebase"

export const loginState = {
  title: 'Login',
  inputs: [
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
  ],
  button: 'Acessar',
  link: 'Não tem uma conta? Cadastre-se!',
  auth: login
}

export const registerState = {
  title: 'Criar Conta',
  inputs: [
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
  ],
  button: 'Cadastrar',
  link: 'Já tenho uma conta',
  auth: register
}
