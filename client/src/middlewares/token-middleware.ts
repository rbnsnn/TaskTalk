import { authActions } from "../components/Auth/authSlice";
import { removeToken } from "../helpers/auth/token-helper";

export const tokenMiddleware = (store: any) => (next: any) => (action: any) => {

    if (authActions.logout.match(action)) {
        removeToken()
    }

    if (action['auth/login']) {
        console.log('login')
    }

    return next(action);
};