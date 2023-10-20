import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'stepper-buttons',
    templateUrl: 'stepper-buttons.component.html',
    styleUrls: ['stepper-buttons.component.scss'],
})
export class StepperButtonsComponent implements OnInit {

    @Input() public config: IStepButtonConfig = {
        prev: {
            text: 'Previous',
            startIcon: 'navigate_before',
            endIcon: '',
        },
        next: {
            text: 'Next',
            startIcon: '',
            endIcon: 'navigate_next',
        },
    }

    constructor() {

    }

    public ngOnInit(): void {

    }
}

export interface IStepButtonConfig {
    prev: {
        text: string;
        startIcon: string;
        endIcon: string;
    },
    next: {
        text: string;
        startIcon: string;
        endIcon: string;
    },
}
