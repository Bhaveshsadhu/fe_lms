import useForm from '../../hooks/useForm.js';
// const initialState = {}
// const { form, setForm, handleOnChange } = useForm(initialState);
export const signUpInputes = [{
    label: "First Name *",
    name: "fname",
    type: "text",
    placeholder: "Enter Your Name",
    required: true,
    // value: ""
},
{
    label: "Last Name",
    type: "text",
    required: true,
    placeholder: "Enter Your Last Name",
    name: "lname",
    // value: form.lname
},
{
    label: "Email *",
    type: "email",
    required: true,
    placeholder: "Enter Your Email",
    name: "email",
    // value: form.email
},
{
    label: "Phone Number",
    type: "number",
    placeholder: "Enter Your Number",
    name: "phone",
    // value: form.phone
},
{
    label: "Password*",
    type: "password",
    placeholder: "XXX-XXX-XXX",
    name: "password",
    required: true,
    // value: form.password
},
{
    label: "Confirm Password",
    type: "password",
    placeholder: "XXX-XXX-XXX",
    name: "confirmpassword",
    required: true,
    // value: form.confirmpassword
},
];