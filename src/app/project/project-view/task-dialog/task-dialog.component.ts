import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/model/project.model';
import { Task } from 'src/app/model/task.model';
import { User } from 'src/app/model/user.model';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {

  taskForm: FormGroup;
  developers: User[];
  statuses: string[] = ["new", "in progress", "finished"];

  constructor(@Inject(MAT_DIALOG_DATA) public data: Task, private service: ProjectService, private userService:UserService, public dialogRef: MatDialogRef<TaskDialogComponent>) { 
    this.service.dialog = this.dialogRef;
  }

  ngOnInit(): void {

    this.developers = this.userService.developers;
    this.initForm();
    console.log(this.data)
    console.log(this.data.developer === this.userService.developers[2])
    
  }

  formatLabel(value: number) {

    return value + '%';
  }

  initForm() {
    this.taskForm = new FormGroup({

      task_deadline: new FormControl(this.data.deadline, [Validators.required]),
      assignee: new FormControl(this.data.developer, [Validators.required]),
      description: new FormControl(this.data.description, [Validators.required]),
      status: new FormControl(this.data.status, [Validators.required])

    })
  }

  deleteTask() {
   // this.data.project.tasks = this.data.project.tasks.filter(x => x !== this.data.task);
    this.service.dialog.close();
    console.log(this.userService.projectManagers)
    
  }

  updateTask() {

  }

}
