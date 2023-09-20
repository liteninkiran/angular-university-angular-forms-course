import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';

@Component({
    selector: 'login',
    templateUrl: './login-reactive.component.html',
    styleUrls: ['./login-reactive.component.css'],
})
export class LoginReactiveComponent implements OnInit {

    public form: FormGroup;
    public formGroup: IFormGroupDef = {} as IFormGroupDef;

    get email() {
        return this.form.controls['email'];
    }

    get password() {
        return this.form.controls['password'];
    }

    constructor(
        private fb: FormBuilder
    ) {

    }

    public ngOnInit(): void {
        this.setupForm();
    }

    private setupForm(): void {
        this.setFormGroup();
        this.setForm();
    }

    private setFormGroup(): void {
        this.formGroup = {
            email: ['', {
                validators: [
                    Validators.required,
                    Validators.email,
                ],
                updateOn: 'blur',
            }],
            password: ['', {
                validators: [
                    Validators.required,
                    Validators.minLength(8),
                    createPasswordStrengthValidator(),
                ],
            }],
        }
    }

    private setForm(): void {
        this.form = this.fb.group(this.formGroup);
    }
}

interface IFormGroupDef {
    email: [string, FormControlOptions],
    password: [string, FormControlOptions],
}
