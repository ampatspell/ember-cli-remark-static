let targets = new WeakMap();

export const oncePromise = (_target, key, descriptor) => {
  return {
    value() {
      let target = targets.get(this);
      if(!target) {
        target = Object.create(null);
        targets.set(this, target);
      }
      let promise = target[key];
      if(!promise) {
        promise = descriptor.value.call(this);
        target[key] = promise;
      }
      return promise;
    }
  }
}
