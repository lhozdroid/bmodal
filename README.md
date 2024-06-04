# BModal

- [Class: BModal](#class-bmodal)
  * [Constructor](#constructor)
  * [Configuration Object](#configuration-object)
  * [Methods](#methods)
    + [`close()`](#close)
  * [Event Hooks](#event-hooks)
  * [Constants](#constants)
    + [MODAL_SIZE](#modal_size)
    + [MODAL_COLOR](#modal_color)
    + [ACTION_COLOR](#action_color)

## Class: BModal

### Constructor

Initializes a new instance of the `BModal` class.

- **Parameters:**
  - `config` (Object): A configuration object to customize the modal.

### Configuration Object

The configuration object supports the following properties:

- **Definition:**
  - `size` (String): Size of the modal. Available values are:
    - `MODAL_SIZE.default`
    - `MODAL_SIZE.small`
    - `MODAL_SIZE.large`
    - `MODAL_SIZE.xlarge`
  - `color` (String): Color scheme of the modal. Available values are:
    - `MODAL_COLOR.primary`
    - `MODAL_COLOR.secondary`
    - `MODAL_COLOR.success`
    - `MODAL_COLOR.info`
    - `MODAL_COLOR.warning`
    - `MODAL_COLOR.danger`
    - `MODAL_COLOR.light`
    - `MODAL_COLOR.dark`
  - `title` (String): Title text of the modal.
  - `content` (String): HTML content for the modal body.

- **Behavior:**
  - `closeButton` (Boolean): Show or hide the close button (default: `true`).
  - `closeClick` (Boolean): Close the modal on backdrop click (default: `false`).
  - `closeEscape` (Boolean): Close the modal on escape key press (default: `false`).

- **Display:**
  - `displayHeader` (Boolean): Show or hide the modal header (default: `true`).
  - `displayContent` (Boolean): Show or hide the modal content (default: `true`).
  - `displayFooter` (Boolean): Show or hide the modal footer (default: `true`).

- **Actions:**
  - `actions` (Array): Array of action configurations (e.g., buttons).

- **Events:**
  - `onOpening` (Function): Callback when the modal is about to open.
  - `onOpened` (Function): Callback when the modal has opened.
  - `onClosing` (Function): Callback when the modal is about to close.
  - `onClosed` (Function): Callback when the modal has closed.

### Methods

#### `close()`

Closes the modal.

- **Returns:** `void`

### Event Hooks

The configuration object includes hooks for modal events:

- `onOpening`: Triggered before the modal opens.
- `onOpened`: Triggered after the modal opens.
- `onClosing`: Triggered before the modal closes.
- `onClosed`: Triggered after the modal closes.

### Constants

Use the following constants for configuration:

#### MODAL_SIZE

```javascript
export const MODAL_SIZE = {
    "default": "",
    "small": "modal-sm",
    "large": "modal-lg",
    "xlarge": "modal-xl",
};
```

#### MODAL_COLOR

```javascript
export const MODAL_COLOR = {
    "primary": "text-bg-primary",
    "secondary": "text-bg-secondary",
    "success": "text-bg-success",
    "info": "text-bg-info",
    "warning": "text-bg-warning",
    "danger": "text-bg-danger",
    "light": "text-bg-light",
    "dark": "text-bg-dark"
};
```

#### ACTION_COLOR

```javascript
export const ACTION_COLOR = {
    "primary": "btn-primary",
    "secondary": "btn-secondary",
    "success": "btn-success",
    "info": "btn-info",
    "warning": "btn-warning",
    "danger": "btn-danger",
    "light": "btn-light",
    "dark": "btn-dark"
};
```

<a href="https://www.paypal.com/donate/?business=CSQRVLE2D43NU&no_recurring=0&item_name=Buy+me+a+beer%21&currency_code=USD">If you like it buy me a beer!</a>