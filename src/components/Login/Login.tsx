import { Button } from "@common/Button"
import { Input } from "@common/Input"
import { dictionary } from "@i18n/strings"
import { Link, useNavigate } from "react-router-dom"
import { login } from "@api"
import { useFormValidate, useInputHandler, useLoggedIn } from "@hooks"
import { FormWrapperStyled, SimpleFormStyled } from "@common/Styled"

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
  const navigate = useNavigate();
  const { isAuthorized } = useLoggedIn();
  if (isAuthorized) navigate('/courses');

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    const loginResult = await login(event, formData);
    if (loginResult?.successful && loginResult.result) {
      localStorage.setItem('token', loginResult.result);
      localStorage.setItem('userName', loginResult.user?.name || '')
      navigate('/courses');
    } else {
      console.log(loginResult);
    }
  }

  return (
    <>
      <h1>Login</h1>
      <FormWrapperStyled>
        <SimpleFormStyled onSubmit={submitForm}>

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