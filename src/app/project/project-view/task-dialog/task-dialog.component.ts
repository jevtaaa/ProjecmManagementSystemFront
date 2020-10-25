import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/model/project.model';
import { Task } from 'src/app/model/task.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {

  taskForm: FormGroup;
  managers: string[] = ["Nikola", "Marko", "Pera", "User1"];
  statuses: string[] = ["new", "in progress", "finished"];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { task: Task, project: Project }, private service: ProjectService, public dialogRef: MatDialogRef<TaskDialogComponent>) { 
    this.service.dialog = this.dialogRef;
  }

  ngOnInit(): void {

    this.initForm();
  }

  formatLabel(value: number) {

    return value + '%';
  }

  initForm() {
    this.taskForm = new FormGroup({

     
      task_deadline: new FormControl(this.data.task.deadline, [Validators.required]),
      assignee: new FormControl(this.data.task.developer, [Validators.required]),
      description: new FormControl(this.data.task.description, [Validators.required]),
      status: new FormControl(this.data.task.status, [Validators.required])

    })
  }

  deleteTask() {
    this.data.project.tasks = this.data.project.tasks.filter(x => x !== this.data.task);
    this.service.dialog.close();
    
  }

  updateTask() {

  }

}
