"use client";

import ActivationOneTimeCode from "components/otc-input";
import { Button, buttonVariants } from "components/ui/button";
import { useRouter } from "next/navigation";

export const AccountActivationForm = () => {
    const router = useRouter();
    const handleOnClick = () => {
        router.push("/auth/login");
    };
    const handlePreviousOnClick = () => {
        router.back();
    };
    const requestNewToken = () => {};

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[350px] px-6 py-8">
                <div className="flex flex-col items-center space-y-6 text-center">
                    <h1 className="text-6xl font-bold text-center">Enter Authentication Code</h1>

                    <ActivationOneTimeCode />

                    <p className="text-sm text-center text-white mt-4">
                        Haven't received an authentication code? <br /> Request a new one here.
                    </p>
                    <Button
                        onClick={() => requestNewToken()}
                        className={buttonVariants({
                            variant: "ghost",
                            className: "w-full py-3 text-black rounded-lg",
                            size: "sm",
                        })}>
                        Send New Code
                    </Button>
                </div>

                <div className="flex justify-between w-full gap-4">
                    <Button
                        onClick={() => handlePreviousOnClick()}
                        className={buttonVariants({
                            variant: "ghost",
                            className: "w-full py-3 bg-white rounded-lg",
                            size: "sm",
                        })}>
                        Previous
                    </Button>
                    <Button
                        onClick={() => handleOnClick()}
                        className={buttonVariants({
                            variant: "ghost",
                            className: "w-full py-3 bg-white rounded-lg",
                            size: "sm",
                        })}>
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    );
};
