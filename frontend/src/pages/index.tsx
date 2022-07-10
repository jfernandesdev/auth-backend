import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Auth - Hello World</title>
      </Head>

      <div className='container'>
        <form>
          <div className='form__group field'>
            <input type='email' className='form__field' name='email' id='email' placeholder='E-mail'  required/>
            <label htmlFor="email" className='form__label'>E-mail</label>
          </div>

          <div className='form__group field'>
            <input type='password' name='password' id='password' className='form__field' placeholder='Senha' required />
            <label htmlFor="password" className='form__label'>Senha</label>
          </div>
          <button type='submit'>Entrar</button>
        </form>
      </div>
    </>
  )
}
