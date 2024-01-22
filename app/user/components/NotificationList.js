import React from 'react'

export default function NotificationList({ data }) {
	//const { readNotification } = useContext(NotificationContext)
  //const { pathname } = useLocation()
  const notificationPageJudge = false; //--> /notification/.test(pathname)
	const { link, text, time, read, id } = data

	const handleNotificationLinkClick = () => {}

  return (
    <ul>
      <div className={!read ? 'messenge unread' : 'messenge'}>
        <p className="marker">．</p>
        <p
          className="messenge__link"
          target="_blank"
          // onClick={handleNotificationLinkClick}
        >
          <span className={notificationPageJudge ? null : 'one-line'}>
            {text}
          </span>
          <time>{dayjs().to(dayjs(time.timestamp * 1000))}</time>
        </p>
      </div>
    </ul>
  )
}
