import {
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
} from '@carbon/react'
import {
  AddFilled,
  Document,
  ChatBot,
} from '@carbon/react/icons'
import { useLayout } from '../contexts/LayoutContext'

export default function SidebarComponent({ isSideNavExpanded, onClickSideNavExpand }) {
  const { isMobile } = useLayout()

  return (
    <SideNav
      expanded={!isMobile || isSideNavExpanded}
      onOverlayClick={onClickSideNavExpand}
      isPersistent={true}
      isFixedNav={!isMobile}
      isRail={true}
      style={{
        borderRight: '1px solid var(--cds-border-subtle)',
      }}
    >
      <SideNavItems>
        <SideNavLink renderIcon={AddFilled} href="#">
          New Chat
        </SideNavLink>
        <SideNavMenu title="Recent Chats" renderIcon={ChatBot}>
          <SideNavMenuItem href="#">
            Chat con AI Assistant
          </SideNavMenuItem>
          <SideNavMenuItem href="#">
            Discussione progetto React
          </SideNavMenuItem>
          <SideNavMenuItem href="#">
            Help con JavaScript
          </SideNavMenuItem>
        </SideNavMenu>
        <SideNavLink renderIcon={Document} href="#">
          Documentation
        </SideNavLink>
      </SideNavItems>
    </SideNav>
  )
}