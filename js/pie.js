// Chart
const chartData = {
    labels: [
        'Lorem Ipsum',
        'Lorem Ipsum',
        'Lorem Ipsum',
        'Lorem Ipsum',
        'Lorem Ipsum',
        'Lorem Ipsum',
    ],
    data: [5, 7, 9, 20, 30, 15],
    color: ['#C0CBFF', '#889EFF', '#5474FF', '#F154FF', '#00CEC0', '#FFFFFF'],
    class: [
        'tooltips-1', 'tooltips-2', 'tooltips-3', 
        'tooltips-4', 'tooltips-5', 'tooltips-6'
    ]
};
const ctx = document.getElementById('pie-chart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Data',
                data: chartData.data,
                backgroundColor: chartData.color,
                hoverOffset: 4,
                fill: 'start',
            }
        ],
    },
    options: {
        borderWidth: 6,
        borderColor: "#ccc",
        legend: {
          display: false
        },
        tooltips: {
            enabled: false,
        },
        rotation: 30,
        responsive: true,
        aspectRatio: 1,
        elements: {
            arc: {
                borderWidth: 0
            }
        },
        layout: {
            padding: { bottom: 10 }
        },
        onClick: (evt) => {
            var elements = myChart.getElementsAtEvent(evt);
            if(typeof elements[0] !== 'undefined') {
                var index = elements[0]._index
                var v = chartData.data[index];
                var l = chartData.labels[index];
                var c = chartData.class[index];
                var cl = chartData.color[index];
                $('#pie-chart-tooltips').html(`<div class="tooltips-chart ${c}">
                    <span>${l}</span>
                    <div>${v}%</div>
                </div>
                <div class="tooltips-chart-line">
                    <label style="position: absolute; top: ${evt.offsetY}px; left: ${evt.offsetX}px; background: ${cl}; z-index: 4;"></label>
                    <span style="position: absolute; top: ${evt.offsetY - 7}px; left: ${evt.offsetX - 7}px; z-index: 2;"></span>
                    <div style="position: absolute; top: -20px; left: ${evt.offsetX + 6}px; width: 1px; height: ${(evt.offsetY + 30)}px; background: #FFFFFF; z-index: 3;"></div>
                    <div style="position: absolute; top: -20px; left: ${evt.offsetX + 6}px; width: calc(100% - ${(evt.offsetX - 10)}px); height: 1px; background: #FFFFFF; z-index: 4;"></div>
                </div>`);
            }
        },
    }
});