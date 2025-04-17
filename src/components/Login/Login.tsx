import { Button } from "@common/Button"
import { Input } from "@common/Input"
import { dictionary } from "@i18n/strings"
import { Link, useNavigate } from "react-router-dom"
import { login } from "@api"
import { useInputHandler, useLoggedIn } from "@hooks"
import { FormWrapperStyled } from "@common/Styled"

export const Login = () => {
  const { formData, onChange } = useInputHandler({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const isAuthorized = useLoggedIn();
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
        <form onSubmit={(e) => submitForm(e)}>

          <Input
            placeholderText="Input email"
            labelText={dictionary.inputLabelEmail}
            type="text"
            name="email"
            onChange={onChange}
            required={true}
            value={formData.email}
          />
          <Input
            placeholderText="Input password"
            labelText={dictionary.inputLabelPassword}
            type="password"
            name="password"
            onChange={onChange}
            required={true}
            value={formData.password}
          />
          <Button
            buttonText={dictionary.buttonLogin}
            type="submit"
          />

          <p>{dictionary.registerIfNoAccount}
            <Link to={'/registration'}>{dictionary.linkRegistration}</Link>
          </p>
        </form>
      </FormWrapperStyled>
    </>
  )
}