import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AddtaskComponent } from './UI/addtask/addtask.component';
import { EdittaskComponent } from './UI/edittask/edittask.component';
import { SearchtaskComponent } from './UI/searchtask/searchtask.component';
// import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


export const appRoutes:Routes=[
 {path:'Add',component:AddtaskComponent},
 {path:'Edit/:un',component:EdittaskComponent},
 {path:'Search',component:SearchtaskComponent},
 {path:'',component:SearchtaskComponent},
]

@NgModule({
 
  declarations: [
    AppComponent,
    AddtaskComponent,
    EdittaskComponent,
    SearchtaskComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

