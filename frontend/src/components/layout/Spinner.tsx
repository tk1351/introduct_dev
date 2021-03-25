import React, { Fragment } from 'react'
import spinner from '../../../static/Spinner-1s-200px.gif'

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      />
    </Fragment>
  )
}

export default Spinner
