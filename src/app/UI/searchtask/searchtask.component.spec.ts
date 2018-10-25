import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { SearchtaskComponent } from './searchtask.component';
import {RouterTestingModule} from '@angular/router/testing'
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../Services/shared.service';
import {HttpModule} from '@angular/http';
import { Http, Response } from '@angular/http';

describe('SearchtaskComponent', () => {
  let component: SearchtaskComponent;
  let fixture: ComponentFixture<SearchtaskComponent>;
  let taskList : any;
  let parentList : any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchtaskComponent],
      imports: [RouterTestingModule, FormsModule, HttpModule],
      providers: [SharedService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load task list',inject([SharedService], (service : SharedService) => {
    expect(service).toBeTruthy();

    service.GetTaskList().subscribe((res: Response) => {
      taskList = res.json();
    expect(taskList.length).toBeGreaterThanOrEqual(0);
    });

    const element = fixture.nativeElement;
    fixture.detectChanges();
}));


it('should load parent list',inject([SharedService], (service : SharedService) => {
  expect(service).toBeTruthy();

  service.GetParentTask().subscribe((res: Response) => {
    parentList = res.json();
  expect(parentList.length).toBeGreaterThanOrEqual(0);
  });

  const element = fixture.nativeElement;
  fixture.detectChanges();
}));

  
});
