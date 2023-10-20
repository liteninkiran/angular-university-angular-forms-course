import { Component, Input } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { noop, of } from 'rxjs';

@Component({
    selector: 'file-upload',
    templateUrl: 'file-upload.component.html',
    styleUrls: ['file-upload.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: FileUploadComponent,
        },
    ],
})
export class FileUploadComponent implements ControlValueAccessor {

    @Input() public requiredFileType: string;

    public fileName: string = '';
    public fileUploadError = false;
    public uploadProgress: number;
    public onChange: Function = (fileName: string) => {};
    public onTouched: Function = () => {};
    public disabled: boolean = false;

    constructor(
        private http: HttpClient,
    ) {

    }

    public writeValue(value: string): void {
        this.fileName = value;
    }

    public registerOnChange(onChange: Function): void {
        this.onChange = onChange;
    }

    public registerOnTouched(onTouched: any): void {
        this.onTouched = onTouched;
    }

    public setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
    }

    public onClick(fileUploadEl: HTMLInputElement): void {
        this.onTouched();
        fileUploadEl.click();
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
                } else if (event.type === HttpEventType.Response) {
                    this.onChange(this.fileName);
                }
            });
    }
}
