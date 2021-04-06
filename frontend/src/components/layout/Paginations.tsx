import React from 'react'

type Props = {
  postsPerPage: number
  totalPosts: number
  paginate: (pageNumber: number) => void
}

const Paginations = ({ postsPerPage, totalPosts, paginate }: Props) => {
  const pageNumbers: number[] = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div>
      <ul>
        {pageNumbers.map((number: number) => (
          <li key={number}>
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Paginations
