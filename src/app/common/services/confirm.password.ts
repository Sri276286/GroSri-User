import { AbstractControl } from '@angular/forms';

export function ConfirmPasswordValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
        const confirm_password = control.value;

        const passControl = control.root.get('password'); // magic is this
        if (passControl) {
            const passValue = passControl.value;
            if (passValue !== confirm_password || passValue === '') {
                return {
                    isError: true
                };
            }
        }
    }

    return null;
}
