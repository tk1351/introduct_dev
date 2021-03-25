import React, { useEffect, Fragment } from 'react'
import Spinner from '../layout/Spinner'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchCurrentProfile } from '../../features/profileSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const dispatch = useAppDispatch()
  const authUser: any = useAppSelector((state) => state.auth.auth.user)
  const profile = useAppSelector((state) => state.profile.profile)
  const loading = useAppSelector((state) => state.profile.loading)
  useEffect(() => {
    const resultAction = dispatch(fetchCurrentProfile())
    unwrapResult(resultAction as any)
  }, [])
  return (
    <>
      {profile && loading === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">
            <i className="fas fa-user">
              {' '}
              ようこそ {authUser && authUser.name} さん
            </i>
          </p>
          {profile !== null ? (
            <Fragment>has</Fragment>
          ) : (
            <Fragment>
              <p>プロフィールが設定されていません。設定してください。</p>
              <Link to="/create-profile" className="btn btn-primary my-1">
                プロフィールを設定する
              </Link>
            </Fragment>
          )}
        </Fragment>
      )}
    </>
  )
}

export default Dashboard
