export default function validationLogIn(values) {

    let errors = {};

    // Validate Email mandatory and pattern
    if(!values.email) {
        errors.email = "Email required";
    } else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) ) {
        errors.email = "Email no válido"
    }

    // Validate password mandatory and min chars
    if(!values.password) {
        errors.password = "Password required";
    } else if( values.password.length < 6 ) {
        errors.password = "The password must contain at least 6 characters"
    }

    return errors;
}