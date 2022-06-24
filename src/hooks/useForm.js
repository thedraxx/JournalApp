import { useEffect, useState } from 'react';

//Recibe el initialForm y la validacion del formulario
export const useForm = (initialForm = {}, formValidations = {}) => {

    const [formState, setFormState] = useState(initialForm);

    const [formValidation, setFormValidation] = useState({});

    //Cada vez que cambia algun campo del formulario se ejectuta el useEffect
    useEffect(() => {
        createValidators()
    }, [formState])

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

    const createValidators = () => {
        const formCheckedValued = {};
        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage = 'Este Campo es Requerido'] = formValidations[formField];
            formCheckedValued[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }
        setFormValidation(formCheckedValued);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation
    }
}