import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, NonNullableFormBuilder, Validators } from '@angular/forms';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';

interface IFormControlDef {
    email: AbstractControlOptions,
    password: AbstractControlOptions,
}

@Component({
    selector: 'login',
    templateUrl: './login-reactive.component.html',
    styleUrls: ['./login-reactive.component.css'],
})
export class LoginReactiveComponent implements OnInit {

    private formControlDefs: IFormControlDef = {
        email: {
            validators: [
                Validators.required,
                Validators.email,
            ],
            updateOn: 'blur',
        },
        password: {
            validators: [
                Validators.required,
                Validators.minLength(8),
                createPasswordStrengthValidator(),
            ],
        },
    }

    private formControls = {
        //email: this.fb.nonNullable.control('', this.formControlDefs.email),
        email: ['', this.formControlDefs.email],
        password: ['', this.formControlDefs.password],
    }

    public form = this.fb.group(this.formControls);

    get email() {
        return this.form.controls['email'];
    }

    get password() {
        return this.form.controls['password'];
    }

    constructor(
        private fb: NonNullableFormBuilder
    ) {

    }

    public ngOnInit(): void {

    }

    public login(): void {

    }

    public reset(): void {
        this.form.reset();
        console.log(this.form.value);
    }
}
