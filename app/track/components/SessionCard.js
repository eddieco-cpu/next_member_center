import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-tw";
dayjs.extend(relativeTime);
dayjs.locale("zh-tw");

var isNumber = require("is-number");

import classes from "@track/page.module.scss";

export default function SessionCard(props) {
  const timesLong =
    (dayjs(props.endedAt.$date.$numberLong * 1) -
      dayjs(props.startedAt.$date.$numberLong * 1)) /
    60 /
    1000;
  return (
    <li
      className={`${classes["splide__slide"]} ${classes["card__bottom-left-round__item"]}`}
    >
      <a
        href={`/service/session/${props.slug}`}
        className={`${classes["card__bottom-left-round__content"]}`}
      >
        <picture className={`${classes["card__bottom-left-round__photo"]}`}>
          <img src={`${props.image}`} />
        </picture>
        <h5 className={`${classes["card__bottom-left-round__phase"]}`}>
          {props.name}
        </h5>

        <ul className={`${classes["card__bottom-left-round__list-group"]}`}>
          <li className={`${classes["card__bottom-left-round__list-item"]}`}>
            影音長度{timesLong}分鐘
          </li>
          {isNumber(props.tickets[0]?.amount) ? (
            <li
              className={`${classes["card__bottom-left-round__list-item"]} ${classes["card__bottom-left-round__list-item--comparison"]}`}
            >
              原價
              <span>NT$ {props.tickets[0].amount}</span>
            </li>
          ) : (
            ""
          )}
          {isNumber(props.tickets[1]?.amount) ? (
            <li
              className={`${classes["card__bottom-left-round__list-item"]} ${classes["card__bottom-left-round__list-item--emphasis"]}`}
            >
              特價
              <span>
                NT$ <b>{props.tickets[1].amount}</b>
              </span>
            </li>
          ) : (
            ""
          )}
        </ul>
      </a>
      <a
        href="/service/index?type=session"
        className={`${classes["card__bottom-left-round__link"]} ${classes["card__bottom-left-round__link--green"]}`}
      >
        直播
      </a>
    </li>
  );
}
