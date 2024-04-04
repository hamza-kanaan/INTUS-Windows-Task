import { Component, HostListener } from '@angular/core';
import { ApiService } from './services/api.service';
import { IRectangle } from './models/rectangle.model';

declare var $: any;
declare function WrapWithMoveAndResizeTool(name: any): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  rectangle: IRectangle = {
    left: 0,
    top: 0,
    width: 0,
    height: 0
  };
  
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getRectangle();
  }

  getRectangle() {
    this.apiService.getRectangle().subscribe(data => {
      this.rectangle = data.result;
      setTimeout(function () {
        WrapWithMoveAndResizeTool("#rectangleSvg");
      }, 500);
    });
  }

  @HostListener('document:mousemove', ['$event'])
  OnMouseMove(event: any) {
    this.rectangle.width = $("#rectangleSvg").width();
    this.rectangle.height = $("#rectangleSvg").height();
  }

  reset() {
    this.getRectangle();
  }

  save() {
    let input: | IRectangle = {
      left: Math.floor($("#rectangleSvg").parent().parent().offset().left),
      top: Math.floor($("#rectangleSvg").parent().parent().offset().top),
      width: $("#rectangleSvg").width(),
      height: $("#rectangleSvg").height()
    }
    this.apiService.updateRectangle(input).subscribe(data => {
    });
  }
}