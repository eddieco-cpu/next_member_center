
import Link from 'next/link'
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;

import classes from "../page.module.scss";

const navData = [
	{
		title: '退休力',
		icon: "/level.png",
		href: '/retirement'
	},
	{
		title: '訂單管理',
		icon: "/money.png",
		href: '/order'
	},
	{
		title: '我的最愛',
		icon: "/heart.png",
		href: '/collection'
	},
	{
		title: '常見問題',
		icon: "/question.png",
		href: 'https://health.udn.com/health/faq'
	},
	{
		title: '注意事項',
		icon: "/user.png",
		href: '/rights'
	},
	{
		title: '個人資料',
		icon: "/setting.png",
		href: '/user/profile' 
	}
]

const NavTag = ({ href, className, children }) => {
	const isOuterLink = /http/.test(href)
	return (
		isOuterLink ? <a {...{className, href}} >{children}</a> : <Link {...{className, href}}>{children}</Link>
	)
}
	


export default function UserNav() {
	return (
		<nav className={classes["nav__item-list"]}>
			{
				navData.map(({title, icon, href}, index) => (
					//
					<NavTag key={index} href={href} className={classes.nav__item}>
						<img src={BASE_PATH + "/images" + icon} alt={title} />
						<h3>{title}</h3>
					</NavTag>
				))
			}
		</nav>
	)
}


