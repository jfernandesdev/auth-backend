import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { api } from '../services/api'
import { signOut } from '../contexts/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()

  useEffect(() => {
    api
      .get('/me')
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className='container'>
      <div>
        <h1 className='hello'>
          <span>Hello</span> World!
        </h1>
        <p>{user?.email}</p>
        <button className='btnExit' onClick={signOut}>
          Sair
        </button>
      </div>
    </div>
  )
}
