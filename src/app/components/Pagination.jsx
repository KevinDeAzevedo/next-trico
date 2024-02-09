'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({ paginationData }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPage = searchParams.get('page') * 1; // get the number param URL and make it type number
  const arrayPages = Array.from(
    { length: paginationData.pageCount },
    (_, i) => i + 1
  );
  return (
    <div>
      <ul className="pagination">
        {/* PREVIOUS BUTTON */}
        <li
          className={selectedPage > 1 ? 'action-btn' : 'action-btn disable'}
          onClick={
            selectedPage === 1
              ? null
              : () => router.push(`/news?page=${selectedPage - 1}`)
          }
        >
          préc.
        </li>
        {/* LAST PAGE NUMBER */}
        {selectedPage != 1 ? (
          <li
            className="num"
            onClick={() => router.push(`/news?page=${selectedPage - 1}`)}
          >
            {selectedPage - 1}
          </li>
        ) : null}
        {/* PAGE ACTIVE */}
        {arrayPages
          .slice(selectedPage - 1, selectedPage + 1)
          .map((pageNumber, index) => (
            <li
              className={selectedPage === pageNumber ? 'num active' : 'num'}
              key={index}
              type="button"
              onClick={() => router.push(`/news?page=${pageNumber}`)}
            >
              {pageNumber}
            </li>
          ))}
        {/* DOTS ... */}
        {selectedPage < paginationData.pageCount - 1 ? (
          <>
            <li className="dots">...</li>
            <li
              className="num"
              onClick={() => router.push(`/news?page=${arrayPages.length}`)}
            >
              {paginationData.pageCount}
            </li>
          </>
        ) : null}
        {/* NEXT BUTTON */}
        <li
          className={
            selectedPage === paginationData.pageCount
              ? 'action-btn disable'
              : 'action-btn'
          }
          onClick={
            selectedPage === paginationData.pageCount
              ? null
              : () => router.push(`/news?page=${selectedPage + 1}`)
          }
        >
          suiv.
        </li>
      </ul>
    </div>
  );
}
