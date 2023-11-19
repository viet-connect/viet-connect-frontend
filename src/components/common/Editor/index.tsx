/* eslint-disable import/no-extraneous-dependencies */
import dynamic from 'next/dynamic';
import { useMemo, useRef } from 'react';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';

const QuillNoSSRWrapper = dynamic(async () => {
    const { default: RQ } = await import('react-quill');
    // eslint-disable-next-line react/display-name
    return ({ forwardedRef, ...props }: any) => <RQ ref={forwardedRef} {...props}></RQ>;
}, { ssr: false });

interface QuillEditorProps {
    placeholder: string
    onChange?: (arg0: string) => void
    value: string
    readOnly?: boolean
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
    // 'image',
];

export default function Editor(props: QuillEditorProps) {
    const quillRef = useRef(null);
    const { value, placeholder, readOnly, onChange } = props;
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
                onChange={(v) => readOnly ? {} : onChange(v)}
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
`;
