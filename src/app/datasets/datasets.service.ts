import { Injectable } from '@angular/core';
import csvToJson from 'csvtojson';
import { DATASET_LIST } from '../mock-datasets/mock-datasets';
import { json2csv } from 'json-2-csv';

export interface Dataset {
  id: string;
  name: string;
  features: number;
  rows: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatasetsService {
  constructor() { }

  getAllDatasets(): Dataset[] {
    let datasetList: Dataset[] = DATASET_LIST.map((dataset) => {
      return this.getDatasetInfo(dataset.fileName, dataset.data);
    });
    return datasetList;
  }

  getDatasetById(id: string): Dataset | undefined {
    let dataset = DATASET_LIST.find(dataset => dataset.fileName === id);
    if (dataset) {
      return this.getDatasetInfo(dataset.fileName, dataset.data);
    }
    return undefined;
  }

  
  getDatasetRowsById(id: string) {
    let dataset = DATASET_LIST.find(dataset => dataset.fileName === id);
    if (dataset) {
      return this.csvToJson(dataset.data);
    }
    return undefined;
  }

  downloadDatasetFile(data: any, fileName: string, type: string) {
    let transformedData = json2csv(data);
    let blob = new Blob([transformedData], { type: type.toString() });
    let url = window.URL.createObjectURL(blob);
    let anchor = document.createElement("a");
    anchor.download = fileName;
    anchor.href = url;
    anchor.click();
  }
  
  private csvToJson(csv: string) {
    return csvToJson().fromString(csv);
  }

  getDatasetInfo(fileName: string, data: string) {
    let id = fileName.replace('.csv', '');
    let name = id.charAt(0).toUpperCase() + id.slice(1);
    let tempData = data.split('\n');
    let features = tempData[0].split(',').length;
    let rows = tempData.length-1;
    let description = `A dataset of ${name}`
    return { id: id, name: name, features: features, rows: rows, description: description };
  }

}
