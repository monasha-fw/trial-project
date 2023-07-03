export default interface UseCase<T, K> {
  invoke: (data: K) => Promise<T>;
}
