const CardImg = (props) => {
    if (props.imageUrl)
        return <img className={props.className} alt={props.alt} src={props.imageUrl} />
    else
        return <img className={props.className} alt={props.alt} src="/images/empty-card.svg" />
}

export default CardImg;