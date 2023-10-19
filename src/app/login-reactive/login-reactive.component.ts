import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';

interface IFormControlDef {
    email: AbstractControlOptions;
    password: AbstractControlOptions;
}

interface IFormGroupDef {
    email: FormControl<string>;
    password: FormControl<string>;
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
        email: ['', this.formControlDefs.email],
        password: ['', this.formControlDefs.password],
    }

    public form: FormGroup<IFormGroupDef> = this.fb.group(this.formControls);

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
        const val = this.form.value;
    }

    public reset(): void {
        this.form.reset();
    }
}
