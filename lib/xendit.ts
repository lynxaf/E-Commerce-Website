import { Xendit } from "xendit-node"

const getXenditClient = () => {
    const secretKey = process.env.XENDIT_SECRET_KEY
    if (!secretKey) {
        throw new Error("XENDIT_SECRET_KEY is required")
    }
    return new Xendit({ secretKey })
}

export default getXenditClient