export default function validationRegister(values) {

    let errors = {};

    // Validate Username mandatory
    if(!values.username.trim()) {
        errors.username = "User is required";
    }

    // Validate Email mandatory and pattern
    if(!values.email) {
        errors.email = "Email is required";
    } else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) ) {
        errors.email = "Invalid email"
    }

    // Validate password mandatory and min chars
    if(!values.password.trim()) {
        errors.password = "Password is required";
    } else if( values.password.length < 6 ) {
        errors.password = "The password must be at least 6 characters long"
    }

    return errors;
}