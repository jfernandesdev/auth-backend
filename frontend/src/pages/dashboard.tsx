import { useEffect } from 'react'
import { signOut } from '../contexts/AuthContext'

import { useAuth } from '../hooks/useAuth'
import { useCan } from '../hooks/useCan'

import { api } from '../services/apiClient'
import { setupAPIClient } from '../services/api'

import { withSSRAuth } from '../utils/withSSRAuth'

export default function Dashboard() {
  const { user } = useAuth()

  const userCanSeeMetrics = useCan({
    roles: ['administrator']
  })

  useEffect(() => {
    api
      .get('/me')
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className='container'>
      <div>
        <button className='btnExit' onClick={signOut}>Sair</button>

        <h1 className='hello'><span>Hello</span> World!</h1>
        <p>{user?.email}</p>

        {userCanSeeMetrics && <div>Métricas 📊</div>}
       
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
