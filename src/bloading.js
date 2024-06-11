import BModal from "./bmodal.js";
import LOADING_ICON from "./bloading-icon.js";
import {LOADING_SUBTITLE} from "./bloading-subtitle.js";

/**
 *
 */
export default class BLoading extends BModal {
    #interval = null;

    /**
     *
     * @param content
     */
    constructor(content) {
        super({
            "content": content,

            "closeButton": false,

            "displayHeader": false,
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
     * @param subtitle
     */
    static show(title = "Loading...", icon = LOADING_ICON.loading, subtitle = "") {
        // language=HTML
        const template = `
            <div class="loading-content">
                <div class="row">
                    <div class="col-sm-2">
                        <img class="img-fluid" src="${icon}">
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
        `;

        return new BLoading(template);
    }

    /**
     *
     */
    close() {
        if (this.#interval != null) {
            clearInterval(this.#interval);
        }
        super.close();
    }
}