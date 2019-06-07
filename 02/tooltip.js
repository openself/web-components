class Tooltip extends HTMLElement {
    constructor() {
        super()
        this._tooltipContainer = undefined
        this._tooltipText = "Stub text"
        this.attachShadow({mode: 'open'})
    }

    connectedCallback() {
        const template = `
        <style>
            div {
                background-color: bisque;
                color: darkcyan;
                position: absolute;
                z-index: 10;
            }
        </style>
        <span> (!) </span>
        <slot>Some default slot text</slot>
        `
        this.shadowRoot.innerHTML = template
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text')
        }
        const tooltipIcon = this.shadowRoot.querySelector('span')
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
        this.shadowRoot.appendChild(tooltipIcon)
        this.style.position = 'relative';
    }

    _showTooltip() {
        this._tooltipContainer = document.createElement('div')
        this._tooltipContainer.textContent = this._tooltipText
        this.shadowRoot.appendChild(this._tooltipContainer)
    }

    _hideTooltip() {
        this.shadowRoot.removeChild(this._tooltipContainer)
    }
}

customElements.define('bsn-tooltip', Tooltip)
