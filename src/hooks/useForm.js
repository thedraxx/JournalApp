import { useEffect, useMemo, useState } from 'react';

//Recibe el initialForm y la validacion del formulario
export const useForm = (initialForm = {}, formValidations = {}) => {

    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({});

    //Cada vez que cambia algun campo del formulario se ejectuta el useEffect
    useEffect(() => {
        createValidators()
    }, [formState])

    // Con el UseMemo memoriza el valor que retorne esto
    const isFormValid = useMemo(() => {
        // Recorremos el objeto de formValidation
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }
        return true;

    }, [formValidation])

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    // Esto crea los validadores
    const createValidators = () => {
        const formCheckedValued = {};
        // Recorremos el objeto de formValidations
        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField];
            formCheckedValued[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }
        setFormValidation(formCheckedValued);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
}