let promise: Promise<void>
export default () => {
  if (promise) return promise
  // https://github.com/jquery/jquery/blob/master/src/core/ready.js
  // https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState
  promise = new Promise((resolve, reject) => {
    const markLoaded = () => {
      document.removeEventListener('DOMContentLoaded', markLoaded)
      resolve()
    }

    if (document.readyState !== 'loading') {
      resolve()
    } else {
      document.addEventListener('DOMContentLoaded', markLoaded)
    }
  })
  return promise
}
