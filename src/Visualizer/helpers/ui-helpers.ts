import twemoji from 'twemoji';
import MarkdownIt from 'markdown-it';
import Token from 'markdown-it/lib/token';
import markdownitEmoji from 'markdown-it-emoji';
import { Node } from 'reactflow';
import { TablePositions } from '../types';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

md.use(markdownitEmoji);

// @ts-ignore
md.renderer.rules.emoji = (token: Token, idx: Number) => {
  // @ts-ignore
  return twemoji.parse(token[idx].content, {
    base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/',
  });
};

export const markdown = (text: string) => {
  return md.renderInline(text);
};

// An SVG z-index hack to move selected edge on top of other edges.
export const moveSVGInFront = (element?: Element | null) => {
  if (!element) return;
  const svg = element.closest('svg');
  svg?.appendChild(element);
};

export const logTablePositions = (tableNodes: Node[]) => {
  const positions = {} as TablePositions;
  const compare = (a: String, b: String) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };

  tableNodes
    .sort((n1: Node, n2: Node) => compare(n1.id, n2.id))
    .forEach((n: Node) => {
      positions[n.id as keyof TablePositions] = {
        x: Math.round(n.position.x),
        y: Math.round(n.position.y),
      };
    });

  navigator.clipboard.writeText(JSON.stringify(positions, null, 2));

  console.log(JSON.stringify(positions, null, 2));
};

export const fullTableName = (tableName: string, schemaName = 'public') => {
  if (tableName.includes('.')) {
    return tableName;
  }
  return `${schemaName}.${tableName}`;
};
