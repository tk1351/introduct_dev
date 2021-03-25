import React, { useEffect } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { fetchCurrentProfile } from '../../features/profileSlice'
import { unwrapResult } from '@reduxjs/toolkit'

const Dashboard = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const resultAction = dispatch(fetchCurrentProfile())
    unwrapResult(resultAction as any)
  }, [])
  return <div>Dashboard</div>
}

export default Dashboard
