import React, { FC, useEffect, Fragment } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { ProfileData } from '../profile-form/CreateProfile'
import { fetchPostsByUserId } from '../../features/postSlice'
import { RootState } from '../../app/store'
import PostItem from './PostItem'

type Props = {
  profile: ProfileData
}

const PostsPerProfile: FC<Props> = ({ profile }) => {
  const dispatch = useAppDispatch()

  const usersPosts = useAppSelector((state: RootState) => state.post.posts)

  useEffect(() => {
    dispatch(fetchPostsByUserId(profile.user._id))
  }, [profile])
  return (
    // 中央揃えする
    <div>
      {usersPosts.length > 0 ? (
        <Fragment>
          <h2 className="text-primary">{profile.user.name}さんの記事一覧</h2>
          <div className="posts">
            {usersPosts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <h2 className="text-primary">{profile.user.name}さんの記事一覧</h2>
          <p>投稿がありません</p>
        </Fragment>
      )}
    </div>
  )
}

export default PostsPerProfile
