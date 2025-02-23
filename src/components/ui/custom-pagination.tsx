import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  
  export function CustomPagination({
    activeIndex,
    nextCall,
    pageNumbers,
    prevCall,
    handlePageCall,
  }: {
    activeIndex: number,
    nextCall: () =>  void,
    prevCall: () => void,
    pageNumbers: number[],
    handlePageCall: (pageNo: number) => void
  }) {
    
    return (
      <Pagination className="py-2 my-2">
        <PaginationContent>
          <PaginationItem key={"prev"}>
            <PaginationPrevious onClick={prevCall} className="cursor-pointer" />
          </PaginationItem>
          {pageNumbers.map((val, index) => (
          <PaginationItem key={val}>
            <PaginationLink className="cursor-pointer" key={val} onClick={() => handlePageCall(val)} isActive={index == activeIndex}>{val}</PaginationLink>
          </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem key={"next"}>
            <PaginationNext onClick={nextCall} className="cursor-pointer"/>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }
  