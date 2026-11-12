import 'express-session';

// What ViewerContext stores in the server-side session (HttpSession attributes in Java).
declare module 'express-session' {
  interface SessionData {
    token?: string;
    userId?: number;
  }
}
