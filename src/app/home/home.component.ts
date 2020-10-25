import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private projectService: ProjectService, private userService: UserService) { }

  ngOnInit(): void {
    this.projectService.fetchAllProjects();
    this.userService.fetchAllUsers();
  }
}
