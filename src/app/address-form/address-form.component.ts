import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    FormBuilder, FormGroup,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    Validator,
    Validators
} from '@angular/forms';
import { noop, Subscription } from 'rxjs';

@Component({
    selector: 'address-form',
    templateUrl: './address-form.component.html',
    styleUrls: ['./address-form.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: AddressFormComponent,
        },
    ],
})
export class AddressFormComponent implements ControlValueAccessor, OnDestroy {

    @Input() public legend: string;

    public form: FormGroup = this.fb.group({
        addressLine1: [null, [Validators.required]],
        addressLine2: [null, [Validators.required]],
        zipCode: [null, [Validators.required]],
        city: [null, [Validators.required]],
    });

    public onChangeSub: Subscription;
    public onTouched = () => {};

    constructor(
        private fb: FormBuilder
    ) {

    }

    public ngOnDestroy(): void {
        this.onChangeSub.unsubscribe();
    }

    public writeValue(value: any): void {
        if (value) {
            this.form.setValue(value);
        }
    }

    public registerOnChange(onChange: any): void {
        this.onChangeSub = this.form.valueChanges.subscribe(onChange);
    }

    public registerOnTouched(onTouched: any): void {
        this.onTouched = onTouched;
    }

    public setDisabledState?(disabled: boolean): void {
        if (disabled) {
            this.form.disable();
        } else {
            this.form.enable();
        }
    }
}
