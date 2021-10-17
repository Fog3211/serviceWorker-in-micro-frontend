const noop = () => { }

interface InstallProps {
  /** serviceWorker file path */
  path: string
  /** serviceWorker scope */
  scope?: string
  /** successful callback */
  success?: () => void,
  /** fail callback */
  fail?: () => void,
  /** down-cycled callback */
  polyfill?: () => void,
}

const install = ({
  path,
  scope,
  success = noop,
  fail = noop,
  polyfill = noop,
}: InstallProps) => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register(path, { scope }).then(function (registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope)
        success()
      }, function (err) {
        console.error('ServiceWorker registration failed: ', err)
        fail()
      })
    })
  } else {
    console.error('Sorry, Your browser does not support serviceWorker')
    polyfill()
  }
}

