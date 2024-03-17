import { Suspense } from 'react'
import { LoginPage, SignUpPage } from './modules'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from './routers'

function App() {

  return (
    <div className='body'>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={ROUTES.login} Component={LoginPage}/>
          <Route path={ROUTES.signUp} Component={SignUpPage}/>
          <Route path={'/'} Component={LoginPage} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
