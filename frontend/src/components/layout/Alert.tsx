import React from 'react'
import { useSelector } from 'react-redux'

const Alert = () => {
  const alert = useSelector((state: any) => state.alert.alert).slice(-1)[0]
  const isAlert =
    alert.alertType === 'danger' ? (
      <>
        <div className={`alert alert-${alert.alertType}`}>{alert.msg}</div>
      </>
    ) : (
      <></>
    )
  return <>{isAlert}</>
}

export default Alert
