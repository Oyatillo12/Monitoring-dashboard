"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSpirits } from "../api/spirit-api";

export function useSpiritsQuery() {
  return useQuery({
    queryKey: ["spirits"],
    queryFn: fetchSpirits,
    refetchInterval: false, // We use SSE for updates
  });
}

