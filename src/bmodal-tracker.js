export default class BModalTracker {
    static #modals = [];

    /**
     *
     * @param modal
     */
    static trackOpen(modal) {
        this.#modals.push(modal);
        this.#updateZIndexes();
    }

    /**
     *
     * @param modal
     */
    static trackClose(modal) {
        this.#modals.splice(this.#modals.indexOf(modal), 1);
        this.#updateZIndexes();
    }

    /**
     *
     */
    static #updateZIndexes() {
        let baseZIndex = 2050;

        const backdrops = document.querySelectorAll(".modal-backdrop");

        this.#modals.forEach((modal, index) => {
            const modalZIndex = baseZIndex + index * 20;
            const backdropZIndex = modalZIndex - 1;

            const modalElement = modal.getElement();
            if (modalElement) {
                modalElement.style.zIndex = modalZIndex;

                const modalDialog = modalElement.querySelector(".modal");
                if (modalDialog) {
                    modalDialog.style.zIndex = modalZIndex;
                }
            }

            if (backdrops[index]) {
                backdrops[index].style.zIndex = backdropZIndex;
            }
        });
    }
}
