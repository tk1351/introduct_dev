import React from 'react'
import { useSelector } from 'react-redux'

const Alert = () => {
  const alerts = useSelector((state: any) => state.alert.alert)
  const isAlert = alerts.map(
    (alert: { id: string; msg: string; alertType: string }) =>
      alert.alertType === 'danger' ? (
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
