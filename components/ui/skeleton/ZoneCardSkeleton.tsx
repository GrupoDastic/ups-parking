import React from "react";
import Skeleton from "@/components/ui/skeleton/Skeleton";

interface ZoneCardSkeletonProps {
    width: number;
    className?: string;
}

const ZoneCardSkeleton: React.FC<ZoneCardSkeletonProps> = ({
                                                               width,
                                                               className,
                                                           }) => (
    <Skeleton
        width={width}
        height={125}
        borderRadius={18}
        className={className}
    />
);

export default React.memo(ZoneCardSkeleton);
