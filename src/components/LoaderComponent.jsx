import React from 'react'
import { SpinnerInfinity } from 'spinners-react';
const LoaderComponent = ({show}) => {
  return show &&(
    <div className=' text-center flex justify-center absolute z-50 items-center p-4 loader'>
       <div className="loaderContent flex justify-center items-center flex-col">
       <SpinnerInfinity className='' size={100}/>
       <p><small>loading...</small></p>
       </div>
    </div>
  )
}

export default LoaderComponent
