import { Component, OnInit } from '@angular/core';
import { Project } from '../model/project.model';
import { Task } from '../model/task.model';
import { ProjectService } from '../services/project.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  projects: Project[];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projects = this.projectService.projects;
  }

}
