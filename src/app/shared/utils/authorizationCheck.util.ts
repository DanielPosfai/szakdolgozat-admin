export class AuthUtil {

    static checkAuthorization(): boolean {

        if (sessionStorage.getItem('token')) {
            return true;
        }
        return false;
    }

}
