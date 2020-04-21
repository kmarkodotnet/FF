export class AgGridUserButtonOperation {
    modifyUser: (item: any) => void;
    deleteUser: (item: any) => void;
    modifyUserIsVisible: (item: any) => boolean;
    deleteUserIsVisible: (item: any) => boolean;
    
    getCss: () => string;
    getContent: () => string;
}