import classes from "../author/1005/[track_id]/page.module.scss";

export default function ArticleCard(props) {
  return (
    <li className={`${classes["card__style--photo-on-top"]}`}>
      <a href={`/health/story/${props.sub_id}/${props.art_id}`}>
        <picture>
          <img src={`${props.photo.url}`} alt={`${props.photo.desc}`} />
        </picture>
        <h3>{`${props.art_title}`}</h3>
      </a>
    </li>
  );
}
