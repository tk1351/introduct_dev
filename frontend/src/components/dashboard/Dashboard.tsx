import React, { useEffect, Fragment } from 'react'
import Spinner from '../layout/Spinner'
import DashboardActions from './DashboardActions'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { fetchCurrentProfile, deleteProfile } from '../../features/profileSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { Link, RouteComponentProps } from 'react-router-dom'
import Alert from '../layout/Alert'
import { logout } from '../../features/authSlice'

interface Props extends RouteComponentProps {}

const Dashboard = ({ history }: Props) => {
  const dispatch = useAppDispatch()
  // FIXME: authUserのany
  const authUser: any = useAppSelector(
    (state: RootState) => state.auth.auth.user
  )
  const profile = useAppSelector((state: RootState) => state.profile.profile)
  const loading = useAppSelector((state: RootState) => state.profile.loading)
  useEffect(() => {
    const resultAction = dispatch(fetchCurrentProfile())
    unwrapResult(resultAction as any)
  }, [fetchCurrentProfile()])

  const deleteAccount = async () => {
    if (window.confirm('アカウントを削除してもよろしいですか？')) {
      const resultAction = await dispatch(deleteProfile())
      if (deleteProfile.fulfilled.match(resultAction)) {
        await dispatch(logout())
        history.push('/')
      }
    }
  }
  return (
    <>
      {profile && loading === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Alert />
          <h1 className="large text-primary">ダッシュボード</h1>
          <p className="lead">
            <i className="fas fa-user">
              {' '}
              ようこそ {authUser && authUser.name} さん
            </i>
          </p>
          {profile !== null ? (
            <Fragment>
              <DashboardActions />
              <div className="my-2">
                <button
                  className="btn btn-danger"
                  onClick={() => deleteAccount()}
                >
                  <i className="fas fa-user-minus"></i> アカウントの削除
                </button>
              </div>
            </Fragment>
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
