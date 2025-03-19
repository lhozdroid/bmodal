import BModal from "./bmodal.js";
import LOADING_ICON from "./bloading-icon.js";
import LOADING_SUBTITLE from "./bloading-subtitle.js";

/**
 *
 */
export default class BLoading extends BModal {
    #interval = null;
    #backdrop = null;
    #observer = null;
    #bound = null;

    /**
     *
     * @param content
     */
    constructor(content = "") {
        super({
            "content": content, //
            "closeButton": false, //
            "displayHeader": false, //
            "displayFooter": false
        });

        const element = this.getElement();
        const subtitle = element.querySelector(".loading-content span");
        if (subtitle.innerHTML.trim() === "") {
            subtitle.innerHTML = LOADING_SUBTITLE[Math.floor(Math.random() * LOADING_SUBTITLE.length)];

            this.#interval = setInterval(() => {
                subtitle.innerHTML = LOADING_SUBTITLE[Math.floor(Math.random() * LOADING_SUBTITLE.length)];
            }, 5000);
        }
    }

    /**
     *
     * @param title
     * @param icon
     * @param subtitle
     * @returns {string}
     */
    static #getHTML(title, icon, subtitle) {
        // language=HTML
        return `
            <div>
                <style>
                    .loading-content {
                        min-width: 500px;
                    }
                    .img-loading {
                        width: 60px;
                        height: 60px;
                    }
                </style>
                <div class="loading-content">
                    <div class="row">
                        <div class="col-sm-2">
                            <img class="img-loading" src="${icon}">
                        </div>
                        <div class="col-sm">
                            <div class="row">
                                <div class="col-sm">
                                    <h3 class="m-0">${title}</h3>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm">
                                    <span class="fw-light">${subtitle}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     *
     * @param target
     * @param title
     * @param icon
     * @param subtitle
     * @returns {BLoading}
     */
    static element(target, title = "Loading...", icon = LOADING_ICON.loading, subtitle = "") {
        const instance = BLoading.screen(title, icon, subtitle);
        instance.#restrict(target);
        return instance;
    }

    /**
     *
     * @param title
     * @param icon
     * @param subtitle
     * @returns {BLoading}
     */
    static screen(title = "Loading...", icon = LOADING_ICON.loading, subtitle = "") {
        // language=HTML
        const template = this.#getHTML(title, icon, subtitle);
        return new BLoading(template);
    }

    /**
     *
     * @param target
     */
    #restrict(target) {
        // Fixes the window overflow
        document.body.style.overflow = "visible";

        // Obtains element modal and dialog
        const element = this.getElement();
        const modal = element.querySelector(".modal");
        const dialog = modal.querySelector(".modal-dialog");

        // Replaces the backdrop
        // language=HTML
        this.#backdrop = new DOMParser().parseFromString(`
            <div class="modal-backdrop show"></div>
        `, "text/html").body.firstChild;

        // Checks if the element can be replaced
        const bootstrapModal = this.getModal();
        if (bootstrapModal._backdrop && bootstrapModal._backdrop._element) {
            bootstrapModal._backdrop._element.remove();
            bootstrapModal._backdrop._element = this.#backdrop;
            document.body.append(this.#backdrop);
        }

        // Ensures proper positioning
        this.#backdrop.style.position = "absolute";

        modal.style.position = "absolute";

        // Sets the initial position
        this.#updatePosition(target, modal, dialog);

        // Observes size changes
        this.#observer = new ResizeObserver(() => this.#updatePosition(target, modal, dialog));
        this.#observer.observe(target);

        // Handles window resize and scroll
        this.#bound = () => this.#updatePosition(target, modal, dialog);
        window.addEventListener("scroll", this.#bound);
        window.addEventListener("resize", this.#bound);
    }

    /**
     *
     * @param target
     * @param modal
     * @param dialog
     */
    #updatePosition(target, modal, dialog) {
        // Obtains the position of the target
        const rect = target.getBoundingClientRect();

        // Obtains the scrolling position
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

        // Calculate offsets to center the dialog within the target
        const dialogWidth = dialog.offsetWidth;
        const dialogHeight = dialog.offsetHeight;

        const offsetX = (rect.width - dialogWidth) / 2;
        const offsetY = (rect.height - dialogHeight) / 2;

        // Updates modal position and size
        modal.style.top = `${rect.top + scrollTop}px`;
        modal.style.left = `${rect.left + scrollLeft}px`;
        modal.style.width = `${rect.width}px`;
        modal.style.height = `${rect.height}px`;

        // Center the dialog within the modal
        dialog.style.position = "absolute";
        dialog.style.top = `${offsetY}px`;
        dialog.style.left = `${offsetX}px`;

        // Updates backdrop position and size
        this.#backdrop.style.top = `${rect.top + scrollTop}px`;
        this.#backdrop.style.left = `${rect.left + scrollLeft}px`;
        this.#backdrop.style.width = `${rect.width}px`;
        this.#backdrop.style.height = `${rect.height}px`;

        // Removes default Bootstrap modal centering
        dialog.style.margin = "0";
    };

    /**
     *
     */
    close() {
        if (this.#interval !== null) clearInterval(this.#interval);
        if (this.#observer) this.#observer.disconnect();
        if (this.#backdrop) this.#backdrop.remove();
        if (this.#bound) {
            window.removeEventListener("scroll", this.#bound);
            window.removeEventListener("resize", this.#bound);
        }

        super.close();
    }
}
