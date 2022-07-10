import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { signOut, user } = useAuth();

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