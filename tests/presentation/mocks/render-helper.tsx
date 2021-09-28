import { Router } from 'react-router-dom'
import { MemoryHistory } from 'history'
import { render } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import React from 'react'

type Params = {
  Page: React.FC
  history: MemoryHistory
}

export const renderWithHistory = ({ Page, history }: Params) => {
  render(
    <RecoilRoot>
      <Router history={history}>
        <Page />
      </Router>
    </RecoilRoot>
  )
}