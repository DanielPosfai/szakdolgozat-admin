import { FormGroup } from '@angular/forms';


export function ConfirmedValidator(formGroup: FormGroup): any {
     
    const valuePw = formGroup.get('password').value;
    const valueCpw = formGroup.get('confirmPassword').value;
   
    return valuePw === valueCpw ? null: {ConfirmedValidator: true};

}
