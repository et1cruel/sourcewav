import { describe, it, expect } from 'vitest';

/**
 * Business logic tests for ticket inventory concurrency and order state transitions.
 * These tests validate the rules that the backend edge functions / server actions
 * must enforce (simulated here since the real backend runs on Supabase Edge Functions).
 */

function canPurchase(ticketType: { total_quantity: number; sold_quantity: number; reserved_quantity: number }, qty: number) {
  const available = ticketType.total_quantity - ticketType.sold_quantity - ticketType.reserved_quantity;
  return available >= qty;
}

function nextOrderStatus(current: 'pending' | 'paid' | 'failed' | 'expired' | 'refunded' | 'cancelled', event: string) {
  const transitions: Record<string, string[]> = {
    pending: ['paid', 'failed', 'expired', 'cancelled'],
    paid: ['refunded'],
    failed: ['pending'],
    expired: ['pending'],
    refunded: [],
    cancelled: [],
  };
  return transitions[current].includes(event);
}

function nextPaymentStatus(current: 'pending' | 'paid' | 'failed' | 'expired' | 'refunded', event: string) {
  const transitions: Record<string, string[]> = {
    pending: ['paid', 'failed', 'expired'],
    paid: ['refunded'],
    failed: ['pending'],
    expired: ['pending'],
    refunded: [],
  };
  return transitions[current].includes(event);
}

function nextTicketStatus(current: 'valid' | 'used' | 'cancelled' | 'refunded' | 'transferred', event: string) {
  const transitions: Record<string, string[]> = {
    valid: ['used', 'cancelled', 'refunded', 'transferred'],
    used: [],
    cancelled: [],
    refunded: [],
    transferred: [],
  };
  return transitions[current].includes(event);
}

describe('ticket inventory', () => {
  it('prevents overselling when available quantity is sufficient', () => {
    const tt = { total_quantity: 100, sold_quantity: 80, reserved_quantity: 10 };
    expect(canPurchase(tt, 10)).toBe(true);
  });
  it('prevents purchase exceeding available quantity', () => {
    const tt = { total_quantity: 100, sold_quantity: 80, reserved_quantity: 10 };
    expect(canPurchase(tt, 11)).toBe(false);
  });
  it('allows purchase when inventory is full', () => {
    const tt = { total_quantity: 50, sold_quantity: 0, reserved_quantity: 0 };
    expect(canPurchase(tt, 50)).toBe(true);
  });
});

describe('order state transitions', () => {
  it('allows pending -> paid', () => {
    expect(nextOrderStatus('pending', 'paid')).toBe(true);
  });
  it('does not allow paid -> pending', () => {
    expect(nextOrderStatus('paid', 'pending')).toBe(false);
  });
  it('allows failed -> pending (retry)', () => {
    expect(nextOrderStatus('failed', 'pending')).toBe(true);
  });
});

describe('payment state transitions', () => {
  it('allows pending -> paid', () => {
    expect(nextPaymentStatus('pending', 'paid')).toBe(true);
  });
  it('does not allow paid -> pending', () => {
    expect(nextPaymentStatus('paid', 'pending')).toBe(false);
  });
});

describe('ticket state transitions', () => {
  it('allows valid -> used (check-in)', () => {
    expect(nextTicketStatus('valid', 'used')).toBe(true);
  });
  it('does not allow used -> valid (no double check-in)', () => {
    expect(nextTicketStatus('used', 'valid')).toBe(false);
  });
  it('allows valid -> refunded', () => {
    expect(nextTicketStatus('valid', 'refunded')).toBe(true);
  });
});