import {
  Pagination,
  PaginationPrevious,
  PaginationItem,
  PaginationContent,
  PaginationNext,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function PaginationBar({ currentPage, totalPages, onPageChange }: PaginationBarProps) {
  return (
    <Pagination className="my-16">
      <PaginationContent className="list-none">
        <PaginationItem className="">
          <button
            className="hover:bg-gray-300 rounded-sm disabled:opacity-50 disabled:hover:bg-transparent"
            disabled={currentPage === 0}
          >
            <PaginationPrevious className="bg-transparent hover:bg-transparent">Previous</PaginationPrevious>
          </button>
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationItem className="mx-2" key={i}>
            <button
              disabled={currentPage === i}
              onClick={() => onPageChange(i)}
              className={cn(
                'hover:bg-gray-300 px-2.5 pb-1 rounded-sm ',
                currentPage === i && 'outline-primary outline-1 outline-double',
              )}
            >
              {i + 1}
            </button>
          </PaginationItem>
        ))}

        <PaginationItem>
          <button
            className="hover:bg-gray-300 rounded-sm disabled:opacity-50 disabled:hover:bg-transparent"
            disabled={currentPage >= totalPages - 1}
          >
            <PaginationNext className="bg-transparent hover:bg-transparent">Next</PaginationNext>
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationBar;
