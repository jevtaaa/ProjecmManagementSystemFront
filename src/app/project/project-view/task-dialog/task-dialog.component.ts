import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { plainToClass } from 'class-transformer';
import { Project } from 'src/app/model/project.model';
import { Task } from 'src/app/model/task.model';
import { User } from 'src/app/model/user.model';
import { ProjectService } from 'src/app/services/project.service';
import { TableService } from 'src/app/services/table.service';
import { UserService } from 'src/app/services/user.service';
import {MatCalendar} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MatDateFormats} from '@angular/material/core';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {

  taskForm: FormGroup;
  developers: User[];
  statuses: string[] = ["new", "in progress", "finished"];
  minDate: Date;
  maxDate: Date;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { task: Task, project: Project }, private tableService: TableService, private service: ProjectService, private userService: UserService, public dialogRef: MatDialogRef<TaskDialogComponent>) {
    this.service.dialog = this.dialogRef;
    const current = new Date();
    this.minDate = current;
    this.maxDate = new Date(current.getFullYear() + 5, 11, 31);
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
        progress: new FormControl(0, [Validators.required])

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
    this.service.deleteTask(this.data.project.id, this.data.task.id).subscribe((res) => {
      this.tableService.tasks = this.tableService.tasks.filter(x => x.id !== this.data.task.id);
      this.service.dialog.close();
    });



  }

  updateTask() {

  }

  saveTask() {

    let task: Task = new Task(-1, this.taskForm.value['status'],
      this.taskForm.value['progress'], new Date(this.taskForm.value['task_deadline']),
      this.taskForm.value['description'], this.taskForm.value['assignee'])


    this.service.saveTask(task, this.data.project.id).subscribe((data: Task) => {

      let task: Task = plainToClass(Task, data);
      task.developer = plainToClass(User, data.developer)

      this.tableService.tasks.push(task);
      this.tableService.tasks = this.tableService.tasks.filter(x => x)

      this.service.dialog.close()
    });



  }
}


