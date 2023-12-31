/* eslint-disable import/no-extraneous-dependencies */
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';

const QuillNoSSRWrapper = dynamic(async () => {
    const { default: RQ } = await import('react-quill');
    // eslint-disable-next-line react/display-name
    return ({ forwardedRef, ...props }: any) => <RQ ref={forwardedRef} {...props}></RQ>;
}, { ssr: false });

interface QuillEditorProps {
    placeholder?: string
    onChange?: (arg0: string) => void
    value: string
    readOnly?: boolean,
    maxLength?: number
}

const toolbarOptions = [
    [
        { size: ['small', false, 'large', 'huge'] },
        { color: [] },
        'bold',
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
    ],
    ['link'], // 'image'
];

const formats = [
    'header',
    'size',
    'color',
    'bold',
    'list',
    'indent',
    'link',
    'image',
];

export default function Editor(props: QuillEditorProps) {
    const quillRef = useRef(null);
    const [innerValue, setInnerValue] = useState('');
    const { value, placeholder = '', readOnly, maxLength = Number.MAX_SAFE_INTEGER, onChange } = props;
    // TODO: cdn 구축 후 업로드 로직 추가
    // const imageHandler = async () => {
    //     const input = document.createElement('input');
    //     input.setAttribute('type', 'file');
    //     input.setAttribute('accept', 'image/*');
    //     input.click();
    //     input.addEventListener('change', async () => {
    //          cdn 업로드 -> url -> url 넣기
    //     });
    // };

    const modules = useMemo(() => ({
        toolbar: readOnly ? false : {
            container: toolbarOptions,
            // TODO: cdn 구축 후 업로드 로직 추가
            // handlers: { image: imageHandler },
        },
    }), []);

    const handleChange = (v) => {
        if (readOnly) return;

        const editor = quillRef.current.getEditor();
        const unprivilegedEditor = quillRef.current.makeUnprivilegedEditor(editor);
        const currentLength = unprivilegedEditor.getLength() - 1;
        if (currentLength > maxLength) {
            onChange(innerValue);
            return;
        }

        setInnerValue(v);
        onChange(v);
    };

    useEffect(() => {
        setInnerValue(value);
    }, []);

    return (
        <Wrapper>
            <QuillNoSSRWrapper
                forwardedRef={quillRef}
                theme='snow'
                placeholder={placeholder}
                modules={modules}
                formats={formats}
                value={value}
                readOnly={readOnly}
                onChange={handleChange}
                style={{
                    height: 'auto',
                    width: '100%',
                }}
            />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;

    .ql-toolbar {
        border-radius: 6px;
    }

    .ql-container {
        font-size: 16px;
        line-height: 1.7;
        
        .ql-editor {
            min-height: 70px;

            ul {
                padding-left: 0px;
            }
            
            li {
                padding-left: 1em;
            }
        }
        ${() => {
            let indent = '';
            Array(8).fill(null).forEach((_, i) => {
                indent += `
                    .ql-indent-${i} {
                        padding-left: ${i}em;
                    }
                `;
            });
            return indent;
        }}
    }

    .ql-disabled {
        border: 1px solid #d9d9d9;
        border-radius: 10px;
        box-shadow: 5px 5px 5px #d9d9d9;
    }
`;
