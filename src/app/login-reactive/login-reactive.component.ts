import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';

@Component({
    selector: 'login',
    templateUrl: './login-reactive.component.html',
    styleUrls: ['./login-reactive.component.css'],
})
export class LoginReactiveComponent implements OnInit {

    public form = this.fb.group({
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
    });

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

    }

    public login() {
        const formValue = this.form.value;
        this.form.patchValue({
            
        });
    }
}
