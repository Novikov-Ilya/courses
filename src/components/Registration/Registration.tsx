import { Button } from "@common/Button"
import { Input } from "@common/Input"
import { dictionary } from "@i18n/strings"
import { Link, useNavigate } from "react-router-dom"
import { StyledRegistrationForm } from "./styled"
import { useInputHandler, useFormValidate } from "@hooks"
import { register } from "@api"

export const Registration = () => {
  const { formData, onChange } = useInputHandler({
    name: '',
    email: '',
    password: ''
  });
  const { inputError, onBlur } = useFormValidate();
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
      <StyledRegistrationForm onSubmit={(e) => submitForm(e)}>
        <Input
          placeholderText="Input name"
          labelText={dictionary.inputLabelName}
          type="text"
          required={true}
          name="name"
          onChange={onChange}
          value={formData.name}
          isError={inputError.name}
          onBlur={(e) => onBlur(e)}
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
          onBlur={(e) => onBlur(e)}
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
          onBlur={(e) => onBlur(e)}
        />
        <Button
          buttonText={dictionary.buttonRegister}
          type="submit"
        />

        <p>{dictionary.loginIfHaveAccount}
          <Link to={'/login'}>{dictionary.linkLogin}</Link>
        </p>
      </StyledRegistrationForm>
    </>
  )
}