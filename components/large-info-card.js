import Button from '@mui/material/Button';

const LargeInfoCard = ({ imgSrc, title, children, button }) => (
    <article className="large-info-card">
        <div className="large-info-card__content">
            <div className="large-info-card__text">
                <h3 className="large-info-card__title">{title}</h3>
                <div className="large-info-card__description">{children}</div>
            </div>
            {button && <Button href={button.link} className="large-info-card__button white-button" variant="contained" size="large">{button.text}</Button>}
        </div>
        <img className="large-info-card__img" src={imgSrc} alt={title} />
    </article>
)

export default LargeInfoCard;