import { Component, HostListener } from '@angular/core';
import { ApiService } from './services/api.service';
import { Rectangle } from './models/rectangle.model';
import swal from 'sweetalert';
import { TranslateService } from '@ngx-translate/core';
import { AppConfigService } from './services/app-config.service';
import { Title } from '@angular/platform-browser';

declare var $: any;
declare function WrapWithMoveAndResizeTool(name: any): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  language: any;
  extraRectangleToContainer = 8;

  constructor(private apiService: ApiService, public translate: TranslateService, private titleService: Title, private appConfig: AppConfigService) {
    this.language = this.appConfig.data.languages[1];
    translate.addLangs(appConfig.data.languages);
    translate.setDefaultLang(appConfig.data.defaultLanguage);
    this.translate.use(appConfig.data.defaultLanguage).subscribe(data => {
      this.language = this.translate.instant('Language');
      this.titleService.setTitle(this.translate.instant('Title'));
    });
  }

  ngOnInit() {
    this.getRectangle();
  }

  public get rectangleWidth() {
    return $("#rectangleSvg").width();
  }

  public get rectangleHeight() {
    return $("#rectangleSvg").height();
  }

  public get initialRectangle() {
    return JSON.parse(localStorage.getItem("rectangle") || '{}');
  }

  public set initialRectangle(value: Rectangle) {
    localStorage.setItem("rectangle", JSON.stringify(value));
  }

  public get rectangleContainer() {
    let rectangleContainer = {
      left: Math.floor($("#rectangleSvg").parent().parent()[0].offsetLeft),
      top: Math.floor($("#rectangleSvg").parent().parent()[0].offsetTop)
    };
    return rectangleContainer;
  }

  public set rectangleContainer(rectangle: any) {
    $("#rectangleSvg").parent().parent().css("left", rectangle.left - this.extraRectangleToContainer);
    $("#rectangleSvg").parent().parent().css("top", rectangle.top - this.extraRectangleToContainer);
  }

  getRectangle() {
    this.apiService.getRectangle().subscribe(data => {
      this.initialRectangle = data.result;
      $("#rectangleSvg").width(data.result.width);
      $("#rectangleSvg").height(data.result.height);
      $("#rectangleSvg").css("left", data.result.left);
      $("#rectangleSvg").css("top", data.result.top);
      WrapWithMoveAndResizeTool("#rectangleSvg");
    });
  }

  reset() {
    swal({
      title: this.translate.instant('Confirmation'),
      text: this.translate.instant('Message_ConfirmReset'),
      icon: "warning",
      buttons: {
        cancel: {
          text: this.translate.instant('Cancel'),
          value: false,
          visible: true,
          className: "btn btn-danger"
        },
        confirm: {
          text: this.translate.instant('Confirm'),
          value: true,
          visible: true,
          className: "btn btn-success",
          closeModal: true
        }
      }
    })
      .then((result) => {
        if (result) {
          $("#rectangleSvg").width(this.initialRectangle.width);
          $("#rectangleSvg").height(this.initialRectangle.height);
          $(document).trigger("mousemove");
          this.rectangleContainer = this.initialRectangle;
        }
      });
  }

  save() {
    swal({
      title: this.translate.instant('Confirmation'),
      text: this.translate.instant('Message_ConfirmSave'),
      icon: "warning",
      buttons: {
        cancel: {
          text: this.translate.instant('Cancel'),
          value: false,
          visible: true,
          className: "btn btn-danger"
        },
        confirm: {
          text: this.translate.instant('Confirm'),
          value: true,
          visible: true,
          className: "btn btn-success",
          closeModal: true
        }
      }
    })
      .then((result) => {
        if (result) {
          let rectangle: | Rectangle = {
            left: this.rectangleContainer.left + this.extraRectangleToContainer,
            top: this.rectangleContainer.top + this.extraRectangleToContainer,
            width: this.rectangleWidth,
            height: this.rectangleHeight
          }
          this.apiService.updateRectangle(rectangle).subscribe(data => {
          });
        }
      });
  }

  switchLang() {
    this.translate.use(this.language).subscribe(data => {
      this.language = this.translate.instant('Language');
      this.titleService.setTitle(this.translate.instant('Title'));
    });
  }
}