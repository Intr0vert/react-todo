import React from 'react'
import './preloader.css'
import { CircularProgress } from '@material-ui/core'

const Preloader: React.FC = () => {
  return (
    <div className="todo--preloader">
      <CircularProgress />
    </div>
  )
}

export default Preloader
