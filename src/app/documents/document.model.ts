export class Document {
  public _id?: string;
  public id!: string;

  constructor(
    public name: string,
    public url?: string,
    public description?: string,
    public children?: Document[],
  ) {}
}
