import { EditorView, keymap, lineNumbers, highlightActiveLine } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { syntaxHighlighting, defaultHighlightStyle, bracketMatching } from '@codemirror/language';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';

export function mountEditor(parent, language, source, onChange) {
  const languageExtension = { html, css, js: javascript }[language];
  return new EditorView({ parent, state: EditorState.create({ doc: source, extensions: [
    lineNumbers(), history(), bracketMatching(), highlightActiveLine(), syntaxHighlighting(defaultHighlightStyle),
    keymap.of([...defaultKeymap, ...historyKeymap]), languageExtension(),
    EditorView.contentAttributes.of({ 'aria-label': `${language === 'js' ? 'JavaScript' : language.toUpperCase()}-kode`, 'aria-describedby': 'editor-help', spellcheck: 'false' }),
    EditorView.updateListener.of(update => { if (update.docChanged) onChange(update.state.doc.toString()); }),
    EditorView.theme({ '&': { color: '#202c29', backgroundColor: '#fffefa' }, '.cm-gutters': { backgroundColor: '#eef1ea', color: '#4b584f' }, '.cm-activeLine': { backgroundColor: '#eef1ea' } })
  ] }) });
}
