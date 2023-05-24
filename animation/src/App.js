import React from 'react';
import Motion1 from './components/Motion1';
import { Motion2 } from './components/Motion2';

function App() {
    return (
        <>
            <div className="motion-box-wrap">
                <div className="motion-box">
                    <Motion1 />
                </div>
                <div className="motion-box">
                    <Motion2 />
                </div>
            </div>
        </>
    );
}

export default App;
