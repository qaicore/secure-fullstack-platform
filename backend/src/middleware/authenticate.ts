export function authenticate(req: Request, res: Response, next: NextFunction) {
    // 1. read req.headers.authorization
    // 2. if missing or doesn't start with "Bearer " → 401 "No token provided"
    // 3. extract the token (slice off "Bearer ")
    // 4. try {
    //      verify token with secret → get payload
    //      attach payload to req.user
    //      call next()
    //    } catch {
    //      → 401 "Invalid or expired token"
    //    }
  }