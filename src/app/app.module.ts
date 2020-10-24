import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { ProjectComponent } from './project/project.component';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProjectItemComponent } from './project/project-item/project-item.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ProjectViewComponent } from './project/project-view/project-view.component';
import { MatSelectModule } from '@angular/material/select';
import { TableComponent } from './project/project-view/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { TaskDialogComponent } from './project/project-view/task-dialog/task-dialog.component';
import { MatSliderModule } from '@angular/material/slider';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './guards/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    ProjectComponent,
    ProjectItemComponent,
    ProjectViewComponent,
    TableComponent,
    TaskDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatSelectModule,
    MatInputModule,
    MatSliderModule,
    MatTableModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    RouterModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
