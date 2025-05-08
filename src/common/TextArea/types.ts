import { GeneralInput } from "@common/Input/types"

export interface TextAreaProps extends GeneralInput {
  rows?: number,
  onChange: (e: React.FocusEvent<HTMLTextAreaElement>) => void,
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
}