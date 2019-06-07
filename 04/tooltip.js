class Tooltip extends HTMLElement {
    constructor() {
        super()
        this._tooltipContainer = undefined
        this._tooltipVisible = false
        this._tooltipText = "Stub text"
        this.attachShadow({mode: 'open'})
        this._tooltipIcon = undefined
    }

    connectedCallback() {
        const template = `
        <style >
            div {
                background-color: bisque;
                color: var(--color-secondary, darkcyan);
                position: absolute;
                z-index: 10;
                font-weight: normal;
                top: 1.5rem;
                left: 2rem;
                padding: 0.15rem;
                border-radius: 3px;
                box-shadow: 1px 1px 6px rgba(0,0,0,0.2);
            }
            ::slotted(.highlignt) {
            background-color: red; /* overwrited by lightDOM style */
            color: red;
            }
            :host(.special) {
                border: indianred solid 2px;
            }
            :host(.first-custom) {
                font-weight: bold;
            }
            :host {
                position: relative;
            }
            .icon {
                background: var(--color-primary, khaki);
                padding: 0.1rem 0.5rem;
                border-radius: 50%;
                border: black solid 1px;
            }
        </style>
        <span  class="icon">!</span>
        <slot>Some default slot text</slot>
        `
        this.shadowRoot.innerHTML = template
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text')
        }
        this._tooltipIcon = this.shadowRoot.querySelector('span')
        this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
        this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
        this._render()
    }

    disconnectedCallback() {
        this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip)
        this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip)
    }

    _render() {
        if (this._tooltipVisible) {
            this._tooltipContainer = document.createElement('div')
            this._tooltipContainer.textContent = this._tooltipText
            this.shadowRoot.appendChild(this._tooltipContainer)
        } else {
            if (this._tooltipContainer) {
                this.shadowRoot.removeChild(this._tooltipContainer)
                this._tooltipContainer = undefined
            }
        }
    }

    _showTooltip() {
        this._tooltipVisible = true
        this._render()
    }

    _hideTooltip() {
        this._tooltipVisible = false
        this._render()
    }
}

customElements.define('bsn-tooltip', Tooltip)
