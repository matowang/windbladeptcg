const CardImg = (props) => {
    if (props.imageUrl)
        return <img {...props} src={props.imageUrl} />
    else
        return <img {...props} src="/images/empty-card.svg" />
}

export default CardImg;