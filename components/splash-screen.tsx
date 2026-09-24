import { Logo } from './logo'

// Pure CSS splash: no React state, so no hydration mismatch and no JS needed to dismiss it.
// The inline script marks the session before first paint; later loads in the same session
// (and all client-side navigations, since this lives in the root layout) skip it.
const seenScript = `try{sessionStorage.getItem('kc-splash')?document.documentElement.dataset.splash='seen':sessionStorage.setItem('kc-splash','1')}catch(e){}`

export function SplashScreen() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: seenScript }} />
      <div className="splash" aria-hidden="true">
        <Logo className="splash-logo" />
        <span className="splash-rule" />
      </div>
    </>
  )
}
