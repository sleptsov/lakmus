import { NgModule, Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input() isLoading: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}

@NgModule({
  imports: [CommonModule],
  exports: [LoaderComponent],
  declarations: [LoaderComponent],
  providers: [],
})
export class LoaderModule { }

