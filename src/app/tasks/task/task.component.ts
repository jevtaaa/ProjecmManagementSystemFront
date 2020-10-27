import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from 'src/app/model/project.model';
import { Task } from 'src/app/model/task.model';
import { TaskDialogComponent } from 'src/app/project/project-view/task-dialog/task-dialog.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  @Input() project: Project;


  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  openDialog() {

    this.dialog.open(TaskDialogComponent, {
      data: { task: this.task, project: this.project },
      width: '600px',
    });
  }

  getProgressBarColor() {
    if (this.task.progress < 25) {
      return 'progress-bar progress-bar bg-danger'
    }

    if (this.task.progress >= 25 && this.task.progress < 50){
      return 'progress-bar progress-bar bg-warning'
    }

      if (this.task.progress >= 50 && this.task.progress < 75) {
        return 'progress-bar progress-bar';
      }

    if (this.task.progress >= 75) {
      return 'progress-bar bg-success';
    }
  }

}
