import { writable } from 'svelte/store';

export const visible = writable(false);
export const toggle = () => visible.update(v => !v);

