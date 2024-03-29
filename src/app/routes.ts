import { Routes } from '@angular/router';
import { DatasetsComponent } from './datasets/datasets.component';
import { DetailsComponent } from './details/details.component';

const routeConfig: Routes = [
    {
      path: '',
      component: DatasetsComponent,
      title: 'Datasets'
    },
    {
      path: 'details/:id',
      component: DetailsComponent,
      title: 'Dataset details'
    }
  ];
  
  export default routeConfig;