export function mapDtoToPrismaData<T>(dto: T, fields: (keyof T)[]): any {
    const data: any = {};
    
    for (const field of fields) {
      if (dto[field] !== undefined) {
        data[field] = dto[field];
      }
    }
  
    return data;
  }