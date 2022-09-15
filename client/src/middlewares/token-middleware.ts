import { authActions } from "../components/Auth/authSlice";
import { removeTokens } from "../helpers/auth/token-helper";

export const tokenMiddleware = (store: any) => (next: any) => (action: any) => {

    if (authActions.logout.match(action)) {
        removeTokens()
    }

    return next(action);
};