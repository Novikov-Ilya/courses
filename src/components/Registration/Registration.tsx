import { Button } from "@common/Button"
import { Input } from "@common/Input"
import { dictionary } from "@i18n/strings"
import { Link, useNavigate } from "react-router-dom"
import { useInputHandler, useFormValidate } from "@hooks"
import { createUser } from "@services"
import { FormWrapperStyled, SimpleFormStyled } from "@common/Styled"
import { useState } from "react"

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
  const [registerError, setRegisterError] = useState<string | null>(null)
  const navigate = useNavigate();

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createUser(formData);
      navigate('/login');
    
    } catch (error) {
      setRegisterError((error as Error).message);
    }
  }

  return (
    <>
      <h1>Registration</h1>
      <FormWrapperStyled>
        <SimpleFormStyled onSubmit={submitForm} noValidate>

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
          <span className="form__error-message">{registerError}</span>
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