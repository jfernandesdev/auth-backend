import Link from 'next/link'
import { setupAPIClient } from '../services/api'
import { withSSRAuth } from '../utils/withSSRAuth'

export default function Metrics() {
  return (
    <>
      <div className='container'>
        <div>
          <Link href='/dashboard'>
            <button className='btnExit'>Voltar</button>
          </Link>

          <h1 className='hello'>Métrics</h1>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/me')

  return {
    props: {},
  }
}, {
  permissions: ['metrics.list'],
  roles: ['administrator']
})
