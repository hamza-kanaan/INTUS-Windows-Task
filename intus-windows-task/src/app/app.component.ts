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
  rectangle: Rectangle = {
    left: 0,
    top: 0,
    width: 0,
    height: 0
  };
  language: any;

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

  getRectangle() {
    this.apiService.getRectangle().subscribe(data => {
      this.rectangle = data.result;
      setTimeout(function () {
        WrapWithMoveAndResizeTool("#rectangleSvg");
        $(document).trigger("mousemove");
      }, 50);
    });
  }

  @HostListener('document:mousemove', ['$event'])
  OnMouseMove(event: any) {
    this.rectangle.width = $("#rectangleSvg").width();
    this.rectangle.height = $("#rectangleSvg").height();
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
          this.getRectangle();
        } else {
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
          let input: | Rectangle = {
            left: Math.floor($("#rectangleSvg").parent().parent()[0].offsetLeft) + 8,
            top: Math.floor($("#rectangleSvg").parent().parent()[0].offsetTop) + 8,
            width: $("#rectangleSvg").width(),
            height: $("#rectangleSvg").height()
          }
          this.apiService.updateRectangle(input).subscribe(data => {
          });
        } else {
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