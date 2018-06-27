export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';

export const openModal = () => ({
  type: MODAL_OPEN,
});

export const closeModal = () => ({
  type: MODAL_CLOSE,
});
