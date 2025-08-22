import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logout, setCredentials } from '../auth/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken
    if (token) {
      // FIX: Added backticks for template literal
      headers.set('authorization', `Bearer ${token}`)
    }
    headers.set('accept', 'application/json')
    return headers
  }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 401) {
    // Try to refresh token
    const refreshResult = await baseQuery({
      url: '/auth/refresh',
      method: 'POST'
    }, api, extraOptions)

    if (refreshResult?.data) {
      // Store the new token
      api.dispatch(setCredentials(refreshResult.data))
      // Retry the original query with new token
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }

  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth', 'User'],
  endpoints: (builder) => ({})
})