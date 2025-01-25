interface FormLoadingProps {
    loadingMessage?: string;
}

export const FormLoadingState = ({ loadingMessage }: FormLoadingProps) => {
    if (!loadingMessage) return null;

    return (
        <div className="bg-white-500/10 p-4 rounded-md flex flex-col items-center justify-center text-center text-sm text-white">
            <p>{loadingMessage}</p>
            <div className="mt-4">{/* add spinner */} </div>
        </div>
    );
};
