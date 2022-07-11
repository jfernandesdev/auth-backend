import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { signOut } from '../contexts/AuthContext'

interface AxiosErrorResponse {
  code?: string
}

let cookies = parseCookies()
let isRefreshing = false
let failedRequestsQueue = []

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${cookies['appnextauth@token']}`,
  },
})

//primeiro parâmetro: o que fazer se a resposta do backend for sucesso?
//Fazer nada apenas retorna a resposta do backend
//segundo parâmetro: o que fazer se a resposta do backend der um erro?
//Pausar todas as requisições (fila), verificar o tipo do erro e atualização o token (refresh token)
api.interceptors.response.use(
  response => {
    return response
  },
  (error: AxiosError<AxiosErrorResponse>) => {
    if (error.response.status === 401) {
      if (error.response.data?.code === 'token.expired') {
        //renovar o token
        cookies = parseCookies()
        const { 'appnextauth@refreshToken': refreshToken } = cookies
        const originalConfig = error.config

        if (!isRefreshing) {
          isRefreshing = true

          api
            .post('/refresh', {
              refreshToken,
            })
            .then(response => {
              const { token } = response.data

              setCookie(undefined, 'appnextauth@token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
              })

              setCookie(
                undefined,
                'appnextauth@refreshToken',
                response.data.refreshToken,
                {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: '/',
                }
              )

              api.defaults.headers['Authorization'] = `Bearer ${token}`

              failedRequestsQueue.forEach(request => request.onSuccess(token))
              failedRequestsQueue = []
            })
            .catch(err => {
              failedRequestsQueue.forEach(request => request.onFailure(err))
              failedRequestsQueue = []
            })
            .finally(() => {
              isRefreshing = false
            })
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers['Authorization'] = `Bearer ${token}`

              resolve(api(originalConfig))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            },
          })
        })
      } else {
        //deslogar o usuário
        signOut()
      }
    }

    return Promise.reject(error)
  }
)
