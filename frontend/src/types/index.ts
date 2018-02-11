import * as constants from "../constants";

export interface StoreState {
    appbar: {
        uploadModal: {
            isVisible: boolean;
        },
    };
    routing: {
        location: any;
    };
}

export interface User {
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    phoneNumber: number;
    pictureUrl: string;
    registrationDate: {
        afterNow: boolean;
        beforeNow: boolean;
        equalNow: boolean;
    };
}

export interface Picture {
    id: number;
    createdDate: number;
    description: string;
    mentions: string[];
    url: string;
    userId: string;
}

export interface Pictures {
    data: {
        items: Picture[];
        totalPages: string;
        totalEntries: number;
    }
}
