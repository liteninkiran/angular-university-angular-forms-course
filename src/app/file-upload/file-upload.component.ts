import { Component, Input } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { noop, of } from 'rxjs';

@Component({
    selector: 'file-upload',
    templateUrl: 'file-upload.component.html',
    styleUrls: ['file-upload.component.scss'],
})
export class FileUploadComponent {

    @Input() public requiredFileType: string;

    public fileName: string = '';
    public fileUploadError = false;
    public uploadProgress: number;

    constructor(
        private http: HttpClient,
    ) {

    }

    public onFileSelected(event: Event) {
        const target: HTMLInputElement = event.target as HTMLInputElement;
        const file: File = target.files[0];
        if (!file) {
            return;
        }
        this.fileName = file.name;
        const formData = new FormData();
        formData.append('thumbnail', file);
        const url = '/api/thumbnail-upload';
        const options: any = {
            observe: 'events',
            reportProgress: true,
        }
        this.fileUploadError = false;
        this.http
            .post(url, formData, options)
            .pipe(
                catchError((err) => {
                    this.fileUploadError = true;
                    return of(err);
                }),
                finalize(() => this.uploadProgress = null)
            )
            .subscribe(event => {
                if (event.type === HttpEventType.UploadProgress) {
                    this.uploadProgress = Math.round(event.loaded / event.total * 100);
                }
            });
    }
}
