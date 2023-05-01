export interface IMapper<TSource, TDestination> {
  toDomainModel(source: TSource): TDestination

  toPersistenceEntity(destination: TDestination): TSource
}
