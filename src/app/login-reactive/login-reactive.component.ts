import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';

@Component({
    selector: 'login',
    templateUrl: './login-reactive.component.html',
    styleUrls: ['./login-reactive.component.css'],
})
export class LoginReactiveComponent implements OnInit {

    public form: FormGroup;

    public formOptions: IFormOptionsDef = {} as IFormOptionsDef;
    public formControls: IFormControlsDef = {} as IFormControlsDef;

    constructor() {

    }

    public ngOnInit(): void {
        this.setupForm();
    }

    private setupForm(): void {
        this.setFormOptions();
        this.setFormControls();
        this.setForm();
    }

    private setFormOptions(): void {
        this.formOptions = {
            email: {
                initialValue: 'me@domain.com',
                options: {
                    validators: [
                        Validators.required,
                        Validators.email,
                    ],
                    updateOn: 'blur',
                },
            },
            password: {
                initialValue: 'pa55word',
                options: {
                    validators: [
                        Validators.required,
                        Validators.minLength(8),
                        createPasswordStrengthValidator(),
                    ],
                },
            },
        }
    }

    private setFormControls(): void {
        this.formControls = {
            email: new FormControl(this.formOptions.email.initialValue, this.formOptions.email.options),
            password: new FormControl(this.formOptions.password.initialValue, this.formOptions.password.options),
        }
    }

    private setForm(): void {
        this.form = new FormGroup(this.formControls);
    }
}

interface IFormOptionsDef {
    email: {
        initialValue: string,
        options: FormControlOptions,
    },
    password: {
        initialValue: string,
        options: FormControlOptions,
    },
}

interface IFormControlsDef {
    email: FormControl,
    password: FormControl,
}
