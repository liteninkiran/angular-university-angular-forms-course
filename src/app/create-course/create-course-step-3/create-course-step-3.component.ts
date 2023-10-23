import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'create-course-step-3',
    templateUrl: 'create-course-step-3.component.html',
    styleUrls: ['create-course-step-3.component.scss'],
})
export class CreateCourseStep3Component implements OnInit {

    public form = this.fb.group({});

    constructor(
        private fb: FormBuilder,
    ) {

    }

    public ngOnInit(): void {

    }
}
