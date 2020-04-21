export class AgGridEntityButtonOperation {
    modifyEntity: (item: any) => void;
    deleteEntity: (item: any) => void;
    viewEntity: (item: any) => void;
    cloneEntity: (item: any) => void;

    modifyEntityIsVisible: (item: any) => boolean;
    deleteEntityIsVisible: (item: any) => boolean;
    viewEntityIsVisible: (item: any) => boolean;
    cloneEntityIsVisible: (item: any) => boolean;
    
    getCss: () => string;
    getContent: () => string;
}