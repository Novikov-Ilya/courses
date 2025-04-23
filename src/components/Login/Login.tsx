import { Button } from "@common/Button"
import { Input } from "@common/Input"
import { dictionary } from "@i18n/strings"
import { Link, useNavigate } from "react-router-dom"
import { login } from "@api"
import { useFormValidate, useInputHandler } from "@hooks"
import { FormWrapperStyled, SimpleFormStyled } from "@common/Styled"
import { setAuthData } from "@utils"
import { useState } from "react"

const formFieldsInitValue = {
  email: '',
  password: ''
}

const formFieldsInitError = {
  email: false,
  password: false
}

export const Login = () => {
  const { formData, onChange } = useInputHandler(formFieldsInitValue);
  const { inputError, onBlur } = useFormValidate(formFieldsInitError);
  const [loginError, setLoginError] = useState<string | null>(null)
  const navigate = useNavigate();

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    const loginResult = await login(event, formData);
    if (loginResult?.successful && loginResult.result) {
      setAuthData(loginResult.result, loginResult.user?.name);
      navigate('/courses');
    } else {
      setLoginError(loginResult.toString());
    }
  }

  return (
    <>
      <h1>Login</h1>
      <FormWrapperStyled>
        <SimpleFormStyled onSubmit={submitForm} noValidate>

          <Input
            placeholderText="Input email"
            labelText={dictionary.inputLabelEmail}
            type="text"
            name="email"
            id="email"
            onChange={onChange}
            required={true}
            value={formData.email}
            isError={inputError.email}
            onBlur={onBlur}
          />
          <Input
            placeholderText="Input password"
            labelText={dictionary.inputLabelPassword}
            type="password"
            name="password"
            id="password"
            onChange={onChange}
            required={true}
            value={formData.password}
            isError={inputError.password}
            onBlur={onBlur}
          />
          <span className="form__error-message">{loginError}</span>
          <Button
            buttonText={dictionary.buttonLogin}
            type="submit"
          />

          <p>{dictionary.registerIfNoAccount}
            <Link to={'/registration'}>{dictionary.linkRegistration}</Link>
          </p>
        </SimpleFormStyled>
      </FormWrapperStyled>
    </>
  )
}