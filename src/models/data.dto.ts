export interface Entry {
    platform: string;
    username: string;
    externalUid?: any;
}

export interface Data {
    internalId: number;
    uid: string;
    username: string;
    entries: Entry[];
}

export interface PlayerAccountInfoDTO {
    data: Data;
}