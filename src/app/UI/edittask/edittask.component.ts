import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../Services/shared.service';
import { Task } from '../../Models/task';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css'],
  providers:[SharedService,Task]
})
export class EdittaskComponent implements OnInit {

  
  taskName : string;
  pTaskName : String;
  pID: number;
  priority: number;
  sDate :String;
  eDate:String;
  editTaskData :any;
  taskData : Task;
  response: any;
  // taskList : Task[];
taskId : number;
  ParentList : any;
  parent: any;


  constructor(private  _router:Router, public _service:SharedService) { }

  ngOnInit() {
    this.taskId = +this._router.url.substr(this._router.url.lastIndexOf('/')+1);
    this.GetTask();

   
  }

  GetTask() {

    this._service.GetParentTask().subscribe((res: Response) => {
      this.ParentList = res.json();
      this.ParentList = this.ParentList.filter(x => (x.Id != this.taskId));
    }, (error) => {
      console.log("Error While Processing Results");
    });

      this._service.GetTaskById(this.taskId).subscribe((res: Response) => {
      this.taskData = res.json();
      this.taskId = this.taskData.Task_ID;
      this.taskName = this.taskData.Task1;
      this.pTaskName = this.taskData.ParentTask;
      this.priority = this.taskData.Priority;
      this.sDate = this.taskData.StartDate.toString().slice(0,10);
      this.eDate = this.taskData.EndDate.toString().slice(0,10);
      this.pID = this.taskData.Parent_ID;

    }, (error) => {
      console.log("Error While Processing Results");
    });
  }

  UpdateTask() {

    this.taskData.Task1 = this.taskName;
    this.taskData.Parent_ID = this.pID;
    this.taskData.Task_ID = this.taskId;
    this.taskData.Start_Date = this.sDate;
    this.taskData.End_Date = this.eDate;
    this.taskData.Priority = this.priority;

    if(this.taskName == null || this.sDate == null || this.eDate == null)
    {
      alert("Please enter Task, Start Date & End Date");
      return;
    }

    this._service.UpdateTask(this.taskData).subscribe((res: Response) => {
      this.response = res.json();
      if (this.response ==  true) {
        this._router.navigateByUrl('');
        } else {
          alert("Error in updating task")
        this._router.navigateByUrl('');
        }
    }, (error) => {
      this._router.navigateByUrl('');
      console.log("Error While Processing Results");
    });

  }

  Cancel(){
    this._router.navigateByUrl('');
  }

}
