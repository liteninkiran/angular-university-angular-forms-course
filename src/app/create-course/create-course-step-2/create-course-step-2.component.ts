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
    }
    private formControls = {
        courseType: ['premium', this.formControlDefs.courseType],
    }
    public form: FormGroup<IFormGroupDef> = this.fb.group(this.formControls);

    constructor(
        private fb: FormBuilder,
    ) {

    }

    public ngOnInit(): void {

    }
}

interface IFormControlDef {
    courseType: AbstractControlOptions;
}

interface IFormGroupDef {
    courseType: FormControl<string>;
}
