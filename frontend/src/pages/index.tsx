import Head from 'next/head'
import { FormEvent, useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useContext(AuthContext)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const data = {
      email,
      password,
    }

    await signIn(data);
  }

  return (
    <>
      <Head>
        <title>Auth - Hello World</title>
      </Head>

      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className='form__group field'>
            <input
              type='email'
              className='form__field'
              name='email'
              id='email'
              placeholder='E-mail'
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
            />
            <label htmlFor='email' className='form__label'>
              E-mail
            </label>
          </div>

          <div className='form__group field'>
            <input
              type='password'
              name='password'
              id='password'
              className='form__field'
              placeholder='Senha'
              value={password}
              onChange={event => setPassword(event.target.value)}
              required
            />
            <label htmlFor='password' className='form__label'>
              Senha
            </label>
          </div>
          <button type='submit'>Entrar</button>
        </form>
      </div>
    </>
  )
}
