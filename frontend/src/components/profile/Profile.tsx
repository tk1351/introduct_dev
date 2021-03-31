import React, { Fragment, useEffect, FC } from 'react'
import Spinner from '../layout/Spinner'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import { Link } from 'react-router-dom'
import { RootState } from '../../app/store'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchProfileByUid } from '../../features/profileSlice'
import { RouteComponentProps } from 'react-router-dom'

type PageProps = {} & RouteComponentProps<{ id: string }>

const Profile: FC<PageProps> = ({ match }) => {
  const { id } = match.params
  const dispatch = useAppDispatch()
  const profile = useAppSelector((state: RootState) => state.profile.profile)
  const loading = useAppSelector((state: RootState) => state.profile.loading)
  const auth = useAppSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(fetchProfileByUid(id))
  }, [])
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            戻る
          </Link>
          {auth.auth.isAuthenticated &&
            auth.auth.loading === false &&
            auth.auth.user?._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-datk">
                プロフィールを編集する
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Profile
