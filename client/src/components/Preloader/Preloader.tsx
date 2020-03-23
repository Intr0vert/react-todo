import React from 'react';
import './preloader.css';

const Preloader: React.FC = () => {
    return <div className="todo--preloader">
        <div className="todo--spinner">
            <div className="todo--preloader-bounce1"></div>
            <div className="todo--preloader-bounce2"></div>
        </div>
    </div>
}

export default Preloader;