import {
  HeaderContainer,
  Theme,
} from '@carbon/react'
import HeaderComponent from './components/HeaderComponent'
import SidebarComponent from './components/SidebarComponent'
import ChatComponent from './components/ChatComponent'
import { useLayout } from './contexts/LayoutContext'

export default function App() {
  const { headerHeight, theme } = useLayout()

  return (
    <Theme theme={theme == 'dark' ? "g100" : "g10"} style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}>
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <>
            <HeaderComponent isSideNavExpanded={isSideNavExpanded} onClickSideNavExpand={onClickSideNavExpand} />
            <SidebarComponent isSideNavExpanded={isSideNavExpanded} onClickSideNavExpand={onClickSideNavExpand} />
          </>
        )}
      />

      <ChatComponent />
    </Theme>
  )
}


