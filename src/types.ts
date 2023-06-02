/**
 * 타입정보 더 예쁘게(구체적으로) 만들어 주는 유틸 타입
 */
type Pretty<T> = T extends infer U ? { [K in keyof U]: U[K] } : never

/**
 * 분배법칙이 적용되는 Omit 유틸 타입
 */
type DistributiveOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never

/**
 * 원하는 타입으로 기존 타입 덮어씌우는 유틸 타입
 */
export type Assign<T, U> = Pretty<DistributiveOmit<T, keyof U> & U>

/**
 * 옵셔널로 만들고 싶은 타입만 옵셔널로 바꿔주는 유틸 타입
 */
export type Optional<T, K extends keyof T> = Pretty<Pick<Partial<T>, K> & Omit<T, K>>
