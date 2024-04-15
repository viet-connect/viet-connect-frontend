import dynamic from 'next/dynamic';
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js';
import { EditorProps } from 'react-draft-wysiwyg';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const EditorNoSSR = dynamic<EditorProps>(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
});

interface QuillEditorProps {
  placeholder?: string;
  onChange?: (arg0: string) => void;
  value: string;
  readOnly?: boolean;
  maxLength?: number;
}

export default function Editor(props: QuillEditorProps) {
  const [, setForceUpdate] = useState({});
  const forceUpdate = useCallback(() => setForceUpdate({}), []);
  const { value, placeholder = '', readOnly, maxLength, onChange } = props;

  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const [isValueValid, setIsValueValid] = useState(false);

  const onEditorStateChange = (state: EditorState) => {
    if (readOnly) return;

    setEditorState(state);

    const content = draftToHtml(convertToRaw(state.getCurrentContent()));
    onChange(content);
  };

  const onHandleBeforeChange = () => {
    const currentLength = editorState.getCurrentContent().getPlainText().length + 1;
    if (currentLength > maxLength) return 'handled';
    return 'not-handled';
  };
  const onHandlePasteText = (text) => {
    const currentLength = editorState.getCurrentContent().getPlainText().length + 1;
    const isPastedOverLength = currentLength + text.length > maxLength;
    const isTargetOverLength = text.length > maxLength;
    return isTargetOverLength || isPastedOverLength;
  };

  const customContentStateConverter = (contentState) => {
    const newBlockMap = contentState.getBlockMap().map((block) => {
      const entityKey = block.getEntityAt(0);
      if (entityKey !== null) {
        const entityBlock = contentState.getEntity(entityKey);
        const entityType = entityBlock.getType();
        switch (entityType) {
          case 'IMAGE': {
            const newBlock = block.merge({
              type: 'atomic',
              text: 'img',
            });
            return newBlock;
          }
          default:
            return block;
        }
      }
      return block;
    });
    const newContentState = contentState.set('blockMap', newBlockMap);
    return newContentState;
  };

  useEffect(() => {
    if (isValueValid) return;
    setIsValueValid(value.length > 0);

    const blocksFromHTML = convertFromHTML(value);
    const { contentBlocks, entityMap } = blocksFromHTML;
    const customState = customContentStateConverter(ContentState.createFromBlockArray(contentBlocks, entityMap));
    const state = EditorState.createWithContent(customState);
    const selection = EditorState.moveFocusToEnd(state);
    setEditorState(selection);
  }, [value]);

  useEffect(() => {
    forceUpdate();
  }, [placeholder]);

  return (
    <Wrapper>
      <EditorNoSSR
        editorState={editorState}
        wrapperClassName="common-editor"
        toolbarClassName="common-editor__toolbar"
        editorClassName="common-editor__editor"
        onEditorStateChange={onEditorStateChange}
        handleBeforeInput={onHandleBeforeChange}
        handlePastedText={onHandlePasteText}
        placeholder={placeholder}
        readOnly={readOnly}
        toolbarHidden={readOnly}
        toolbar={{
          options: ['fontSize', 'inline', 'list', 'link', 'colorPicker', 'image'],
          inline: { options: ['bold'] },
          fontSize: { inDropdown: true },
          list: { options: ['ordered', 'unordered', 'indent', 'outdent'] },
          link: { inDropdown: true, options: ['link', 'unlink'] },
          image: { uploadEnabled: false, alignmentEnabled: false },
        }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .common-editor {
    min-height: 130px;
    border: 1px solid #d9d9d9;
    border-radius: 10px;

    img {
      max-width: 100%;
    }

    &__toolbar {
      border-bottom: 1px solid #d9d9d9;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;

      .rdw-option-wrapper,
      .rdw-dropdown-wrapper {
        border: none;
      }
    }

    &__editor {
      padding: 0px 5px 5px 5px;
    }
  }
`;
