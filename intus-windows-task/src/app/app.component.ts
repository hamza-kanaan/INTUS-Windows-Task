import { AfterViewInit, Component, HostListener } from '@angular/core';
import { ApiService } from './services/api.service';
import { IRectangle } from './models/rectangle.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  rectangle: IRectangle = {
    width: 0,
    height: 0
  };
  mousedown_points: any = null;
  current_points: any;
  resize = {
    x: 190,
    y: 190
  };
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getRectangle();
  }

  getRectangle() {
    this.apiService.getRectangle().subscribe(data => {
      this.rectangle = data.result;
    });
  }

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: any) {
    if (event.target.id === 'rectangle') {
      this.mousedown_points = {
        x: event.clientX,
        y: event.clientY
      }
    }
  }

  @HostListener('document:mousemove', ['$event'])
  OnMouseMove(event: any) {
    if (this.mousedown_points) {
      this.current_points = {
        x: event.clientX,
        y: event.clientY
      }

      var w = this.rectangle.width;
      var h = this.rectangle.height;

      var dx = this.current_points.x - this.mousedown_points.x;
      var dy = this.current_points.y - this.mousedown_points.y;

      w += dx;
      h += dy;

      this.rectangle.width = w;
      this.rectangle.height = h;

      this.mousedown_points = this.current_points;
    }
  }

  @HostListener('document:mouseup', ['$event'])
  OnMouseUp(event: any) {
    this.mousedown_points = null;
  }
}