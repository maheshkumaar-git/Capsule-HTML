import { Component, OnInit } from '@angular/core';
import { Task, taskData } from '../../Models/task';
import { SharedService } from '../../Services/shared.service';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchtask',
  templateUrl: './searchtask.component.html',
  styleUrls: ['./searchtask.component.css'],
  providers: [SharedService]
})
export class SearchtaskComponent implements OnInit {
  
  taskList: Task[];
  taskListFiltered: Task[];
  taskName: string;
  pTaskName: string;
  startDate: Date;
  endDate: Date;
  priorityFrom: number;
  priorityTo: number;
  response: any;

  constructor(private _router: Router, public _service: SharedService) {
    this.GetTask();
  }

  GetTask() {
    this._service.GetTaskList().subscribe((res: Response) => {
      this.taskList = res.json();
      this.taskListFiltered = this.taskList;
    }, (error) => {
      console.log("Error While Processing Results");
    });
  }

  ngOnInit() {
  }

  SearchByTask() {
    this.taskListFiltered = this.taskList.filter(x => x.Task1.toLowerCase().includes(this.taskName.toLowerCase()));
  }

  SearchByParentTask() {
    this.taskListFiltered = this.taskList.filter(x => (x.ParentTask == null ? "" : x.ParentTask.toLowerCase()).includes(this.pTaskName.toLowerCase()));
  }

  SearchByPriority() {
    if (this.priorityFrom != null && this.priorityTo != null && this.priorityTo >= this.priorityFrom) {
      this.taskListFiltered = this.taskList.filter(x => (x.Priority <= this.priorityTo && x.Priority >= this.priorityFrom));
    } else if (this.priorityFrom != null && this.priorityTo == null) {
      this.taskListFiltered = this.taskList.filter(x => (x.Priority >= this.priorityFrom));
    } else if (this.priorityFrom == null && this.priorityTo != null) {
      this.taskListFiltered = this.taskList.filter(x => (x.Priority <= this.priorityTo));
    } else {
      this.taskListFiltered = this.taskList;
    }
  }

  SearchByDate() {

    console.log(this.taskList)

    this.startDate = this.startDate == null ? null : (this.startDate.toString() == "" ? null : this.startDate);
    this.endDate = this.endDate == null ? null : (this.endDate.toString() == "" ? null : this.endDate);

    if (this.startDate != null && this.endDate != null && this.endDate >= this.startDate) {
      this.taskListFiltered = this.taskList.filter(x => (x.StartDate.toString().slice(0, 10) == this.startDate.toString() && x.EndDate.toString().slice(0, 10) == this.endDate.toString()));
    } else if (this.startDate != null && this.endDate == null) {
      this.taskListFiltered = this.taskList.filter(x => (x.StartDate.toString().slice(0, 10)) == this.startDate.toString());
    } else if (this.startDate == null && this.endDate != null) {
      this.taskListFiltered = this.taskList.filter(x => (x.EndDate.toString().slice(0, 10)) == this.endDate.toString());
    } else {
      this.taskListFiltered = this.taskList;
    }
  }


  EditTask(data: any) {

    var taskId = data.Task_ID;
    this._router.navigateByUrl('/Edit/' + taskId);
  }

  EndTask(data: any) {
    this._service.EndTask(data.Task_ID).subscribe((res: Response) => {
      this.response = res.json();
      if (this.response == true) {
        data.IsTaskEnded = 1;
      } else {
        alert("Error in ending task");
      }
    }, (error) => {
      console.log("Error While Processing Results");
    });
  }

  AddTask() {
    this._service.taskList = this.taskList;
    this._router.navigateByUrl('/Add');
  }

  ViewTask() {
    this._router.navigateByUrl('');
  }

}
