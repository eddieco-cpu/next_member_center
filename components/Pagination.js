"use client"

import React, { useState, useEffect, Fragment } from 'react'
import { useRouter, useSearchParams, usePathname } from "next/navigation";

//
export default function Pagination({ total: totalPage }) {
	// const { pageId } = useParams()
	// const { pathname } = useLocation()
	// const navigate = useNavigate()

	const currentPath = pathname.split('/')[1]
	const [pages, setPages] = useState([])

	useEffect(() => {
		// console.log('PAGINATION', collectionData)
		setPages(() => {
			const pageIdInt = parseInt(pageId)
			const pagesList = Array(totalPage)
				.fill(null)
				.map((_, key) => key + 1)
			if (totalPage <= 5) return pagesList
			if (pageIdInt <= 3) return pagesList.slice(0, 5)
			if (pageIdInt > 3 && pageIdInt + 2 <= totalPage)
				return pagesList.slice(pageIdInt - 3, pageIdInt + 2)
			return pagesList.slice(-5)
		})
	}, [totalPage])

	return (
		// <Fragment> == <>, 但是可以存 key 的屬性&值 (only 'key' props )
		<Fragment>
			{totalPage && (
				<PaginationContainer>
					<button
						onClick={() => {
							navigate(`/${currentPath}/1`)
						}}
						className={`pagination__btn ${pageId > 1 && totalPage > 1
								? 'enable pagination__btn--first'
								: 'pagination__btn--first'
							}`}
					>
						最前頁
					</button>
					<button
						onClick={() => {
							navigate(`/${currentPath}/${parseInt(pageId) - 1}`)
						}}
						className={`pagination__btn ${pageId > 1 && totalPage > 1
								? 'pagination__btn--prev enable'
								: 'pagination__btn--prev'
							}`}
					>
						上一頁
					</button>
					<div className="pagination__wrapper">
						<span
							className={`pagination--hint ${pages[0] !== 1 ? 'show' : ''}`}
						>
							...
						</span>
						{pages.map((page, pageKey) => (
							<button
								key={pageKey}
								onClick={() => {
									navigate(`/${currentPath}/${page}`)
								}}
								className={`pagination__number ${pageId == page ? 'active' : ''
									} ${pageKey + 1 === pages.length ? 'last' : ''} ${page > 999 ? 'small' : ''
									}`}
							>
								{page}
							</button>
						))}
						<span
							className={`pagination--hint ${pages[pages.length - 1] !== totalPage ? 'show' : ''
								}`}
						>
							...
						</span>
					</div>
					<button
						onClick={() => {
							navigate(`/${currentPath}/${parseInt(pageId) + 1}`)
						}}
						className={`pagination__btn ${pageId < totalPage && totalPage > 1
								? 'pagination__btn--next enable'
								: 'pagination__btn--next'
							}`}
					>
						下一頁
					</button>
					<button
						onClick={() => {
							navigate(`/${currentPath}/${totalPage}`)
						}}
						className={`pagination__btn ${pageId < totalPage && totalPage > 1
								? 'enable pagination__btn--last'
								: 'btn pagination__btn--last'
							}`}
					>
						最後頁
					</button>
					<div className="pagination__total">
						共 <span>{totalPage}</span> 頁
					</div>
				</PaginationContainer>
			)}
		</Fragment>
	)
}
