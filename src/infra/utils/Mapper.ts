export interface IMapper<TSource, TDestination> {
  toDomainEntity(source: TSource): TDestination
  toPersistenceModel(destination: TDestination): TSource
}

export class Mapper {
  static toDomainEntity<TSource, TDestination>(
    source: TSource,
    mappingFunction: (source: TSource) => TDestination
  ): TDestination {
    return mappingFunction(source)
  }

  static toPersistenceModel<TSource, TDestination>(
    destination: TDestination,
    mappingFunction: (destination: TDestination) => TSource
  ): TSource {
    return mappingFunction(destination)
  }
}
