const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

const openModal = (data) => ({ type: OPEN_MODAL, data });

const closeModal = () => ({ type: CLOSE_MODAL });

export { OPEN_MODAL, CLOSE_MODAL, openModal, closeModal };
