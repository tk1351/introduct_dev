import React, { useState, Fragment } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { createProfile } from '../../features/profileSlice'
import { setAlert, removeAlert } from '../../features/alertSlice'
import { v4 as uuidv4 } from 'uuid'
import Alert, { ErrorAlert } from '../layout/Alert'
import { unwrapResult } from '@reduxjs/toolkit'
import { RouteComponentProps, Link } from 'react-router-dom'
import { UserData } from '../../features/authSlice'

export interface ProfileData {
  _id: string
  company: string
  website: string
  location: string
  bio: string
  twitter: string
  facebook: string
  linkedin: string
  youtube: string
  instagram: string
  user: UserData
}

interface Props extends RouteComponentProps {}

const CreateProfile = ({ history }: Props) => {
  const dispatch = useAppDispatch()

  const [formData, setFormData] = useState<ProfileData>({
    _id: '',
    company: '',
    website: '',
    location: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    user: {
      _id: '',
      name: '',
      avatar: '',
      email: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })
  const [displaySocialInputs, toggleSocialInputs] = useState<boolean>(false)

  const {
    company,
    website,
    location,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData

  const onChange = (e: { target: { name: string; value: string } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const profileData: ProfileData = formData
    const resultAction = await dispatch(createProfile(profileData))

    if (createProfile.fulfilled.match(resultAction)) {
      unwrapResult(resultAction)
      history.push('/dashboard')
      const id = uuidv4()
      dispatch(
        setAlert({
          id,
          msg: 'プロフィールが設定できました',
          alertType: 'success',
        })
      )
      setTimeout(() => dispatch(removeAlert({ id })), 3000)
    } else if (createProfile.rejected.match(resultAction)) {
      // FIXME: payloadがunknown型のため
      const payload = resultAction.payload as any
      payload.errors.map((error: ErrorAlert) => {
        const id = uuidv4()
        dispatch(setAlert({ id, msg: error.msg, alertType: 'danger' }))
        setTimeout(() => dispatch(removeAlert({ id })), 5000)
      })
    }
  }
  return (
    <Fragment>
      <Alert />
      <h1 className="large text-primary">プロフィール設定</h1>
      <p className="lead">
        <i className="fas fa-user"></i> 詳細を設定してください
      </p>
      <small>* = 必要事項</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="会社名"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Webサイト"
            name="website"
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="住所"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="* 自己紹介"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            SNSのリンクを追加する
          </button>
          <span>オプション</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          戻る
        </Link>
      </form>
    </Fragment>
  )
}

export default CreateProfile
