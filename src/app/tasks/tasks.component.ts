import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task.model';
import { AuthService } from '../services/auth.service';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  devTasks: Task[] = [];
  nullTasks: Task[] = [];

  constructor(public projectService: ProjectService) { }

  ngOnInit(): void {
    
    for (let project of this.projectService.projects) {
      for (let task of project.tasks) {
        task.developer!==null ? this.devTasks.push(task) : this.nullTasks.push(task);
      }
    }

    // console.log(this.devTasks)
    // console.log(this.nullTasks)

    
  }

  findProject(taskParam:Task){
    for (let project of this.projectService.projects) {
      for (let task of project.tasks) {
        if(task === taskParam) return project;
      }
    }

    return null;
  }
}
