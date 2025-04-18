import { Button } from "@common/Button"
import { Input } from "@common/Input"
import { dictionary } from "@i18n/strings"
import { Link, useNavigate } from "react-router-dom"
import { useInputHandler, useFormValidate } from "@hooks"
import { register } from "@api"
import { FormWrapperStyled, SimpleFormStyled } from "@common/Styled"

const formFieldsInitValue = {
  name: '',
  email: '',
  password: ''
}

const formFieldsErrors = {
  name: false,
  email: false,
  password: false
}

export const Registration = () => {
  const { formData, onChange } = useInputHandler(formFieldsInitValue);
  const { inputError, onBlur } = useFormValidate(formFieldsErrors);
  const navigate = useNavigate();

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    const registerResult = await register(event, formData);
    if (registerResult?.successful) {
      navigate('/login')
    } else {
      console.log(registerResult?.errors);
    }
  }

  return (
    <>
      <h1>Registration</h1>
      <FormWrapperStyled>
        <SimpleFormStyled onSubmit={submitForm}>

          <Input
            placeholderText="Input name"
            labelText={dictionary.inputLabelName}
            type="text"
            required={true}
            name="name"
            onChange={onChange}
            value={formData.name}
            isError={inputError.name}
            onBlur={onBlur}
          />
          <Input
            placeholderText="Input Email"
            labelText={dictionary.inputLabelEmail}
            type="email"
            required={true}
            name="email"
            onChange={onChange}
            value={formData.email}
            isError={inputError.email}
            onBlur={onBlur}
          />
          <Input
            placeholderText="Input password"
            labelText={dictionary.inputLabelPassword}
            type="password"
            required={true}
            name="password"
            onChange={onChange}
            value={formData.password}
            isError={inputError.password}
            onBlur={onBlur}
          />
          <Button
            buttonText={dictionary.buttonRegister}
            type="submit"
          />
          <p>{dictionary.loginIfHaveAccount}
            <Link to={'/login'}>{dictionary.linkLogin}</Link>
          </p>
        </SimpleFormStyled>
      </FormWrapperStyled>
    </>
  )
}