import Button from '@mui/material/Button';

const InfoCard = ({ imgSrc, title, children, button, variant }) => (
    <article className={"info-card " + (variant === "large" ? "info-card--large" : "")} >
        <img className="info-card__img" src={imgSrc} alt={title} />
        <div className="info-card__content">
            <div className="info-card__text">
                <h3 className="info-card__title">{title}</h3>
                <div className="info-card__description">{children}</div>
            </div>
            {button && <Button href={button.link} className="info-card__button white-button" variant="contained" size="large">{button.text}</Button>}
        </div>
    </article >
)

export default InfoCard;

