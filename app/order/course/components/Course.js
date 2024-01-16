import classes from "../page.module.scss";
import "lazysizes";

export default function CourseList({ data: course }) {
  const baseUrl = "/service/";

  return (
    <div className={classes["course"]}>
      <a
        className={classes["course__image"]}
        href={
          course.progress !== null
            ? baseUrl + "course/" + course.slug
            : baseUrl + "session/" + course.slug
        }
      >
        <img className="lazyload" data-src={course.image} alt={course.name} />
        <span
          className={
            classes["course__tag"] +
            " " +
            (course.progress === null
              ? classes["course__tag--stream"]
              : course.tag === null
              ? classes["course__tag--video"]
              : classes["course__tag--physical"])
          }
        >
          {/* {course.progress !== null ? '影片課程' : '直播'} */}
          {course.progress === null
            ? "直播"
            : course.tag === null
            ? "影片課程"
            : "實體課程"}
        </span>
      </a>
      <a
        href={
          course.progress !== null
            ? baseUrl + "course/" + course.slug
            : baseUrl + "session/" + course.slug
        }
        className={classes["course__title"]}
      >
        {course.name}
      </a>
      {course.progress !== null && course.tag === null && (
        <div className={classes["course__progress"]}>
          <span className={classes["course__progress__text"]}>課程進度</span>
          <div className={classes["course__progress__bar"]}>
            <span className={classes["course__progress__track"]}></span>
            <span
              className={classes["course__progress__thumb"]}
              style={{
                width: `${course.progress * 100 + "%"}`,
                maxWidth: "100%",
              }}
            ></span>
          </div>
        </div>
      )}
    </div>
  );
}
