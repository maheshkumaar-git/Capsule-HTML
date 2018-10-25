import { Component, OnInit, NgModule } from '@angular/core';
import { EdittaskComponent } from '../edittask/edittask.component';
import { SearchtaskComponent } from 'src/app/UI/searchtask/searchtask.component';
import { RouterModule, Route, Router } from '@angular/router';
import { SharedService } from '../../Services/shared.service';
import { Http, Response } from '@angular/http';
import { Task } from '../../Models/task';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  taskName: string;
  pTaskName: String;
  priority: number = 1;
  sDate: string;
  eDate: string;
  response: any;
  taskData: Task;
  pTaskId: number;
  ParentList: any;

  constructor(private _router: Router, public _service: SharedService) { }

  ngOnInit() {
    this.GetParentTask();
    this.pTaskId = null;

  }

  Reset() {
    this.taskName = "";
    this.pTaskName = "";
    this.priority = 1;
    this.sDate = null;
    this.eDate = null;
    this.pTaskId = null;
  }

  Add() {
    this._router.navigateByUrl('/Add');
  }

  ViewTask() {
    this._router.navigateByUrl('');
  }

  GetParentTask() {
    this._service.GetParentTask().subscribe((res: Response) => {
      this.ParentList = res.json();
    }, (error) => {
      console.log("Error While Processing Results");
    });
  }

  AddTask() {

    this.taskData = new Task()
    this.taskData.Task1 = this.taskName;
    this.taskData.Parent_ID = this.pTaskId;
    this.taskData.Start_Date = this.sDate;
    this.taskData.End_Date = this.eDate;
    this.taskData.Priority = this.priority;

    if (this.taskName == null || this.sDate == null || this.eDate == null) {
      alert("Please enter Task, Start Date & End Date");
      return;
    }

    this._service.AddTask(this.taskData).subscribe((res: Response) => {
      this.response = res.json();
      if (this.response == true) {
        this._router.navigateByUrl('');
      } else {
        alert("Error in adding new task")
        this._router.navigateByUrl('');
      }
    }, error => {
      this._router.navigateByUrl('');
      console.log("Error While Processing Results");
    });
  }
}


