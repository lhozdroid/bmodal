import BModal from "../src/bmodal.js";
import BLoading from "../dist/bloading.min.js";
import MODAL_ACTION_COLOR from "../src/bmodal-action-color.js";
import MODAL_COLOR from "../src/bmodal-color.js";

const loading = BLoading.show();
setTimeout(() => {
    loading.close();
    BModal.confirm("Do you want to continue seeing the loading?", "Confirm", MODAL_COLOR.info, [
        {
            "title": "No",
            "color": MODAL_ACTION_COLOR.danger,
            "icon": "fa-solid fa-xmark fa-fw",
            "onClick": (modal) => {
                console.log("No");
            }
        },
        {
            "title": "Yes",
            "color": MODAL_ACTION_COLOR.success,
            "icon": "fa-solid fa-check fa-fw",
            "onClick": (modal) => {
                console.log("Yes");
            }
        }])
}, 1000);