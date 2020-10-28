import { Component, OnInit } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private projectService: ProjectService, private userService: UserService, public authService: AuthService) { }

  ngOnInit(): void {
    this.userService.getLoggedUser(this.authService.getIdFromToken())
    .subscribe((data:any) =>{
      this.authService.loggedUser = plainToClass(User, data);
    },(err) => {
      console.log(err);
    });
    
    if(this.authService.roleMatch(['Admin', 'ProjectManager'])){
      this.projectService.fetchAllProjects();
      this.userService.fetchAllUsers();
    } 
    if(this.authService.roleMatch(['ProjectManager'])){
      this.projectService.fetchAllTasks();
    }
    if(this.authService.roleMatch(['Developer'])){
      this.projectService.fetchDeveloperTasks(this.authService.getIdFromToken());
    }
  }
}
