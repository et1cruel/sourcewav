import { describe, it, expect } from 'vitest';
import { formatPriceCents, slugify } from '@/lib/utils';

describe('formatPriceCents', () => {
  it('converts cents to THB currency string', () => {
    expect(formatPriceCents(25000)).toBe('฿250.00');
  });
  it('handles zero', () => {
    expect(formatPriceCents(0)).toBe('฿0.00');
  });
});

describe('slugify', () => {
  it('creates a URL-friendly slug', () => {
    expect(slugify('Underground Rap Show')).toBe('underground-rap-show');
  });
  it('removes special characters', () => {
    expect(slugify('Rap Battle @ Club!')).toBe('rap-battle-club');
  });
});