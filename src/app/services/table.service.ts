import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {


  public tasks:Task[];

  constructor() { }
}
