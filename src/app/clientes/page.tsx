'use client';

//import {useRouter} from "next/navigation";

// const router = useRouter();

// const irParaLojas = () => {
//     router.push('/');
// };

import LazyLoading from "@/components/LazyLoading";

export default function clientes() {
    return(
        <div className="container mx-auto p-4">
            <LazyLoading/>
        </div>
    );
};