import { useContext } from 'react';
import { Controlled } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/mdn-like.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import * as builderScript from '../../builder-script/builderScript';
import '../styles.css';
import { MailBuilderContext } from '../../../../context/MailBuilderContext';

export const HtmlEditor = () => {
  const { setMailEditorState, selectedMailEditorBlock } = useContext(MailBuilderContext);

  return (
    <div className="html-editor-container">
      <ul>
        <li>
          There will be some footnotes and notes for less experienced users, so that they don’t
          touch it again if they don’t understand And some more explanations to make it clearer
        </li>
        <li>And some more explanations to make it clearer</li>
      </ul>
      <div className="editor-container">
        <Controlled
          className="code-mirror-wrapper"
          value={selectedMailEditorBlock.params.text}
          onBeforeChange={(editor, data, value) => {
            setMailEditorState((prevState) =>
              builderScript.updateBlockById(prevState, selectedMailEditorBlock.id, 'text', value),
            );
          }}
          autoCursor={true}
          options={{
            lint: true,
            mode: 'xml',
            lineNumbers: true,
            theme: 'dracula',
            autoCloseTags: true,
            autoCloseBrackets: true,
            lineWrapping: true,
            highlightActiveLineGutter: true,
            foldGutter: true,
            bracketMatching: true,
            autocompletion: true,
            syntaxHighlighting: true,
          }}
        />
      </div>
    </div>
  );
};
