"use client";

import { useQuery } from "@tanstack/react-query";
import type { ObjectResponse } from "~/types/ObjectResponse";

export function useObjects() {
    const { data, isLoading } = useQuery<ObjectResponse[]>({
        queryKey: ["objects"],
        queryFn: getObjects,
    });

    return {
        data,
        isLoading,
    };
}

export function getObjects() {
    return fetch(`/api/objects`).then((res) => res.json());
}
