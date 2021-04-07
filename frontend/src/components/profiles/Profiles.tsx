import React, { Fragment, useEffect } from 'react'
import Spinner from '../layout/Spinner'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { fetchAllProfile } from '../../features/profileSlice'
import ProfileItem from './ProfileItem'
import { removePostState } from '../../features/postSlice'

const Profiles = () => {
  const dispatch = useAppDispatch()
  const profiles = useAppSelector((state: RootState) => state.profile.profiles)
  const loading = useAppSelector((state: RootState) => state.profile.loading)
  useEffect(() => {
    dispatch(fetchAllProfile())
    dispatch(removePostState())
  }, [])
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">プロフィール</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i>登録者と繋がろう
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>登録者はいません</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Profiles
