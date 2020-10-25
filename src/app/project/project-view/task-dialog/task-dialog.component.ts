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
  progress: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { task: Task, project: Project }, private service: ProjectService, private userService: UserService, public dialogRef: MatDialogRef<TaskDialogComponent>) {
    this.service.dialog = this.dialogRef;
  }

  ngOnInit(): void {

    this.developers = this.userService.developers;
    this.initForm();

  }

  formatLabel(value: number) {

    return value + '%';
  }

  initForm() {

    if (!this.data.task) {
      this.taskForm = new FormGroup({

        task_deadline: new FormControl('', [Validators.required]),
        assignee: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        status: new FormControl('', [Validators.required]),
        progress: new FormControl('', [Validators.required])

      })
      return;
    }

    this.taskForm = new FormGroup({

      task_deadline: new FormControl(this.data.task.deadline, [Validators.required]),
      assignee: new FormControl(this.userService.developers.find(x => x.username === this.data.task.developer.username), [Validators.required]),
      description: new FormControl(this.data.task.description, [Validators.required]),
      status: new FormControl(this.data.task.status, [Validators.required]),
      progress: new FormControl(this.data.task.progress, [Validators.required])

    })
  }

  deleteTask() {
    // this.data.project.tasks = this.data.project.tasks.filter(x => x !== this.data.task);
    this.service.dialog.close();
    console.log(this.userService.projectManagers)

  }

  updateTask() {

  }

  saveTask() {   

    let task: Task = new Task(-1, this.taskForm.value['status'], this.taskForm.value['progress'], new Date(this.taskForm.value), this.taskForm.value['description'], this.taskForm.value['assignee'])
    console.log(task)
    this.service.saveTask(task, this.data.project.id).subscribe((data)=>{
      console.log(data)
    })

    

  }
}


