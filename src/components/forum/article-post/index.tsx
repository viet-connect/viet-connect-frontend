import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import CommonInput from '../../common/Input';
import Editor from '../../common/Editor';
import CommonButton from '../../common/Button';

export default function ArticlePost(props) {
    const { t } = useTranslation();

    const { article, readOnly, onChange, children } = props;
    const { title, contents, category } = article;

    const titleAttrs = {
        className: `article-post__title${readOnly ? '--readonly' : ''}`,
        type: 'textarea',
        value: title,
        placeholder: t('article:title'),
        wrapperStyle: { fontSize: '24px' },
        maxLength: 100,
        rows: 1,
        wrap: 'on',
        readOnly,
    };
    const editorAttrs = {
        value: contents,
        placeholder: t('article:editor'),
        readOnly,
    };

    return (
        <Wrapper className='article-post'>
            <HeadWrapper>
                <CommonInput { ...titleAttrs } onChange={(v) => onChange({ title: v })}/>
                {children}
            </HeadWrapper>
            <Editor { ...editorAttrs } onChange={(v) => onChange({ contents: v })}/>
        </Wrapper>
    );
}

const HeadWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: relative;

    .article-post__title {
        margin-top: 70px;
        textarea {
            padding: 8px 0px 14px 0px !important;
        }
        &--readonly {
            padding: 8px 0px;

            input, textarea {
                border: none !important;
            }
        }

        @media(min-width: 410px) {
            margin-top: 48px;
        }
    }

    .quill {
        .ql-toolbar.ql-snow {
            position: absolute;
            top: 0px;
            padding: 8px 0px;
            width: 100%;
            border: solid 1px rgba(128, 128, 128, 0.5);
        }
        
        .ql-container {
            border: none;
        }
    
        .ql-editor {
            padding: 8px;
            &.ql-blank::before {
                color: #B8B8B8;
            }
        }
    }
`;
