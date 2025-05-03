import { Button } from "@common/Button"
import { Input } from "@common/Input"
import { dictionary } from "@i18n/strings"
import { Link, useNavigate } from "react-router-dom"
import { useInputHandler, useFormValidate } from "@hooks"
import { createUser } from "@services"
import { WrapperStyled, SimpleFormStyled } from "@common/Styled"
import { useState } from "react"
import { InputType } from "@common/Input/types"
import { ButtonType } from "@common/Button/types"
import { FormErrorStyled } from "@common/Styled/FormErrorStyled"
import { PageWrapperStyled } from "@common/Styled/PageWrapper"

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

const PASSWORD = dictionary.inputLabelPassword;
const NAME = dictionary.inputLabelName;
const EMAIL = dictionary.inputLabelEmail;

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
    <PageWrapperStyled>
      <h1>{dictionary.registerPageTitle}</h1>
      <WrapperStyled>
        <SimpleFormStyled onSubmit={submitForm} noValidate>

          <Input
            placeholderText={dictionary.inputPlaceholderName}
            labelText={NAME}
            required
            name={NAME.toLowerCase()}
            onChange={onChange}
            value={formData.name}
            isError={inputError.name}
            onBlur={onBlur}
          />
          <Input
            placeholderText={dictionary.inputPlaceholderEmail}
            labelText={EMAIL}
            type={InputType.EMAIL}
            required
            name={EMAIL.toLowerCase()}
            onChange={onChange}
            value={formData.email}
            isError={inputError.email}
            onBlur={onBlur}
          />
          <Input
            placeholderText={dictionary.inputPlaceholderPassword}
            labelText={PASSWORD}
            type={InputType.PASSWORD}
            required
            name={PASSWORD.toLowerCase()}
            onChange={onChange}
            value={formData.password}
            isError={inputError.password}
            onBlur={onBlur}
          />
          <FormErrorStyled>
            {registerError}
          </FormErrorStyled>
          <Button
            buttonText={dictionary.buttonRegister}
            type={ButtonType.SUBMIT}
          />
          <p>{dictionary.loginIfHaveAccount}
            <Link to={'/login'}>{dictionary.linkLogin}</Link>
          </p>
        </SimpleFormStyled>
      </WrapperStyled>
    </PageWrapperStyled>
  )
}