import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { plainToClass } from 'class-transformer';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/model/project.model';
import { Task } from 'src/app/model/task.model';
import { User } from 'src/app/model/user.model';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {


  projectForm: FormGroup;
  projectManagers: User[] = [];
  selectedValue: string;
  project: Project;
  edit: boolean;


  constructor(private router: ActivatedRoute, private projectService: ProjectService, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.edit = false;
    this.projectManagers = this.userService.projectManagers;

    this.router.paramMap.subscribe(paramMap => {
      this.project = this.projectService.projects.find(data => data.id == +paramMap.get('id'));
      console.log(this.project);
    })

    this.projectForm = new FormGroup({

      project_name: new FormControl({ value: this.project.name, disabled: !this.edit }, [Validators.required]),
      project_manager: new FormControl({ value: this.project.projectManager.username, disabled: !this.edit }, [Validators.required])

    })
  }

  editMode() {
    this.edit = !this.edit;
    this.edit ? this.projectForm.get('project_name').enable() : this.projectForm.get('project_name').disable();
    this.edit ? this.projectForm.get('project_manager').enable() : this.projectForm.get('project_manager').disable();
  }

  saveChanges() {
    let projectManeger: User[] = (this.userService.projectManagers.filter(x => x.username == this.projectForm.controls.project_manager.value));
    let name = this.projectForm.controls.project_name.value;
    this.projectService.updateProject(this.project.id, projectManeger[0].id, name)
    .subscribe((data:any) => {
      console.log(data);
      this.project.name = data.name;
      this.project.projectManager = plainToClass(User, data.projectManager);
      this.toastr.success("", "Successfully edited!");
    })
    this.editMode();
  }

  addTask() {
    this.project.tasks = this.project.tasks.filter(x => x);
  }
}


