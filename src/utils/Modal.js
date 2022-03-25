/* globals bootstrap */
export const Modal = {

    /**
     * 
     * @param {String} selector 
     */
    hide: (selector) => {
        const modal = bootstrap.Modal.getInstance(
            document.querySelector(selector)
        );
        modal.hide();
    },

    show: (selector) => {
        const modal = bootstrap.Modal.getOrCreateInstance(
            document.querySelector(selector), {}
        );
        modal.show();
    }
};
