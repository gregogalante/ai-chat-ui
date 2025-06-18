import {
  Header,
  HeaderName,
  HeaderMenuButton,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from '@carbon/react'
import {
  UserAvatar,
  Sun,
  Moon
} from '@carbon/react/icons'
import { useLayout } from '../contexts/LayoutContext'

export default function HeaderComponent({ isSideNavExpanded, onClickSideNavExpand }) {
  const { isMobile, theme, setTheme } = useLayout()

  return (
    <Header>
      {isMobile && <HeaderMenuButton
        onClick={onClickSideNavExpand}
        isActive={isSideNavExpanded}
        isCollapsible
      />}

      <HeaderName href="#" prefix="Brand name">
        AI Assistant
      </HeaderName>

      {/* <HeaderNavigation>
        <HeaderMenuItem href="#">Chat</HeaderMenuItem>
        <HeaderMenuItem href="#">History</HeaderMenuItem>
        <HeaderMenuItem href="#">Settings</HeaderMenuItem>
      </HeaderNavigation> */}

      <HeaderGlobalBar>
        <HeaderGlobalAction tooltipAlignment="end" aria-label='User'>
          <UserAvatar size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction tooltipAlignment="end" onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
          {theme == 'dark' ? <Moon size={20} /> : <Sun size={20} />}
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  )
}