import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';

export default function Dashboard() {
  const { signOut, user } = useAuth();

  useEffect(() => {
    api.get('/me').then(response => console.log(`Teste de requisição dentro do dashboard: ${response}`))
  }, [])

  return (
    <div className='container'>
      <div>
        <h1 className='hello'><span>Hello</span> World!</h1>
        <p>{user?.email}</p>
        <button className='btnExit' onClick={signOut}>Sair</button>
      </div>
    </div>
  );
}