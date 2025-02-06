import { NextApiResponse } from "next";

export const errorhandler = (error: any, res: NextApiResponse) => {
    console.error(error);
    res.status(error.response?.status || 500).json({
        message: error.resonse?.data?.message || "Internal Server Error",
    });
};
