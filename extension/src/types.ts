export type SignUpType = {
    email: string;
    password: string;
};

export type LabelType = {
    selector: "id" | "class" | "name" | "tag" | "placeholder" | "title";
    label: string;
};
export interface Credential {
    // id: string;
    key: string;
    value: string;
    type: string;
    label: LabelType;
}
