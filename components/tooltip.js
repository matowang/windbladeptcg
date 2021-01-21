/*
Types:
- default
- dangerous
*/


const Tooltip = ({ title, children, type }) => (
    <label className="tooltip">
        <div className={`tooltip__text tooltip__text--${type.toLowerCase()}`}>{title}</div>
        {children}
    </label>
)

export default Tooltip;