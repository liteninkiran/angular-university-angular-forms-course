import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: 'stepper-buttons',
    templateUrl: 'stepper-buttons.component.html',
    styleUrls: ['stepper-buttons.component.scss'],
})
export class StepperButtonsComponent implements OnInit {

    private defaultConfig: IStepButtonConfig = {
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

    @Input() public config: IStepButtonConfig = this.defaultConfig;
    @Input() public disabled = false;
    @Input() public lastStep = false;

    @Output() onSubmitClick = new EventEmitter<void>();

    constructor() {

    }

    public ngOnInit(): void {
        this.config = { ...this.defaultConfig, ...this.config }
    }

    public submit() {
        this.onSubmitClick.emit();
    }
}

export interface IStepButtonConfig {
    prev?: IButtonConfig,
    next?: IButtonConfig,
}

interface IButtonConfig {
    text?: string;
    startIcon?: string;
    endIcon?: string;
}
