import { trigger, state, style, transition, animate } from '@angular/animations';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/model/project.model';
import { Task } from 'src/app/model/task.model';
import { User } from 'src/app/model/user.model';
import { ProjectService } from 'src/app/services/project.service';
import { TableService } from 'src/app/services/table.service';
import { UserService } from 'src/app/services/user.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class TableComponent implements OnInit {


  @Input() project: Project;
  columnsToDisplay = ['id', 'assignee', 'status', 'progress', 'deadline', 'edit'];
  expandedElement: Task | null;
  

  constructor( public tableService: TableService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.project ? this.tableService.tasks = this.project.tasks : this.tableService.tasks = [];
  }

  developerName(data: User) {
    return data.name + ' ' + data.surname;
  }


  removeTask(task: Task) {
    this.project.tasks = this.project.tasks.filter(x => x !== task);

  }

  addTask() {
    this.openDialog(null);
    
  }

  openDialog(task: Task) {

    this.dialog.open(TaskDialogComponent, {
      data: { task: task, project: this.project },
      width: '600px',
    });
  }
}


