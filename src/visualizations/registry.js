const registry = {
  'html-document': () => import('./html-document.js'),
  'preview': () => import('./preview.js'),
  'box-model': () => import('./box-model.js'),
  'code-flow': () => import('./code-flow.js'),
};
export async function loadVisualization(name) { return (await (registry[name] || registry.preview)()).mount; }
