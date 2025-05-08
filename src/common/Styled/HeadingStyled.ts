import styled from "styled-components";

export enum Align {
    LEFT = 'self-start',
    CENTER = 'center'
}

interface HeadingProps {
    align?: Align
}

export const HeadingStyled = styled.h1<HeadingProps>`
    font-size: 32px;
    line-height: 40px;
    align-self: ${({ align }) => align || Align.LEFT};;
`