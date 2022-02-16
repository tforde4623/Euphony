import React from 'react';
import wompwomp from '../images/404EuphonyTransparent.svg';
import './errorpage.css'


const ErrorPage = () => {
    return (
        <div className='errorpage'>
            <img id='wompwompimg' alt='404' src={wompwomp}></img>
            <h1 id='words'>Try a different path or click Euphony.</h1>
        </div>
    )
}

export default ErrorPage
