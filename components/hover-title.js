const HoverTitle = ({ title, children }) => (
    <label className="hover-title">
        <div className="hover-title__text">{title}</div>
        {children}
    </label>
)

export default HoverTitle;