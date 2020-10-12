import { useState, useEffect } from 'react';

const useValidation = (initialState, validate, fn) => {

    const [ values, setValues ] = useState(initialState);
    const [ errors, setErrors ] = useState({});
    const [ submitForm, setSubmitForm ] = useState(false);

    useEffect(() => {
        if(submitForm) {
            const noErrors = Object.keys(errors).length === 0;

            if(noErrors) {
                fn();
            }
            setSubmitForm(false);
        }
    }, [errors]);

    // On Change
    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name] : e.target.value
        })
    }

    // On Submit
    const handleSubmit = e => {
        e.preventDefault();
        const validateFields = validate(values);
        setErrors(validateFields);
        setSubmitForm(true);
    }

    // On Blur
    const handleBlur = () => {        
        const validateFields = validate(values);
        setErrors(validateFields);
    }
    return {
        values, 
        errors,
        handleSubmit,
        handleChange,
        handleBlur
    }
}
 
export default useValidation;