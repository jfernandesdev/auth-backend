import { useEffect } from 'react'
import Link from 'next/link'

import { useAuth } from '../hooks/useAuth'

import { api } from '../services/apiClient'
import { setupAPIClient } from '../services/api'
import { withSSRAuth } from '../utils/withSSRAuth'

import { Can } from '../components/Can'

export default function Dashboard() {
  const { user, signOut } = useAuth()

  useEffect(() => {
    api
      .get('/me')
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className='container'>
      <div>
        <button className='btnExit' onClick={() => signOut(true)}>Sair</button>

        <h1 className='hello'><span>Hello</span> World!</h1>
        <p>{user?.email}</p>

        <Can permissions={['metrics.list']}>
          <Link href='/metrics'><button>Métricas 📊</button></Link>
        </Can>
      </div>
    </div>
  )
}

export const getServerSideProps = withSSRAuth( async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/me')
  console.log(response.data)

  return {
    props: {}
  }
})
