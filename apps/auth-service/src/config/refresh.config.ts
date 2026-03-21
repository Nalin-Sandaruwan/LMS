import { registerAs } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";

export default registerAs('refresh-Jwt', ():JwtModuleOptions =>({
    secret: process.env.REFRESH_JWT_SECRET ,
    signOptions:{
        expiresIn: '7d',
    }
}))