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
        },
        longDescription: {
            minLength: 3,
        },
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
        downloadsAllowed: {
            validators: [
                Validators.required,
            ],
        },
        longDescription: {
            validators: [
                Validators.required,
                Validators.minLength(this.validatorDefs.longDescription.minLength),
            ],
        },
        category: {
            validators: [
                Validators.required,
            ],
        },
        address: {
            validators: [
                Validators.required,
            ],
        },
    }
    private formControls = {
        title: ['', this.formControlDefs.title],
        releaseDate: [new Date(), this.formControlDefs.releaseDate],
        downloadsAllowed: [false, this.formControlDefs.downloadsAllowed],
        longDescription: ['', this.formControlDefs.longDescription],
        category: ['BEGINNER', this.formControlDefs.category],
        address: [null as IAddress, this.formControlDefs.address],
    }
    public form: FormGroup<IFormGroupDef> = this.fb.group(this.formControls);

    public courseCategories$: Observable<ICourseCategory[]>;
    public courseTitle = this.form.get('title');
    public courseLongDescription = this.form.get('longDescription');

    constructor(
        private fb: FormBuilder,
        private coursesService: CoursesService,
    ) {

    }

    public ngOnInit(): void {
        this.courseCategories$ = this.coursesService.findCourseCategories();
        this.setFormValues();
        this.watchForm();
    }

    public watchForm(): void {
        this.form.valueChanges.pipe(
            filter(() => this.form.valid)
        ).subscribe((value) => localStorage.setItem('STEP_1', JSON.stringify(value)));
    }

    public setFormValues(): void {
        const draft = localStorage.getItem('STEP_1');
        if (draft) {
            this.form.setValue(JSON.parse(draft));
        }
    }

    public onFocus(event: FocusEvent): void {
        switch ((event.target as HTMLElement).attributes['formcontrolname'].value) {
            case 'title': return this.courseTitle.setErrors(null);
            case 'longDescription': return this.courseLongDescription.setErrors(null);
        }
    }
}

interface IFormControlDef {
    title: AbstractControlOptions;
    releaseDate: AbstractControlOptions;
    downloadsAllowed: AbstractControlOptions;
    longDescription: AbstractControlOptions;
    category: AbstractControlOptions;
    address: AbstractControlOptions;
}

interface IFormGroupDef {
    title: FormControl<string>;
    releaseDate: FormControl<Date>;
    downloadsAllowed: FormControl<boolean>;
    longDescription: FormControl<string>;
    category: FormControl<string>;
    address: FormControl<IAddress>;
}

interface ICourseCategory {
    code: string;
    description: string;
}

interface IAddress {
    addressLine1: string;
    addressLine2: string;
    zipCode: string;
    city: string;
}
