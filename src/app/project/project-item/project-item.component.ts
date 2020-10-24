import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/model/project.model';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  panelOpenState: boolean;
  @Input() project: Project;

  constructor() { }

  ngOnInit(): void {
    this.panelOpenState = false;
  }

}
