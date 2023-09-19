import Link from 'next/link';

export interface PaginationControlProps {
  currentPage: number;
  pageCount: number;
  path: string;
}

export function PaginationControl({
  currentPage,
  pageCount,
  path,
}: PaginationControlProps) {
  const pages = Array.from(Array(pageCount + 1).keys()).filter((n) => n !== 0);

  return (
    <nav className="my-4 text-2xl">
      {currentPage > 1 ? (
        <Link
          href={`${path}/${currentPage - 1}`}
          className="inline-block decoration-2 hover:underline"
        >
          {'<<'}
        </Link>
      ) : (
        <div className="text-textSecondary dark:text-textSecondaryDark inline-block">
          {'<<'}
        </div>
      )}
      <ol className="inline-block">
        {pages.map((page) => (
          <li key={page} className="mx-2 inline-block">
            {page !== currentPage ? (
              <Link
                className=" decoration-2 hover:underline"
                href={`${path}/${page}`}
              >
                {page}
              </Link>
            ) : (
              <div className="text-textSecondary dark:text-textSecondaryDark">
                {page}
              </div>
            )}
          </li>
        ))}
      </ol>
      {currentPage < pageCount ? (
        <Link
          href={`${path}/${currentPage + 1}`}
          className="inline-block decoration-2 hover:underline"
        >
          {'>>'}
        </Link>
      ) : (
        <div className="text-textSecondary dark:text-textSecondaryDark inline-block">
          {'>>'}
        </div>
      )}
    </nav>
  );
}
