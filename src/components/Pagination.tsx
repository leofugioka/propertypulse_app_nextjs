import Link from "next/link";

interface PaginationProps {
  page: number;
  pageSize: number;
  totalItems: number;
}

const Pagination = ({ page, pageSize, totalItems }: Readonly<PaginationProps>) => {
  const lastPage = Math.ceil(totalItems / pageSize);

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      {page === 1 ? null : (
        <Link href={`/properties?page=${page - 1}`} className="mr-2 px-2 py-1 border border-gray-300 rounded">
          Previous
        </Link>
      )}

      <span>
        Page {page} of {lastPage}
      </span>

      {page === lastPage ? null : (
        <Link href={`/properties?page=${page + 1}`} className="ml-2 px-2 py-1 border border-gray-300 rounded">
          Next
        </Link>
      )}
    </section>
  );
};
export default Pagination;
