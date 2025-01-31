
export class Example {
    private _id: string |null;
    private _name: string;
    private _description: string;

  
    constructor(
      id: string|null,
      name: string,
      description:string,

    ) {
      this._id = id;
      this._name = name;
      this._description = description;
   
    }
    get id(): string|null {
     return this._id ??   null;
    }
    get name(): string {
     return this._name;
    }

    get description(): string {
      return this._description;
     }
}
