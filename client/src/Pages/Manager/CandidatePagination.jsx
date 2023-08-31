import React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";

const CandidatePagination = ({
  totalPages,
  currentPage,
  onPageChange,
  sortedCandidates, // Receive the sortedCandidates prop
}) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        color="secondary"
        size="small"
        sx={{ marginLeft: "auto" }}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={{
              color: currentPage === item.page ? "#ad2069" : "#ad2069",
              "&:hover": {
                backgroundColor: "transparent", // Remove background color on hover
              },
            }}
          />
        )}
      />
    </Stack>
  );
};

export default CandidatePagination;
