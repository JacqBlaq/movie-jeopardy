import { Component, Input, OnInit } from '@angular/core';




@Component({
  selector: 'jeo-container',
  templateUrl: './jeo-container.component.html'
})
export class JeoContainerComponent implements OnInit {

  @Input() title: string = '';
  @Input() size: 'large' | 'medium' | 'small' = 'large';


  constructor() { }

  ngOnInit(): void {
  }

}
