export interface DatabaseWrapper {
  findOne(query: object): Promise<any>;
  insertOne(doc: any): Promise<any>;
  updateOne(filter: any, doc: any): Promise<any>;
}
