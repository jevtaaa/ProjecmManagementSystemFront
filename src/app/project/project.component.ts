import { Component, OnInit } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Project } from '../model/project.model';
import { Task } from '../model/task.model';
import { User } from '../model/user.model';
import { ProjectService } from '../services/project.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  projects: Project[];

  constructor(public projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.fetchAllProjects();
  }


}
