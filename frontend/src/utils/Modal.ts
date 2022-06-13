import { Modal } from "bootstrap";



export const modalHide = (selector: string) => {
    const modalElement = document.querySelector(selector);

    if (modalElement !== null) {
        console.log({modalElement});
        Modal.getOrCreateInstance(modalElement)?.hide();
    }
};

export const modalShow = (selector: string) => {
    const modalElement = document.querySelector(selector);
    if (modalElement !== null) {
        Modal.getOrCreateInstance(modalElement)?.show();
    }
};

