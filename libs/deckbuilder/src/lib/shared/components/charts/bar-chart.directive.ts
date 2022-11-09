import {
  Directive,
  ElementRef,
  Inject,
  Input,
  LOCALE_ID,
  OnDestroy,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import {
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Legend,
  ChartData,
  Chart,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const chartJsComponents = [
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Legend,
  ChartDataLabels,
];

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[barChart]',
})
export class BarChartDirective implements OnDestroy {
  @Input() public set data(data: ChartData) {
    this.displayValue = data.datasets.length === 1;
    if (this.chart.data.datasets.length === data.datasets.length) {
      data.datasets.forEach((dataset, i) => {
        Object.assign(this.chart.data.datasets[i], dataset);
      });
    } else {
      this.chart.data.labels = data.labels;
      this.chart.data.datasets = data.datasets;
    }
    if (this.chart.options.plugins?.legend) {
      this.chart.options.plugins.legend.display = data.datasets.length > 1;
    }
    this.chart.update();
  }

  @Input() public type!: string;

  private displayValue = false;

  private readonly chart: Chart;

  constructor(
    private readonly elmt: ElementRef<HTMLCanvasElement>,
    @Inject(LOCALE_ID) private readonly locale: string
  ) {
    Chart.register(...chartJsComponents);
    this.chart = new Chart(this.elmt.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Anges', 'Golems', 'Bénédictions', 'Equipements'],
        datasets: [{ data: [] }],
      },
      options: {
        scales: {
          x: { ticks: { color: '#ddd' } },
          y: {
            ticks: { color: '#ddd', stepSize: 1 },
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: { color: '#ddd' },
            position: 'bottom',
          },
          datalabels: {
            color: '#ddd',
            font: { size: 16 },
            formatter: (value) =>
              this.displayValue && value.y !== 0
                ? new DecimalPipe(this.locale).transform(value.y, '1.0-2')
                : '',
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });
  }

  ngOnDestroy(): void {
    Chart.unregister(...chartJsComponents);
  }
}
