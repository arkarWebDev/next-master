import { cn } from "@/lib/utils";
import Link from "next/link";

type PaginationProps = {
  page?: string;
  totalPages: number;
  hasNextPage: boolean;
};

const Pagination = (props: PaginationProps) => {
  const { page = 1, totalPages, hasNextPage } = props;

  const currentPage = Math.min(Math.max(Number(page), 1), totalPages);

  const pagesToShow = () => {
    let startPage = currentPage - 2;
    let endPage = currentPage + 2;

    if (currentPage <= 3) {
      (startPage = 1), (endPage = Math.min(5, currentPage));
    } else if (currentPage >= totalPages - 2) {
      (startPage = totalPages - 4), (endPage = Math.max(totalPages - 4, 1));
    }

    return Array.from(
      {
        length: endPage - startPage + 1,
      },
      (_, i) => startPage + i
    );
  };

  const pages = pagesToShow();

  return (
    <div className="flex items-center justify-center space-x-4 text-black">
      <button
        className={cn(
          "rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-50",
          currentPage === 1 ? "pointer-events-none bg-gray-50" : ""
        )}
        disabled={currentPage === 1}
      >
        <Link href={`?page=${currentPage - 1}`}>Previous</Link>
      </button>
      <nav aria-label="pagination">
        {pages.map((p, i) => (
          <Link
            href={`?page=${p}`}
            key={p}
            className={cn(
              "relative inline-flex items-center border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50",
              p === currentPage ? "pointer-events-none bg-gray-100" : "",
              i === 0 ? "rounded-l-md" : "",
              i === pages.length - 1 ? "rounded-r-md" : ""
            )}
          >
            {p}
          </Link>
        ))}
      </nav>
      <button
        className={cn(
          "rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-50",
          !hasNextPage ? "pointer-events-none bg-gray-50" : ""
        )}
        disabled={!hasNextPage}
      >
        <Link href={`?page=${currentPage + 1}`}>Next</Link>
      </button>
    </div>
  );
};

export default Pagination;
