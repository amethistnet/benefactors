import type { Metadata } from "next";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { DiscordLoginOverlay, getObjects, ObjectsPageComponent } from "~/modules";
import { auth } from "~/server/auth";
import type { ObjectResponse } from "~/types/ObjectResponse";

export const metadata: Metadata = {
    title: "Objects - Benefactors",
    description: "List of objects you can contribute to.",
};

export default async function ObjectsPage() {
    const session = await auth();
    if (session == null) return <DiscordLoginOverlay />;

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<ObjectResponse>({
        queryKey: ["objects"],
        queryFn: getObjects,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ObjectsPageComponent />
        </HydrationBoundary>
    );
}
