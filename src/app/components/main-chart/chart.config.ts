import { ChartData } from "./main-chart.component";

export function getChartConfigs(data: ChartData): any {
    return {
        series: [
            {
                name: "Stressed",
                data: data.serie1
            },
            {
                name: "Non-stressed",
                data: data.serie2
            },
        ],
        chart: {
            type: "bar",
            height: 350,
            stacked: true,
            stackType: "100%"
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    legend: {
                        position: "bottom",
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }
        ],
        xaxis: {
            categories: data.xCategories
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: "right",
            offsetX: 0,
            offsetY: 50
        }
    }
}