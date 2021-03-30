import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { ProfileData } from '../profile-form/CreateProfile'

type Props = {
  profile: ProfileData
}

const ProfileItem: FC<Props> = ({ profile }) => {
  return (
    <div className="profile bg-light">
      <img src={profile.user.avatar} alt="" className="round-img" />
      <div>
        <h2>{profile.user.name}</h2>
        <p>{profile.company && <span>企業: {profile.company}</span>}</p>
        <p className="my-1">
          {profile.location && <span>{profile.location}</span>}
        </p>
        <Link to={`/profile/${profile._id}`} className="btn btn-primary">
          プロフィールを確認する
        </Link>
      </div>
    </div>
  )
}

export default ProfileItem
