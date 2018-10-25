import { TestBed, inject } from '@angular/core/testing';
import { SharedService } from './shared.service';

import { Injectable } from '@angular/core';
import { taskData, Task } from '../Models/task';
import {HttpModule} from '@angular/http';
import {RouterTestingModule} from '@angular/router/testing'
import { FormsModule } from '@angular/forms';

describe('SharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedService],
      imports : [FormsModule,RouterTestingModule,HttpModule]

    });
  });

  it('should be created', inject([SharedService], (service: SharedService) => {
    expect(service).toBeTruthy();
  }));
});
