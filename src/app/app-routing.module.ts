import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProjectViewComponent } from './project/project-view/project-view.component';
import { ProjectComponent } from './project/project.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
  path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'project',
        children: [
          {
            path: '',
            component: ProjectComponent,
            canActivate: [AuthGuard],
            data: {
              permittedRoles: ['Admin', 'ProjectManager']
            }
          },
          {
            path: ':id',
            component: ProjectViewComponent,
            canActivate: [AuthGuard],
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
