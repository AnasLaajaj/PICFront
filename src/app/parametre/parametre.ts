export class Parametre {
    private parametreId: number;
    private parametreName: string;
    private parametreValue: string;
    private parametreType: String;

    constructor(parametreName: string,parametreType: string, parametreValue: string)
    {
        this.parametreName = parametreName
        this.parametreType = parametreType;
        this.parametreValue = parametreValue;
    }
}
