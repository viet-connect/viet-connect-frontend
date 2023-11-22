import { useCallback, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

interface IInputStyleProps {
    fontSize?: string
}

interface IInputProps {
    className?: string;
    type?: string;
    value: string;
    placeholder?: string;
    name?: string;
    defaultValue?: string;
    onChange: (value: string) => void;
    maxLength?: number;
    wrapperStyle?: IInputStyleProps;
    readOnly?: boolean;
    disabled?: boolean;
}

export default function CommonInput(props: IInputProps) {
    const { className, type = 'text', wrapperStyle = {}, onChange, ..._attrs } = props;
    const textRef = useRef(null);

    const resizeTextareaHeight = useCallback(() => {
        if (!textRef.current) return;

        textRef.current.style.height = '1em';
        textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }, []);

    const onInputChange = (e) => {
        resizeTextareaHeight();

        onChange(e.currentTarget.value);
    };

    useEffect(() => {
        resizeTextareaHeight();
    }, []);

    const attrs = {
        type,
        style: { ...wrapperStyle },
        ..._attrs,
        onChange: onInputChange,
    };
    return (
        <InputWrapper className={className}>
            {type === 'textarea' ? <textarea ref={textRef} {...attrs} /> : <input {...attrs} />}
        </InputWrapper>
    );
}

const InputWrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 8px;

    input, textarea {
        width: 100%;
        padding: 0px !important;
        padding-bottom: 5px !important;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
        outline: none;
        resize: none;

        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display: none;
        }
        &::placeholder {
            color: #B8B8B8;
        }
    }
`;
