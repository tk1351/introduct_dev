import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'

export interface ErrorAlert {
  id: string
  msg: string
  alertType: string
}

const Alert = () => {
  const alerts = useAppSelector((state: RootState) => state.alert.alert)
  const isAlert = alerts.map((alert: ErrorAlert) =>
    alert.alertType ? (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ) : (
      // alertのkeyでエラーが出るため
      <div key={alert.id}></div>
    )
  )
  return <>{isAlert}</>
}

export default Alert
