import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss','../../../app.component.scss']
})
export class AboutComponent implements OnInit{
  experience: number = 0;
  seniority: number = 0;

  constructor() {
  }

  ngOnInit() {
    let current = new Date();
    const start = 2004;
    const fullstack = 2012;

    this.experience = current.getUTCFullYear()-start;
    this.seniority = current.getUTCFullYear()-fullstack;


  }
}
