import { Injectable } from '@angular/core';
import { taskData, Task } from '../Models/task';
import { Http, Headers, RequestOptions } from '@angular/http';


@Injectable({
  providedIn: 'root'
})

export class SharedService {

  taskdata: any;
  taskList: any;

constructor(private httpServ: Http) { }
  getTaskListUri = "http://localhost:1100/api/Task/GetTaskList";

  GetTaskList(){
    return this.httpServ.get(this.getTaskListUri);
  }

  getTaskUri = "http://localhost:1100/api/Task/GetTaskById";
  GetTaskById(Id:number){
    return this.httpServ.get(this.getTaskUri+ "?Id="+Id);
  }

  addTaskUri = "http://localhost:1100/api/Task/AddTask";
  AddTask(data: Task) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.httpServ.post(this.addTaskUri, data, options);
  }

  updateTaskUri = "http://localhost:1100/api/Task/UpdateTask";
  UpdateTask(data: Task) {

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.httpServ.post(this.updateTaskUri, data, options);
  }

  endTaskUri = "http://localhost:1100/api/Task/EndTask?Id=";
  EndTask(Id:number){
    return this.httpServ.get(this.endTaskUri+Id);
  }

  getParentTaskUri = "http://localhost:1100/api/Task/ParentTask";
  GetParentTask(){
    return this.httpServ.get(this.getParentTaskUri);
  }

}
