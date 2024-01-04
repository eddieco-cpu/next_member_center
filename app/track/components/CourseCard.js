import classes from "../author/1005/[track_id]/page.module.scss";

export default function CourseCard(props) {
  return (
    <li
      className={`${classes["splide__slide"]} ${classes["card__bottom-left-round__item"]}`}
    >
      <a
        href={`/service/course/${props.slug}`}
        className={`${classes["card__bottom-left-round__content"]}`}
      >
        <picture className={`${classes["card__bottom-left-round__photo"]}`}>
          <img src={`${props.image}`} />
        </picture>
        <h5 className={`${classes["card__bottom-left-round__phase"]}`}>
          {props.name}
        </h5>

        <ul className={`${classes["card__bottom-left-round__list-group"]}`}>
          {props.duration ? (
            <li className={`${classes["card__bottom-left-round__list-item"]}`}>
              影音長度 {Math.ceil((props.duration * 1) / 60)} 分鐘
            </li>
          ) : (
            ""
          )}
          {props.courseType !== "public_access" ? (
            <li
              className={`${classes["card__bottom-left-round__list-item"]} ${classes["card__bottom-left-round__list-item--comparison"]}`}
            >
              原價
              <span>
                NT$
                {props.plans[0]?.compareAtPrice
                  ? props.plans[0]?.compareAtPrice
                  : ""}
              </span>
            </li>
          ) : (
            ""
          )}
          {props.courseType !== "public_access" ? (
            <li
              className={`${classes["card__bottom-left-round__list-item"]} ${classes["card__bottom-left-round__list-item--emphasis"]}`}
            >
              特價
              <span>
                NT$
                <b>
                  {(!props.price
                    ? 0
                    : props.price.includes("$")
                    ? props.price.split("$")[1] * 1
                    : props.price) *
                    1 !==
                  0
                    ? props.price.includes("$")
                      ? props.price.split("$")[1]
                      : props.price
                    : "免費"}
                </b>
              </span>
            </li>
          ) : (
            ""
          )}
        </ul>
      </a>
      <a
        href={`/service/index?type=${
          props.courseType === "public_access" ? "public_access" : "course"
        }`}
        className={`
					${classes["card__bottom-left-round__link"]} 
					${
            props.courseType === "public_access"
              ? classes["card__bottom-left-round__link--pink"]
              : classes["card__bottom-left-round__link--blue"]
          }`}
      >
        {props.courseType === "public_access" ? "熱門影音" : "影片課程"}
      </a>
    </li>
  );
}
