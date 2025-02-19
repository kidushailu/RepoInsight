import React from 'react';
import './acquisitions.js';

function Dashboard() {
    return (
        <div>
            <div style={{width: '800px'}}><canvas id="acquisitions"></canvas></div>

            <script type="module" src="/acquisitions.js" defer></script>
        </div>
    );
}

export default Dashboard;
