import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpResponse, HttpHandler } from "@angular/common/http";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class MainInterceptor implements HttpInterceptor {
    constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private translate: TranslateService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show();
        if(this.translate.currentLang){
            req = req.clone({headers: req.headers.set('Accept-Language', this.translate.currentLang)});
        }
        return next.handle(req).pipe(tap(async (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.spinner.hide();
                if (event.ok && event.body.message) {
                    this.toastr.success(event.body.message);
                }
            }
        },
            (error) => {
                this.spinner.hide();
                if (error) {
                    if (error.error) {
                        if (error.error.message) {
                            if (error.status == 500) {
                                this.toastr.error(error.error.message);
                            }
                            else {
                                this.toastr.info(error.error.message);
                            }
                            return;
                        }
                    }
                    this.toastr.error(error.message);
                    return;
                }
            }));
    }
}