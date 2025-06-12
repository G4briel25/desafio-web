import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";


interface SpinnerLoadingProps {
    message?: string;
}

const SpinnerLoading: React.FC<SpinnerLoadingProps> = ({message}) => {

    return(
        <div className="flex flex-col justify-center items-center h-screen">
            <ProgressSpinner style={{width: '3rem', height: '3rem'}} strokeWidth="5" animationDuration=".8s"/>
            {message && <p className="mt-4 text-lg text-gray-700">{message}</p>}
        </div>
    )
}

export default SpinnerLoading;