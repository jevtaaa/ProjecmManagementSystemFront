import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from 'src/app/model/project.model';
import { Task } from 'src/app/model/task.model';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserEditComponent } from 'src/app/users/user-edit/user-edit.component';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit {

  @Input() user:User;

  constructor(private projectService: ProjectService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getExpansionData(): Task[] | Project[]{

    if(this.user.role ==='Developer'){
     
      return this.projectService.getUsersTasks(this.user);
    }
    return this.projectService.getManagersProjects(this.user)
    
  }

  openEditDialog(user: User){
    this.dialog.open(UserEditComponent, {
        data: { user: user},
        width: '800px',
    });
  }
}
