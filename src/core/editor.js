import { EditorView, keymap, lineNumbers, highlightActiveLine } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { syntaxHighlighting, HighlightStyle, bracketMatching } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';

export function mountEditor(parent, language, source, onChange) {
  const languageExtension = { html, css, js: javascript }[language];
  const view = new EditorView({ parent, state: EditorState.create({ doc: source, extensions: [
    lineNumbers(), history(), bracketMatching(), highlightActiveLine(), syntaxHighlighting(HighlightStyle.define([
      { tag: [tags.keyword, tags.operator], color: '#713d8c' },
      { tag: [tags.tagName, tags.typeName, tags.className], color: '#165c3b' },
      { tag: [tags.string, tags.attributeValue], color: '#9b3021' },
      { tag: [tags.number, tags.bool, tags.null], color: '#154e86' },
      { tag: [tags.attributeName, tags.propertyName], color: '#64440c' },
      { tag: tags.comment, color: '#536055', fontStyle: 'italic' },
    ])),
    keymap.of([...defaultKeymap, ...historyKeymap]), languageExtension(),
    EditorView.contentAttributes.of({ 'aria-label': `${language === 'js' ? 'JavaScript' : language.toUpperCase()}-kode`, 'aria-describedby': 'editor-help', spellcheck: 'false' }),
    EditorView.updateListener.of(update => { if (update.docChanged) onChange(update.state.doc.toString()); }),
    EditorView.theme({ '&': { color: '#202c29', backgroundColor: '#fffefa' }, '.cm-gutters': { backgroundColor: '#eef1ea', color: '#4b584f' }, '.cm-activeLine': { backgroundColor: '#eef1ea' } })
  ] }) });
  view.scrollDOM.tabIndex = 0;
  view.scrollDOM.setAttribute('role', 'region');
  view.scrollDOM.setAttribute('aria-label', `Rull ${language === 'js' ? 'JavaScript' : language.toUpperCase()}-koden`);
  return view;
}
