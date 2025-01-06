export enum ActionEnum {
    LOGIN = "login",
    FORM_INTERACTION = "form_interaction",
    SET_STATE = "set_state",
    FETCH_STATE = "fetch_state",
    LOG_OUT = "log_out",
    CHECK_CREDENTIALS = "check_credentials",
    OTP_VERIFICATION = "otp_verification",
    FETCH_SECRETS = "fetch_secrets",
    CREATE_SECRET = "create_secret",
}

export enum StorageEnum {
    LOCAL = "local",
    SESSION = "session",
    INDEXEDDB = "index",
}
