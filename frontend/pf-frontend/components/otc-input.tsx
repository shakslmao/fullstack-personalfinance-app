"use client";

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const ActivationOneTimeCode = () => {
    return (
        <div className="flex items-center justify-center mt-2">
            <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
        </div>
    );
};
export default ActivationOneTimeCode;
