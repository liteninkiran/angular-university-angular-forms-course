import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { courseTitleValidator } from '../../validators/course-title.validator';

@Component({
    selector: 'create-course-step-1',
    templateUrl: './create-course-step-1.component.html',
    styleUrls: ['./create-course-step-1.component.scss'],
})
export class CreateCourseStep1Component implements OnInit {

    public validatorDefs = {
        title: {
            minLength: 5,
            maxLength: 60,
        }
    }

    private formControlDefs: IFormControlDef = {
        title: {
            validators: [
                Validators.required,
                Validators.minLength(this.validatorDefs.title.minLength),
                Validators.maxLength(this.validatorDefs.title.maxLength),
            ],
            asyncValidators: [
                courseTitleValidator(this.coursesService),
            ],
            updateOn: 'blur',
        },
        releaseDate: {
            validators: [
                Validators.required,
            ],
        },
    }

    private formControls = {
        title: ['', this.formControlDefs.title],
        releaseDate: [new Date(), this.formControlDefs.releaseDate],
    }

    public form: FormGroup<IFormGroupDef> = this.fb.group(this.formControls);

    get courseTitle() {
        return this.form.controls['title'];
    }

    constructor(
        private fb: FormBuilder,
        private coursesService: CoursesService,
    ) {

    }

    public ngOnInit(): void {

    }
}

interface IFormControlDef {
    title: AbstractControlOptions;
    releaseDate: AbstractControlOptions;
}

interface IFormGroupDef {
    title: FormControl<string>;
    releaseDate: FormControl<Date>;
}
