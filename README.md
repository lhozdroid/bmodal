# BModal Library

BModal is a lightweight JavaScript library for creating and managing modal dialogs using [Bootstrap](https://getbootstrap.com/) as the underlying framework. In addition to creating standard modal dialogs, the library provides a specialized loading modal with animated subtitles that change periodically. The library is built with extensibility in mind and includes utility functions to merge configurations and handle DOM readiness.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Modal](#basic-modal)
  - [Preconfigured Modals](#preconfigured-modals)
  - [Loading Modal](#loading-modal)
- [API Reference](#api-reference)
  - [BModal Class](#bmodal-class)
  - [BLoading Class](#bloading-class)
  - [Constants](#constants)
- [Examples](#examples)
- [Browser Compatibility](#browser-compatibility)
- [License](#license)

---

## Features

- **Customizable Modals:** Configure modal size, colors, title, content, and behavior.
- **Prebuilt Dialogs:** Quick methods to generate confirmation dialogs and alerts (e.g., *confirm*, *danger*, *info*, etc.).
- **Loading Screen Modal:** A specialized modal for loading states with a randomly changing subtitle.
- **Dynamic Z-Index Management:** Automatically manages stacking order of multiple open modals.
- **Utility Methods:** Includes helper functions to deep merge configuration objects and execute functions on DOM ready.

---

## Installation

Include the BModal source in your project. For example, if using ES modules:

```html
<script type="module">
  import BModal, { BLoading, LOADING_ICON, LOADING_SUBTITLE, MODAL_ACTION, MODAL_ACTION_COLOR, MODAL_COLOR, MODAL_SIZE } from './path/to/bmodal.js';
  
  // Your code goes here…
</script>
```

> **Note:** This library depends on [Bootstrap’s Modal component](https://getbootstrap.com/docs/5.0/components/modal/) so ensure Bootstrap (CSS and JS) is included in your project.

---

## Usage

### Basic Modal

To create a custom modal dialog, instantiate the `BModal` class with your own configuration object:

```js
const myModal = new BModal({
  size: MODAL_SIZE.large,            // Use predefined sizes: default, small, large, xlarge
  color: MODAL_COLOR.primary,        // Set header color from MODAL_COLOR
  title: "Welcome!",
  content: "<p>This is a custom modal dialog.</p>",
  closeButton: true,                 // Display the close button in the header
  closeClick: false,                 // Prevent closing modal by clicking the backdrop
  closeEscape: true,                 // Allow closing modal with the escape key
  actions: [
    {
      title: "OK",
      color: MODAL_ACTION_COLOR.primary,
      icon: "fa-solid fa-check",     // (Optional) Icon class if using FontAwesome
      onClick: (modal) => modal.close()
    }
  ],
  onOpened: (modal) => console.log("Modal opened"),
  onClosed: (modal) => console.log("Modal closed")
});
```

The modal will be appended to the document body and automatically displayed.

### Preconfigured Modals

BModal provides several static methods to quickly create common types of dialogs:

- **Confirmation Dialog:**

  ```js
  const confirmModal = BModal.confirm(
    "Are you sure you want to proceed?",
    "Confirm Action",
    MODAL_COLOR.warning
  );
  ```

- **Alert/Information Dialogs:**

  For example, to display a danger or important alert:

  ```js
  const alertModal = BModal.danger(
    "An error occurred while processing your request.",
    "Error"
  );
  ```

Similarly, there are static methods for `dark`, `info`, `light`, `primary`, `secondary`, `success`, and `warning`.

### Loading Modal

The `BLoading` class extends BModal to provide a loading screen with a customizable message and a dynamically changing subtitle.

Create a full-screen loading modal:

```js
// Create a loading modal that covers the whole screen
const loadingModal = BLoading.screen("Loading Data", LOADING_ICON.loading, "Please wait...");
```

Or attach the loading modal to a specific target element:

```js
// Restrict loading modal to a specific target element (e.g., a div)
const targetElement = document.querySelector("#mySection");
const loadingRestricted = BLoading.element(targetElement, "Loading Section", LOADING_ICON.loading);
```

The loading modal will update its subtitle every 5 seconds using one of the predefined messages from `LOADING_SUBTITLE`.

---

## API Reference

### BModal Class

#### Constructor

```js
new BModal(config)
```

- **config (object):** A configuration object. Supported keys include:
  - **size:** Modal size (use values from `MODAL_SIZE`).
  - **color:** Header background color (use values from `MODAL_COLOR`).
  - **title:** Modal title as a string (HTML allowed).
  - **content:** Modal content as HTML string or an HTMLElement.
  - **closeButton:** Boolean to display a close button.
  - **closeClick:** Boolean; if `true` clicking the backdrop will close the modal.
  - **closeEscape:** Boolean; if `true` pressing Escape will close the modal.
  - **displayHeader, displayContent, displayFooter:** Booleans to control visibility of each section.
  - **actions:** Array of button configurations for the modal footer.
  - **Event callbacks:** `onOpening`, `onOpened`, `onClosing`, `onClosed`, `onShow`, `onHide`—each receives the modal instance.

#### Methods

- **show():** Show the modal.
- **hide():** Hide the modal.
- **close():** Close and dispose the modal.
- **getElement():** Returns the modal’s DOM element.
- **getModal():** Returns the underlying Bootstrap Modal instance.

#### Static Methods

- **confirm(content, title, color, actions):** Create a confirmation dialog.
- **danger(content, title):** Create a danger alert modal.
- **dark, info, light, primary, secondary, success, warning:** Similar convenience methods for different styles.

### BLoading Class

`BLoading` extends `BModal` for creating loading indicators.

#### Constructor

```js
new BLoading(content)
```

- **content (string):** HTML content to display. Typically generated by the static methods.

#### Static Methods

- **screen(title, icon, subtitle):** Creates a full-screen loading modal.
- **element(target, title, icon, subtitle):** Creates a loading modal restricted to the given target element.

#### Behavior

- Randomly rotates through loading subtitle messages every 5 seconds.
- Automatically adjusts its position if the target element resizes or the window scrolls.

---

## Constants

- **MODAL_SIZE:** An object containing predefined modal sizes:
  - `default`, `small`, `large`, `xlarge`
- **MODAL_COLOR:** An object defining header background colors (e.g., `primary`, `secondary`, `success`, etc.).
- **MODAL_ACTION_COLOR:** Button color classes (matching Bootstrap button styles).
- **MODAL_ACTION:** Default action configuration.
- **LOADING_ICON:** Contains a base64-encoded GIF used as the loading image.
- **LOADING_SUBTITLE:** An array of strings with various loading messages.

---

## Examples

### Example 1: Custom Alert Modal

```js
import BModal, { MODAL_COLOR, MODAL_ACTION_COLOR } from './bmodal.js';

const alertModal = new BModal({
  size: MODAL_SIZE.default,
  color: MODAL_COLOR.danger,
  title: "Error",
  content: "<p>An unexpected error occurred. Please try again later.</p>",
  actions: [
    {
      title: "Close",
      color: MODAL_ACTION_COLOR.danger,
      icon: "fa-solid fa-xmark",
      onClick: (modal) => modal.close()
    }
  ]
});
```

### Example 2: Confirmation Dialog

```js
import BModal, { MODAL_COLOR, MODAL_ACTION_COLOR } from './bmodal.js';

BModal.confirm(
  "Do you really want to delete this item?",
  "Delete Confirmation",
  MODAL_COLOR.warning,
  [
    {
      title: "Cancel",
      color: MODAL_ACTION_COLOR.secondary,
      icon: "fa-solid fa-ban",
      onClick: (modal) => modal.close()
    },
    {
      title: "Delete",
      color: MODAL_ACTION_COLOR.danger,
      icon: "fa-solid fa-trash",
      onClick: (modal) => {
        // Execute deletion logic here
        modal.close();
      }
    }
  ]
);
```

### Example 3: Loading Modal Restricted to an Element

```js
import { BLoading, LOADING_ICON } from './bmodal.js';

const targetDiv = document.getElementById("data-container");
const loadingModal = BLoading.element(
  targetDiv,
  "Loading Data...",
  LOADING_ICON.loading,
  ""
);

// Later, when loading is complete:
loadingModal.close();
```

---

## Browser Compatibility

BModal is designed to work with modern browsers that support ES6 classes, `DOMParser`, and the [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) API. Ensure you include polyfills if you need to support older browsers.

---

## License

*Include your license information here. For example:*

Distributed under the MIT License. See `LICENSE` for more information.
