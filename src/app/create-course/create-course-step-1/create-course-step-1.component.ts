import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'create-course-step-1',
    templateUrl: './create-course-step-1.component.html',
    styleUrls: ['./create-course-step-1.component.scss'],
})
export class CreateCourseStep1Component implements OnInit {

    public validators = {
        title: {
            minLength: 5,
            maxLength: 60,
        }
    }

    public form = this.fb.group({
        title: ['', [
            Validators.required,
            Validators.minLength(this.validators.title.minLength),
            Validators.maxLength(this.validators.title.maxLength),
        ]],
    });

    constructor(
        private fb: FormBuilder,
    ) {

    }

    public ngOnInit(): void {

    }
}
