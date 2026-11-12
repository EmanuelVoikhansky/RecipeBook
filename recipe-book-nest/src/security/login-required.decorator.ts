import { SetMetadata } from '@nestjs/common';

export const LOGIN_REQUIRED = 'loginRequired';

/** Marks a query or mutation as needing a logged-in caller; enforced by LoginGuard. */
export const LoginRequired = () => SetMetadata(LOGIN_REQUIRED, true);
