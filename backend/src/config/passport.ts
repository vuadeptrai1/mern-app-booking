import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import config from "./config";

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

console.log("jwt", jwtOptions);
const verifyJwt = async (payload: any, done: any) => {};

export const jwtStrategy = new JwtStrategy(jwtOptions, verifyJwt);
