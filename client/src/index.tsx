import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store'
import { Provider } from 'react-redux'

import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import App from './app/App'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <DndProvider backend={HTML5Backend}>
                <App />
            </DndProvider>
        </BrowserRouter>
    </Provider>
)
