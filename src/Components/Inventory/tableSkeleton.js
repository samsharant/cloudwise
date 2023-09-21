import { Box, Skeleton } from "@mui/material";

export function renderTableSkeleton() {
  return (
    <Box sx={{ width: "100%", marginTop: "20px" }}>
      <Skeleton variant="rectangular" height={80} />
      <Skeleton animation="wave" height={50} />
      <Skeleton animation={false} height={50} />
      <Skeleton animation="wave" height={50} />
      <Skeleton animation={false} height={50} />
      <Skeleton animation="wave" height={50} />
      <Skeleton animation={false} height={50} />
      <Skeleton animation="wave" height={50} />
      <Skeleton animation={false} height={50} />
      <Skeleton animation="wave" />
    </Box>
  );
}
