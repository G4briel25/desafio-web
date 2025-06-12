import {Skeleton} from 'primereact/skeleton';
import React from "react";


const LazyLoading = () => {
    return(
        <div className="flex flex-col h-[830px] justify-between">
            <div>
                <Skeleton height="3rem" width="10rem" className="mb-5"></Skeleton>
                <Skeleton height="2rem" width="20rem" className="mb-5"></Skeleton>
                <Skeleton height="14rem" className="mb-16"></Skeleton>
                <div className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                    <Skeleton className="mb-5 skeleton-responsive"></Skeleton>
                    <Skeleton className="mb-5 skeleton-responsive"></Skeleton>
                    <Skeleton className="mb-5 skeleton-responsive"></Skeleton>
                </div>
            </div>
            <Skeleton height="5rem" className="mt-5"></Skeleton>
        </div>
    )
}

export default LazyLoading;