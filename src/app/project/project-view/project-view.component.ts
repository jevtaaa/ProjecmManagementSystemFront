import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/model/project.model';
import { Task } from 'src/app/model/task.model';
import { ProjectService } from 'src/app/services/project.service';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {


  projectForm: FormGroup;
  managers: string[] = ["Nikola", "Marko", "Pera"];
  selectedValue: string;
  project: Project;
  edit: boolean;


  constructor(private router: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit(): void {

    this.edit = false;


    this.router.paramMap.subscribe(paramMap => {
      this.project = this.projectService.projects.find(data => data.id == +paramMap.get('id'));
      console.log(this.project);
    })

    this.projectForm = new FormGroup({

      project_name: new FormControl({ value: this.project.name, disabled: !this.edit }, [Validators.required]),
      project_manager: new FormControl({ value: this.managers[0], disabled: !this.edit }, [Validators.required])

    })
  }

  editMode() {
    this.edit = !this.edit;
    this.edit ? this.projectForm.get('project_name').enable() : this.projectForm.get('project_name').disable();
    this.edit ? this.projectForm.get('project_manager').enable() : this.projectForm.get('project_manager').disable();

  }

  saveChanges() {
    this.editMode();

  }

  addTask() {
    this.project.tasks.push(new Task(1, "User1", "New", 72, null, "Opis", null))
    this.project.tasks = this.project.tasks.filter(x => x);

  }


}


