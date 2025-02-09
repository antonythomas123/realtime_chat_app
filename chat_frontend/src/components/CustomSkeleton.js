import { Skeleton } from "@mui/material";
import React from "react";

export const CustomSkeleton = ({ variant, width, height, borderRadius }) => {
  return (
    <Skeleton
      variant={variant}
      width={width}
      height={height}
      sx={{ borderRadius: borderRadius ? borderRadius : "" }}
    />
  );
};
