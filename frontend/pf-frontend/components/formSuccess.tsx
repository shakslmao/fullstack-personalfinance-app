interface FormMessagingSuccessProps {
    successMessage?: string;
}

export const FormMessagingSuccess = ({ successMessage }: FormMessagingSuccessProps) => {
    if (!successMessage) return null;

    return (
        <div className="bg-white-500/10 p-4 rounded-md flex items-center justify-center gap-x-2 text-center text-sm text-white">
            <p>{successMessage}</p>
        </div>
    );
};
