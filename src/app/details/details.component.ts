import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dataset, DatasetsService } from '../datasets/datasets.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ChartConfiguration, ChartData, ChartEvent, ChartType, Colors} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule, MatButtonModule, MatDividerModule, MatIconModule, BaseChartDirective, MatInputModule, MatSelectModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})

export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  datasetsService = inject(DatasetsService);
  dataset: Dataset | undefined;

  displayedColumns: string[] = [];
  dataColumns: string[] = [];
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>;

  selection = new SelectionModel<any[]>(true, []);

  // from the ng2-charts demo
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'left',
      },
      title: {
        display: true,
        text: 'Feature Value Counts',
        font: {
          size: 16,
        }
      }
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]
      },
    ],
  };
  public pieChartType: ChartType = 'pie';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  changeLabels(): void {
    this.pieChartData.labels = new Array(3).map(() => 'label');

    this.chart?.update();
  }

  pieChartInputVal: string = '';

  addSlice(): void {
    let valueCounts = this.sortDict(this.getFeatureValueCounts(this.dataSource.data, this.pieChartInputVal));
    let dataLen = this.pieChartData.datasets[0].data.length;
    if (dataLen < Object.keys(valueCounts).length) {
      if (this.pieChartData.labels) {
        this.pieChartData.labels.push(Object.keys(valueCounts)[dataLen]);
      }

      this.pieChartData.datasets[0].data.push(Object.values(valueCounts)[dataLen]);

      this.chart?.update();
    }
  }

  removeSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.pop();
    }

    this.pieChartData.datasets[0].data.pop();

    this.chart?.update();
  }

  toggleLegend(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.display =
        !this.pieChartOptions.plugins.legend.display;
    }

    this.chart?.render();
  }

  getFeatureValueCounts(data: any[], featureName: string) {
    let valueCounts: { [key: string]: number } = {};
    data.forEach((row) => {
      let value = row[featureName] as string;
      if (value) {
        if (valueCounts[value]) {
          valueCounts[value] += 1;
        } else {
          valueCounts[value] = 1;
        }
      }
    });
    return valueCounts;
  }

  updatePieChart(data: any[], featureName: string) {
    let valueCounts = this.sortDict(this.getFeatureValueCounts(data, featureName));
    this.pieChartData.labels = [];
    this.pieChartData.datasets[0].data = [];
    this.pieChartData.labels?.push(...Object.keys(valueCounts).slice(0,3));
    this.pieChartData.datasets[0].data.push(...Object.values(valueCounts).slice(0,3));
    this.chart?.render();
  }

  onPieChartInputChanged(e: any) {
    let value = e.target.value.trim() as string;
    if (value !== this.pieChartInputVal && this.dataColumns.includes(value)) {
      this.pieChartInputVal = value;
      this.updatePieChart(this.dataSource.data, value);
    }
  }

  sortDict(dict: {[key: string]: number}) {
    let sortableArray = Object.entries(dict);
    let sortedArray = sortableArray.sort(([, a], [, b]) => b - a);
    let sortedObject = Object.fromEntries(sortedArray);
    return sortedObject;
  }

  // from angular tutorial //
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row) => {
        // only toggle all filtered rows
        if (this.dataSource.filteredData.includes(row)) {
          this.selection.select(row);
        }
      });
  }

  downloadSelectedRows() {
    if (this.dataset) {
      this.datasetsService.downloadDatasetFile(this.selection.selected, this.dataset.id ,'text/csv');
    }
  }

  selectRandomRows(val: string) {
    let count = +val;
    if (count < this.dataSource.data.length && count > 0) {
      this.selection.clear();
      let shuffledData = [...this.dataSource.filteredData].sort(() => Math.random() - 0.5);;
      shuffledData.slice(0,count).forEach((row) => { this.selection.select(row); });
    }
  }

  @ViewChild('featureNameInput') featureNameInput!: ElementRef;
  @ViewChild('featureComparatorInput') featureComparatorInput!: ElementRef;
  @ViewChild('filterValueInput') filterValueInput!: ElementRef;

  filterTable(data: any, filter: string, featureName: string, comparator: string): boolean {
    if (comparator == '=') {
      return data[featureName.trim()]?.toLowerCase().includes(filter.toLowerCase().trim());
    } else if (comparator == '>') {
      return data[featureName.trim()]?.toLowerCase() > filter.toLowerCase().trim();
    } else if (comparator == '<') {
      return data[featureName.trim()]?.toLowerCase() < filter.toLowerCase().trim();
    }
    return false;
  };

  onTableFilterChanged(featureName: string, cmp: string, filterValue: string) {
    this.dataSource.filterPredicate = function(data: any, filter: string): boolean {
      let comparator = cmp;
      if (comparator == '=') {
        return data[featureName.trim()]?.toLowerCase().includes(filter.toLowerCase().trim());
      } else if (comparator == '>') {
        return data[featureName.trim()]?.toLowerCase() > filter.toLowerCase().trim();
      } else if (comparator == '<') {
        return data[featureName.trim()]?.toLowerCase() < filter.toLowerCase().trim();
      }
      return false;
    };
    this.dataSource.filter = filterValue;
  }

  constructor() {
    const datasetId = this.route.snapshot.params['id'];
    this.dataset = this.datasetsService.getDatasetById(datasetId);
    if (this.dataset) {
      this.datasetsService.getDatasetRowsById(datasetId)
        ?.then((result) => {
          this.displayedColumns = ['select', ...Object.keys(result[0])];
          this.dataColumns = Object.keys(result[0]);
          this.dataSource = new MatTableDataSource(result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.updatePieChart(result, this.dataColumns[0]);
          this.pieChartInputVal = this.dataColumns[0];
        });
    }
  }

  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  @ViewChild(MatSort) sort: MatSort = <MatSort>{};
}
