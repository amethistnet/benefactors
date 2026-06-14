"use client";

import { useRouter } from "next/navigation";
import { Image, Progress, Text } from "@mantine/core";
import { Routes } from "~/constants/routes";
import type { ObjectResponse } from "~/types/ObjectResponse";

import styles from "./ObjectCard.module.scss";

interface ObjectCardProps {
    object: ObjectResponse;
}

export function ObjectCard({ object }: ObjectCardProps) {
    const router = useRouter();

    const verified_chipped_in = object.chips
        .filter((x) => x.verified)
        .reduce((acc, chip) => acc + Number(chip.czk_amount), 0);

    const unverified_chipped_in = object.chips
        .filter((x) => !x.verified)
        .reduce((acc, chip) => acc + Number(chip.czk_amount), 0);

    const total_chipped_in = object.chips.reduce((acc, chip) => acc + Number(chip.czk_amount), 0);

    return (
        <div className={styles.card} onClick={() => router.push(Routes.OBJECT(object.id))}>
            {object.imageUrl && (
                <Image src={object.imageUrl} alt="" className={styles.image} width={512} height={512} />
            )}
            <Text className={styles.name}>{object.name}</Text>
            <Text className={styles.price_czk}>{object.total_price} CZK</Text>
            <Progress.Root h={"xl"}>
                <Progress.Section
                    value={(unverified_chipped_in / object.total_price) * 100}
                    color="orange"
                    animated={unverified_chipped_in < object.total_price}
                >
                    <Progress.Label ml={0} mr={"auto"}>
                        <Text c="white" fw={700} fz="sm" className={styles.progressLabel}>
                            {unverified_chipped_in.toFixed(2)} CZK
                        </Text>
                    </Progress.Label>
                </Progress.Section>

                <Progress.Section
                    value={(verified_chipped_in / object.total_price) * 100}
                    color="green"
                    animated={verified_chipped_in < object.total_price}
                >
                    <Progress.Label ml={0} mt={0} mr={"auto"}>
                        <Text c="white" fw={700} fz="sm" className={styles.progressLabel}>
                            {verified_chipped_in.toFixed(2)} CZK
                        </Text>
                    </Progress.Label>
                </Progress.Section>
                <Progress.Section
                    value={((object.total_price - total_chipped_in) / object.total_price) * 100}
                    color="black"
                >
                    <Progress.Label mr={0} mt={0} ml={"auto"}>
                        <Text c="red" fw={700} fz="sm" className={styles.progressLabel}>
                            {(object.total_price - total_chipped_in).toFixed(2)} CZK left
                        </Text>
                    </Progress.Label>
                </Progress.Section>
            </Progress.Root>
        </div>
    );
}
