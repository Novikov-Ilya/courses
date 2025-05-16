import { Button } from "@common/Button"
import { Input } from "@common/Input"
import { dictionary } from "@i18n/strings"
import { Link, useNavigate } from "react-router-dom"
import { login } from "@services"
import { useFormValidate, useInputHandler, useUser } from "@hooks"
import { WrapperStyled, SimpleFormStyled } from "@common/Styled"
import { useState } from "react"
import { InputType } from "@common/Input/types"
import { ButtonType } from "@common/Button/types"
import { PageWrapperStyled } from "@common/Styled/PageWrapper"
import { FormErrorStyled } from "@common/Styled/FormErrorStyled"
import { Align, HeadingStyled } from "@common/Styled/HeadingStyled"

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
  const { logIn } = useUser();

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const loginResult = await login(formData);
      logIn(loginResult);
      navigate('/courses');
    }
    catch (error) {
      setLoginError((error as Error).message);
    }
  }

  return (
    <PageWrapperStyled>
      <HeadingStyled align={Align.CENTER}>{dictionary.loginPageTitle}</HeadingStyled>
      <WrapperStyled>
        <SimpleFormStyled onSubmit={submitForm} noValidate>
          <Input
            placeholderText={dictionary.inputPlaceholderEmail}
            labelText={dictionary.inputLabelEmail}
            type={InputType.EMAIL}
            name={dictionary.inputNameEmail}
            id={dictionary.inputNameEmail}
            onChange={onChange}
            required
            value={formData.email}
            isError={inputError.email}
            onBlur={onBlur}
          />
          <Input
            placeholderText={dictionary.inputPlaceholderPassword}
            labelText={dictionary.inputLabelPassword}
            type={InputType.PASSWORD}
            name={dictionary.inputNamePassword}
            id={dictionary.inputNamePassword}
            onChange={onChange}
            required
            value={formData.password}
            isError={inputError.password}
            onBlur={onBlur}
          />
          <FormErrorStyled>
            {loginError}
          </FormErrorStyled>
          <Button
            buttonText={dictionary.buttonLogin}
            type={ButtonType.SUBMIT}
          />

          <p>{dictionary.registerIfNoAccount}
            <Link to={'/registration'}>{dictionary.linkRegistration}</Link>
          </p>
        </SimpleFormStyled>
      </WrapperStyled>
    </PageWrapperStyled>
  )
}