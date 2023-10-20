import { Component, Input } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
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
        this.fileUploadError = false;
        this.http
            .post('/api/thumbnail-upload', formData)
            .pipe(
                catchError((err) => {
                    this.fileUploadError = true;
                    return of(err);
                })
            )
            .subscribe();
    }
}
