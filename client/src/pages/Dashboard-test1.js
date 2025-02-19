import React from 'react';

function Dashboard() {
    return (
        <div>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <script src="TestChart.js"></script>

            <h1>Dashboard</h1>
            <p>This is the Dashboard page.</p>

            <div>
            <canvas id="myChart"></canvas>
            </div>
        </div>
    );
}

export default Dashboard;
