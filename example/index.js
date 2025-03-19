import BModal from "../src/bmodal.js";
import BLoading from "../src/bloading.js";

/**
 *
 */
var showStacked = () => {
    const actions = [ //
        () => {
            const modal = BModal.info("Information");
            setTimeout(() => modal.close(), 3000);
        }, //
        () => {
            const modal = BModal.danger("Danger");
            setTimeout(() => modal.close(), 3000);
        }, //
        () => {
            const modal = BModal.warning("Warning");
            setTimeout(() => modal.close(), 3000);
        } //
    ];

    for (let i = 0; i < actions.length; i++) {
        setTimeout(() => actions[i](), 500 * i);
    }
}

/**
 *
 */
var showStackedLoading = () => {
    const actions = [ //
        () => {
            const modal = BModal.info("Information");
            setTimeout(() => modal.close(), 3000);
        }, //
        () => {
            const modal = BModal.danger("Danger");
            setTimeout(() => modal.close(), 3000);
        }, //
        () => {
            const loading = BLoading.screen("Loading...");
            setTimeout(() => loading.close(), 3000);
        } //
    ];

    for (let i = 0; i < actions.length; i++) {
        setTimeout(() => actions[i](), 500 * i);
    }
}

document.querySelector("#stacked-modals").addEventListener("click", () => showStacked());
document.querySelector("#stacked-modals-loading").addEventListener("click", () => showStackedLoading());
