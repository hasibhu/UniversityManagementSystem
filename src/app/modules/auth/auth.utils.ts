import jwt, { JwtPayload } from "jsonwebtoken"

export const createToken = (
    jwtpayload: { userId: string; role: string },
    secret: string,
    expiresIn: string
) => {
   return jwt.sign(
        jwtpayload, secret, {expiresIn}
    )
}




export const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret) as JwtPayload
}