import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatasetsComponent } from '../datasets/datasets.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DatasetsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
