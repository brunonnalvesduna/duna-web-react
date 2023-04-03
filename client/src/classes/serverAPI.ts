export class serverAPI 
{
    private url: string;
    private options: any;
    constructor()
    {
        this.url = '/api';
        this.options = 
        {
            method: 'GET'
        }
    }


    async getFiles() :Promise<Array<string>>
    {
        var fileList: Array<string>;

        fileList = new Array<string>;
        const response = await fetch(this.url,this.options);
        const data = await response.json();

        
        return data;

    }
}