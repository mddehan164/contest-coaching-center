import { useEffect } from 'react';
import Chart from 'chart.js/auto';

export default function StatisticsSection() {
  useEffect(() => {
    const ctx = document.getElementById('verticalBarChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January','February','March','April','May','June','July','August','September','October','November','December'],
        datasets: [{ label:'Revenue', data:[68.106,26.762,94.255,72.021,74.082,64.923,85.565,32.432,54.664,87.654,43.013,91.443], backgroundColor:'rgba(54,162,235,0.5)', borderColor:'rgb(54,162,235)' }]
      },
      options: {
        responsive:true,
        plugins: { legend:{ position:'top' }, title:{ display:true, text:'Last 12 Months' } }
      }
    });
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <h4 className="text-xl font-bold text-gray-900">Statistics</h4>
      {/* cards */}
      <div className="mt-4">
        <canvas id="verticalBarChart" height="400"></canvas>
      </div>
    </div>
  );
}
