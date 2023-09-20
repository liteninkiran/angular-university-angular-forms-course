import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    public val = {
        email: 'hello@gmail.com',
        password: '123456',
    };

    constructor() {

    }

    public ngOnInit(): void {

    }

    public login(loginForm: NgForm, submit): void {
        console.log(loginForm.value, loginForm.valid, submit);
        console.log('val', this.val);
    }
}
