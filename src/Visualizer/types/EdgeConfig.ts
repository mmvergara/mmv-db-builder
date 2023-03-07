export interface EdgeConfig {
  source: string;
  sourceKey: string;
  target: string;
  targetKey: string;
  relation: 'hasMany' | 'hasOne';
  sourcePosition?: string;
  targetPosition?: string;
}
