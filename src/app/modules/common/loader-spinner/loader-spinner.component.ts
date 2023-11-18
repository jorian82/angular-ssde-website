import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader-spinner',
  templateUrl: './loader-spinner.component.html',
  styleUrls: ['./loader-spinner.component.scss']
})
export class LoaderSpinnerComponent implements OnInit {

  constructor( public loader: LoaderService) { }

  ngOnInit(): void {
  }

}
