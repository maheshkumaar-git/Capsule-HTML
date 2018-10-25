import { SharedService } from './Services/shared.service';
import { Http , HttpModule , Response} from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AddtaskComponent } from './UI/addtask/addtask.component';
import { EdittaskComponent } from './UI/edittask/edittask.component';
import { SearchtaskComponent } from './UI/searchtask/searchtask.component';

export const appRoutes:Routes=[
    {path:'Add',component:AddtaskComponent},
    {path:'Edit',component:EdittaskComponent},
    {path:'',component:SearchtaskComponent},
    {path:'Search',component:SearchtaskComponent},
  ]