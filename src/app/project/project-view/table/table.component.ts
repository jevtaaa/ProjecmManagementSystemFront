import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/model/project.model';
import { Task } from 'src/app/model/task.model';
import { User } from 'src/app/model/user.model';
import { ProjectService } from 'src/app/services/project.service';
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


  project: Project;
  columnsToDisplay = ['id', 'assignee', 'status', 'progress', 'deadline', 'edit', 'remove'];
  expandedElement: Task | null;




  constructor(private router: ActivatedRoute, private userService: UserService, private projectService: ProjectService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.router.paramMap.subscribe(paramMap => {
      this.project = this.projectService.projects.find(data => data.id == +paramMap.get('id'))
    })

  }

  developerName(data:User){
    return data.name+' '+data.surname;
  }


  removeTask(task: Task) {
    this.project.tasks = this.project.tasks.filter(x => x !== task);

  }

  openDialog(task: Task) {
    console.log(task.developer === this.userService.developers[2])
    this.dialog.open(TaskDialogComponent, {
      data:task,
        
    });
  }
}


