import { useState } from "react";

const handleOnChange = ({ e, form, setForm }) => {
    const { name, value } = e.target;

    setForm({
        ...form,
        [name]: value,
    })
    const formValidation = e.target;
    if (!formValidation.checkValidity()) {
        formValidation.reportValidity();
        return;
    }

}

const useForm = (initialState) => {
    const [form, setForm] = useState(initialState);

    return {
        form,
        setForm,
        handleOnChange: (e) => handleOnChange({ e, form, setForm })
    }
}

export default useForm;