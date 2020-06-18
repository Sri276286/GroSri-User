export class ValidationConstants {
    static password = '^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,15}$';
    static pincode = '^[1-9][0-9]{5}$';
    static phoneNumber = '^[6-9][0-9]{9}$';
}
