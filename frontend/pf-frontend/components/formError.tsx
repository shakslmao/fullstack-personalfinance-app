interface FormMessagingErrorProps {
    errorMessage?: string;
}

export const FormMessagingError = ({ errorMessage }: FormMessagingErrorProps) => {
    if (!errorMessage) return null;

    return (
        <div className="bg-white p-4 rounded-md flex justify-center gap-x-2 text-center text-sm text-white">
            {errorMessage}
        </div>
    );
};
