import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Project } from '../model/project.model';
import { Task } from '../model/task.model';
import { TaskDialogComponent } from '../project/project-view/task-dialog/task-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {



  dialog: MatDialogRef<TaskDialogComponent>;
  projects: Project[] = [
    new Project(1, "Projekat 1", "User1", [new Task(1, "Task1", "User1", "new", 72, null, "Opis"), new Task(2, "Task1", "User1", "new", 22, null, "")]),
    new Project(2, "Projekat 2", "User1", [new Task(1, "Task2", "User1", "new", 23, null, ""), new Task(2, "Task1", "User1", "new", 22, null, "")]),
    new Project(3, "Projekat 3", "User1", [new Task(1, "Task3", "User1", "new", 72, null, ""), new Task(2, "Task1", "User1", "new", 22, null, "")]),
    new Project(4, "Projekat 4", "User1", [new Task(1, "Task4", "User1", "new", 72, null, ""), new Task(2, "Task1", "User1", "new", 22, null, "")]),
    new Project(5, "Projekat 5", "User1", [new Task(1, "Task5", "User1", "new", 72, null, ""), new Task(2, "Task1", "User1", "new", 22, null, "")]),
    new Project(6, "Projekat 6", "User2", [new Task(1, "Task6", "User1", "new", 34, null, "")])]

  constructor() { }
}
