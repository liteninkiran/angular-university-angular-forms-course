import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'create-course-step-3',
    templateUrl: 'create-course-step-3.component.html',
    styleUrls: ['create-course-step-3.component.scss'],
})
export class CreateCourseStep3Component implements OnInit {

    public form = this.fb.group({
        lessons: this.fb.array([]),
    });

    public lessons: FormArray = this.form.controls['lessons'];

    // get lessons() {
    //     return this.form.controls['lessons'] as FormArray;
    // }

    constructor(
        private fb: FormBuilder,
    ) {

    }

    public ngOnInit(): void {

    }

    public addLesson(): void {
        const lessonForm = this.fb.group({
            title: ['', Validators.required],
            level: ['beginner', Validators.required],
        });
        this.lessons.push(lessonForm);
    }

    public deleteLesson(index: number): void {
        this.lessons.removeAt(index);
    }
}
