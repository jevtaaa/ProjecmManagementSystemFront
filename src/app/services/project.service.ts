import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { plainToClass } from 'class-transformer';
import { Project } from '../model/project.model';
import { Task } from '../model/task.model';
import { User } from '../model/user.model';
import { TaskDialogComponent } from '../project/project-view/task-dialog/task-dialog.component';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {



  dialog: MatDialogRef<TaskDialogComponent>;
  projects: Project[] = []

  constructor(private http: HttpClient, private authService: AuthService) {
  }


  private getAllProjects() {
    return this.http.get(this.authService.ngrokUrl + 'project/all');
  }

  public updateProject(projectId: number, projectManagerId: number, name: string) {
    const httpBody = {
      "name": name,
      "projectmanagerid": projectManagerId
    };

    return this.http.put(this.authService.ngrokUrl+'project/'+projectId, httpBody);
  }

  public deleteProject(projectId: number) {
    return this.http.delete(this.authService.ngrokUrl+'project/'+projectId);
  }

  fetchAllProjects(){

    if(!this.authService.roleMatch(['Admin','ProjectManager'])){
      return;
    }

    this.getAllProjects().subscribe((data: Project[]) => {
      this.projects = [];
      for (let project of data) {

        let tasks: Task[] = [];
        for (let task of project.tasks) {
          let _task: Task = plainToClass(Task, task);
          _task.developer = plainToClass(User, task.developer)
          tasks.push(_task);
        }
        this.projects.push(new Project(project.id, project.name, plainToClass(User, project.projectManager), tasks))
      }
    }, (err) => {
      console.log(err)
    })
  }

  removeFromProjects(project: Project) {
    let index = this.projects.indexOf(this.projects.find(x => x.id == project.id));
    this.projects.splice(index, 1);
  }
}
