import Util from "./util.js";
import BModalTracker from "./bmodal-tracker.js";
import MODAL_SIZE from "./bmodal-size.js";
import MODAL_COLOR from "./bmodal-color.js";
import MODAL_ACTION_COLOR from "./bmodal-action-color.js";
import MODAL_ACTION from "./bmodal-action.js";

/**
 *
 */
export default class BModal {
    #domParser = new DOMParser();

    #config = {
        /* Definition */
        "size": MODAL_SIZE.default, //
        "color": MODAL_COLOR.dark, //
        "title": "&nbsp", //
        "content": "&nbsp", //

        /* Behavior */
        "closeButton": true, //
        "closeClick": false, //
        "closeEscape": false, //

        "displayHeader": true, //
        "displayContent": true, //
        "displayFooter": true, //

        /* Actions */
        "actions": [],

        /* Events */
        "onOpening": (modal) => {
        }, //
        "onOpened": (modal) => {
        }, //
        "onClosing": (modal) => {
        }, //
        "onClosed": (modal) => {
        }, //
        "onShow": (modal) => {
        }, //
        "onHide": (modal) => {
        },
    };

    #element = null;
    #modal = null;

    /**
     * Default constructor
     * @param config
     */
    constructor(config = {}) {
        this.#config = Util.deepExtend(this.#config, config);

        this.#config.onOpening(this);

        const header = this.#renderHeader();
        const content = this.#renderContent();
        const footer = this.#renderFooter();

        this.#element = this.#renderModal(header, content, footer);
        document.body.append(this.#element);
        this.#modal = new bootstrap.Modal(this.#element.querySelector(".modal"), {
            "backdrop": this.#config.closeClick ? true : "static", //
            "keyboard": this.#config.closeEscape
        });
        this.#modal.show();

        this.#config.onOpened(this);

        BModalTracker.trackOpen(this);
    }

    /**
     *
     * @param content
     * @param title
     * @param color
     * @param actions
     * @returns {BModal}
     */
    static confirm(content, title = "Confirm", color = MODAL_COLOR.warning, actions = [{
        "title": "No",
        "color": MODAL_ACTION_COLOR.danger,
        "icon": "fa-solid fa-xmark fa-fw",
        "onClick": (modal) => modal.close()
    }, {
        "title": "Yes",
        "color": MODAL_ACTION_COLOR.success,
        "icon": "fa-solid fa-check fa-fw",
        "onClick": (modal) => modal.close()
    }]) {
        return new BModal({
            "title": title, "content": content, "color": color, "actions": actions
        });
    }

    /**
     *
     * @param content
     * @param title
     * @returns {BModal}
     */
    static danger(content, title = "Important") {
        return new BModal({
            "title": title, "content": content, "color": MODAL_COLOR.danger, "actions": [{
                "title": "Close",
                "color": MODAL_ACTION_COLOR.danger,
                "icon": "fa-solid fa-xmark fa-fw",
                "onClick": (modal) => modal.close()
            }]
        });
    }

    /**
     *
     * @param content
     * @param title
     * @returns {BModal}
     */
    static dark(content, title = "Important") {
        return new BModal({
            "title": title, "content": content, "color": MODAL_COLOR.dark, "actions": [{
                "title": "Close",
                "color": MODAL_ACTION_COLOR.dark,
                "icon": "fa-solid fa-xmark fa-fw",
                "onClick": (modal) => modal.close()
            }]
        });
    }

    /**
     *
     * @param content
     * @param title
     * @returns {BModal}
     */
    static info(content, title = "Important") {
        return new BModal({
            "title": title, //
            "content": content, //
            "color": MODAL_COLOR.info, //
            "actions": [{ //
                "title": "Close", //
                "color": MODAL_ACTION_COLOR.info, //
                "icon": "fa-solid fa-xmark fa-fw", //
                "onClick": (modal) => modal.close()
            }]
        });
    }

    /**
     *
     * @param content
     * @param title
     * @returns {BModal}
     */
    static light(content, title = "Important") {
        return new BModal({
            "title": title,  //
            "content": content,  //
            "color": MODAL_COLOR.light, //
            "actions": [{ //
                "title": "Close", //
                "color": MODAL_ACTION_COLOR.light, //
                "icon": "fa-solid fa-xmark fa-fw", //
                "onClick": (modal) => modal.close()
            }]
        });
    }

    /**
     *
     * @param content
     * @param title
     * @returns {BModal}
     */
    static primary(content, title = "Important") {
        return new BModal({
            "title": title,  //
            "content": content,  //
            "color": MODAL_COLOR.primary,  //
            "actions": [{ //
                "title": "Close", //
                "color": MODAL_ACTION_COLOR.primary, //
                "icon": "fa-solid fa-xmark fa-fw", //
                "onClick": (modal) => modal.close()
            }]
        });
    }

    /**
     *
     * @param content
     * @param title
     * @returns {BModal}
     */
    static secondary(content, title = "Important") {
        return new BModal({
            "title": title,  //
            "content": content,  //
            "color": MODAL_COLOR.secondary,  //
            "actions": [{ //
                "title": "Close", //
                "color": MODAL_ACTION_COLOR.secondary, //
                "icon": "fa-solid fa-xmark fa-fw", //
                "onClick": (modal) => modal.close()
            }]
        });
    }

    /**
     *
     * @param content
     * @param title
     * @returns {BModal}
     */
    static success(content, title = "Important") {
        return new BModal({
            "title": title,  //
            "content": content,  //
            "color": MODAL_COLOR.success,  //
            "actions": [{ //
                "title": "Close", //
                "color": MODAL_ACTION_COLOR.success, //
                "icon": "fa-solid fa-xmark fa-fw", //
                "onClick": (modal) => modal.close()
            }]
        });
    }

    /**
     *
     * @param content
     * @param title
     * @returns {BModal}
     */
    static warning(content, title = "Important") {
        return new BModal({
            "title": title,  //
            "content": content,  //
            "color": MODAL_COLOR.warning,  //
            "actions": [{ //
                "title": "Close", //
                "color": MODAL_ACTION_COLOR.warning, //
                "icon": "fa-solid fa-xmark fa-fw", //
                "onClick": (modal) => modal.close()
            }]
        });
    }

    /**
     *
     * @returns {null}
     */
    #renderContent() {
        let body = null;
        if (this.#config.displayContent) {
            if (this.#config.content instanceof HTMLElement) {
                // language=HTML
                body = this.#domParser.parseFromString(`
                    <div class="modal-body"></div>
                `, "text/html").body.firstChild;

                body.append(this.#config.content);
            } else {
                // language=HTML
                body = this.#domParser.parseFromString(`
                    <div class="modal-body">
                        ${this.#config.content}
                    </div>
                `, "text/html").body.firstChild;
            }
        }

        return body;
    }

    /**
     *
     * @returns {null}
     */
    #renderFooter() {
        let footer = null;

        if (this.#config.displayFooter) {
            const buttons = [];
            for (let i = 0; i < this.#config.actions.length; i++) {
                const action = Util.deepExtend(MODAL_ACTION, this.#config.actions[i]);

                // language=HTML
                const icon = action.icon != null && action.icon.trim() !== "" ? `
                    <span class="${action.icon}"></span>
                ` : "";

                // language=HTML
                const button = this.#domParser.parseFromString(`
                    <button type="button" class="btn ${action.color}">
                        ${icon}
                        ${action.title}
                    </button>
                `, "text/html").body.firstChild;

                const onClick = action.onClick;
                button.addEventListener("click", () => onClick(this));

                buttons.push(button);
            }

            if (buttons.length > 0) {
                // language=HTML
                footer = this.#domParser.parseFromString(`
                    <div class="modal-footer"></div>
                `, "text/html").body.firstChild;

                for (let i = 0; i < buttons.length; i++) {

                    const button = buttons[i];
                    footer.append(button);
                }
            }
        }

        return footer;
    }

    /**
     *
     * @returns {null}
     */
    #renderHeader() {
        let header = null;

        if (this.#config.displayHeader) {
            // language=HTML
            header = this.#domParser.parseFromString(`
                <div class="modal-header ${this.#config.color}">
                    <h5>${this.#config.title}</h5>
                </div>
            `, "text/html").body.firstChild;

            if (this.#config.closeButton) {
                // language=HTML
                const closeButton = this.#domParser.parseFromString(`
                    <span class="fa-solid fa-xmark fa-fw"></span>
                `, "text/html").body.firstChild;
                closeButton.addEventListener("click", () => this.close());
                header.append(closeButton);
            }
        }

        return header;
    }

    /**
     *
     * @param header
     * @param content
     * @param footer
     * @returns {ChildNode}
     */
    #renderModal(header, content, footer) {
        // language=HTML
        const modal = this.#domParser.parseFromString(`
            <div>
                <style>
                    .modal-header, .modal-footer {
                        padding: 0.5rem 1rem;
                    }

                    .modal-header h5 {
                        padding: 0;
                        margin: 0;
                    }

                    .modal-header span {
                        position: absolute;
                        right: 1rem;
                        font-size: 1.2rem;
                        cursor: pointer;
                    }

                    .modal-footer button {
                        margin: 0 2pt;
                    }
                </style>
                <div class="modal shadow ${this.#config.size}" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content"></div>
                    </div>
                </div>
            </div>
        `, "text/html").body.firstChild;

        if (header != null) modal.querySelector(".modal-content").append(header);
        if (content != null) modal.querySelector(".modal-content").append(content);
        if (footer != null) modal.querySelector(".modal-content").append(footer);

        return modal;
    }

    /**
     *
     */
    hide() {
        this.#modal.hide();
        this.#config.onHide(this);
    }

    /**
     *
     */
    show() {
        this.#modal.show();
        this.#config.onShow(this);
    }

    /**
     *
     */
    close() {
        this.#config.onClosing(this);

        if (this.#modal != null) {
            this.#modal.hide();
            this.#modal.dispose();
            this.#modal = null;
        }

        if (this.#element != null) {
            this.#element.remove();
            this.#element = null;
        }

        this.#config.onClosed(this);

        BModalTracker.trackClose(this);
    }

    /**
     *
     * @returns {null}
     */
    getElement() {
        return this.#element;
    }

    /**
     * //
     * @returns {null}
     */
    getModal() {
        return this.#modal;
    }
}
