import { useState } from "react";


const useValidate = values => {
    const [formErrors, setFormErrors] = useState({})
    const validate = () => {
        const newErrors = {}
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!values.email){
            newErrors.email = 'Email address required'
        }else if (!regex.test(values.email)){
            newErrors.email = 'This is not a valid email address'
        }
        if (!values.password) {
          newErrors.password = "Password required";
        } else if (
          !regex.test(values.password) ||
          values.password.length < 8 ||
          values.password.length > 64
        ) {
          newErrors.password =
            "Password must be 8-64 characters long, and include uppercase, lowercase, number, and special character.";
        } else if (values.password !== values.confirmPassword) {
          newErrors.confirmPassword = "Password does not match";
        }
        
        setFormErrors(newErrors)
        return newErrors;
    }

    return [formErrors, validate]
}

export default useValidate
