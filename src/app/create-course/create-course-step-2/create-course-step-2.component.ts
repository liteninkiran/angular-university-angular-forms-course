import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'create-course-step-2',
    templateUrl: 'create-course-step-2.component.html',
    styleUrls: ['create-course-step-2.component.scss'],
})
export class CreateCourseStep2Component implements OnInit {

    public validatorDefs = {
        title: {
            minLength: 5,
            maxLength: 60,
        },
    }
    private formControlDefs: IFormControlDef = {
        courseType: {
            validators: [
                Validators.required,
            ],
        },
        price: {
            validators: [
                Validators.required,
                Validators.min(1),
                Validators.max(9999),
                Validators.pattern('[0-9]+'),
            ],
        },
        promoStart: {
            validators: [ ],
        },
        promoEnd: {
            validators: [ ],
        },
    }
    private formControls = {
        courseType: ['premium', this.formControlDefs.courseType],
        price: [null as number, this.formControlDefs.price],
        promoStart: [null as Date, this.formControlDefs.promoStart],
        promoEnd: [null as Date, this.formControlDefs.promoEnd],
    }
    public form: FormGroup<IFormGroupDef> = this.fb.group(this.formControls);
    public priceControl = this.form.get('price');
    private price: number;

    constructor(
        private fb: FormBuilder,
    ) {

    }

    public ngOnInit(): void {
        this.watchFormValue();
    }

    public watchFormValue(): void {
        const options = { emitEvent: false }
        this.form.valueChanges.subscribe((value) => {
            console.log(value);
            if (value.courseType === 'free' && this.priceControl.enabled) {
                this.price = value.price;
                this.priceControl.setValue(null, options);
                this.priceControl.disable(options);
            } else if (value.courseType === 'premium' && this.priceControl.disabled) {
                this.priceControl.setValue(this.price, options);
                this.priceControl.enable(options);
            }
        });
    }
}

interface IFormControlDef {
    courseType: AbstractControlOptions;
    price: AbstractControlOptions;
    promoStart: AbstractControlOptions;
    promoEnd: AbstractControlOptions;
}

interface IFormGroupDef {
    courseType: FormControl<string>;
    price: FormControl<number>;
    promoStart: FormControl<Date>;
    promoEnd: FormControl<Date>;
}
