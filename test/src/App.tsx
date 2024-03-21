import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { add } from './utils/common.utils'
import { QueryClientProvider, useQuery } from 'react-query'
import { queryClient } from './query-client-provider'
import { getUsers } from './utils/axios.instance'
import { User } from './types/common.type'
import { Test } from './Test'



function App() {


  return <>
    <QueryClientProvider client={queryClient}>
      <Test></Test>
    </QueryClientProvider>
  </>
}

export default App
