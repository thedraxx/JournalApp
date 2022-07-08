import { useEffect, useMemo, useState } from 'react';

//Recibe el initialForm y la validacion del formulario
export const useForm = (initialForm = {}, formValidations = {}) => {

    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({});

    //Cada vez que cambia algun campo del formulario se ejectuta el useEffect
    useEffect(() => {
        createValidators()
    }, [formState])

    // Cada vez que cambia la nota del formulario se ejectuta el useEffect
    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm])

    // Con el UseMemo memoriza el valor que retorne esto
    const isFormValid = useMemo(() => {
        // Recorremos el objeto de formValidation
        for (const formValue of Object.keys(formValidation)) {
            // Si algun campo no es valido retorna false
            if (formValidation[formValue] !== null) return false;
        }
        // Si no hay ningun error retornamos true
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
        // Recorremos el objeto de formValidations, que es enviado desde registerPage
        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField];
            // Si el campo no es valido, lo guardamos en el objeto formCheckedValued
            // Si el campo es valido, lo guardamos en null
            // Si el campo NO es valido, lo guardamos  errorMessage
            formCheckedValued[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }
        // Guardamos el objeto formCheckedValued en el state formValidation
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