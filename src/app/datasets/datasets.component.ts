import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { DatasetsService } from './datasets.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-datasets',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatPaginatorModule, MatSortModule, RouterLink, RouterOutlet, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule ],
  templateUrl: './datasets.component.html',
  styleUrl: './datasets.component.css'
})
export class DatasetsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'features', 'rows', 'description'];
  dataSource : MatTableDataSource<any> = new MatTableDataSource<any>;
  datasetsService: DatasetsService = inject(DatasetsService);

  fileName: string | undefined;

  constructor(private http : HttpClient) {
    this.dataSource = new MatTableDataSource(this.datasetsService.getAllDatasets());
  }

  // Temp function until http requests are setup
  onFileSelected(fileInputEvent: any) {
    let file = fileInputEvent.target.files[0]
    //console.log(file);
    let reader = new FileReader();
    reader.onload = () => {
        let text = reader.result as string;
        const data = this.dataSource.data;
        data.push(this.datasetsService.getDatasetInfo(file.name, text))
        this.dataSource.data = data;
    }
    reader.readAsText(file);
  }

  // TODO: setup db to use
  // onFileSelected(fileInputEvent: any) {
  //   let file = fileInputEvent.target.files[0]
  //   this.fileName = file.name;
  //   const endpoint = '/uploads';
  //   const formData: FormData = new FormData();
  //   formData.append('upload', file);

  //   let params = new HttpParams();
  //   const options = {
  //     params: params,
  //     reportProgress: true,
  //   };

  //   const req = new HttpRequest('POST', endpoint, formData, options);
  //   return this.http.request(req);
  // }

  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  @ViewChild(MatSort) sort: MatSort = <MatSort>{};

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
