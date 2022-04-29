import * as React from 'react'
import HoverMenu from 'material-ui-popup-state/HoverMenu'
import MenuItem from '@mui/material/MenuItem'
import ChevronRight from '@mui/icons-material/ChevronRight'
import Button from '@mui/material/Button'
import {
  bindFocus,
  bindHover,
  bindMenu,
  usePopupState,
} from 'material-ui-popup-state/hooks'
import { styled } from '@mui/material'

const SpanTitle = styled('span')(({ theme }) => ({
  flexGrow: 1,
}))

const ChevronRightMoreArrow = styled(ChevronRight)(({ theme }) => ({
  marginRight: theme.spacing(-1),
}))

const CascadingContext = React.createContext({
  parentPopupState: null,
  rootPopupState: null,
})

function CascadingMenuItem({ onClick, ...props }) {
  const { rootPopupState } = React.useContext(CascadingContext)
  if (!rootPopupState) throw new Error('must be used inside a CascadingMenu')
  const handleClick = React.useCallback(
    (event) => {
      rootPopupState.close(event)
      if (onClick) onClick(event)
    },
    [rootPopupState, onClick]
  )

  return <MenuItem {...props} onClick={handleClick} />
}

function CascadingSubmenu({ title, popupId, ...props }) {
  const { parentPopupState } = React.useContext(CascadingContext)
  const popupState = usePopupState({
    popupId,
    variant: 'popover',
    parentPopupState,
  })
  return (
    <React.Fragment>
      <MenuItem {...bindHover(popupState)} {...bindFocus(popupState)}>
        <SpanTitle>{title}</SpanTitle>
        <ChevronRightMoreArrow />
      </MenuItem>
      <CascadingMenu
        {...props}
        // classes={{ ...props.classes, paper: classes.submenu }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        popupState={popupState}
      />
    </React.Fragment>
  )
}

function CascadingMenu({ popupState, ...props }) {
  const { rootPopupState } = React.useContext(CascadingContext)
  const context = React.useMemo(
    () => ({
      rootPopupState: rootPopupState || popupState,
      parentPopupState: popupState,
    }),
    [rootPopupState, popupState]
  )

  return (
    <CascadingContext.Provider value={context}>
      <HoverMenu {...props} {...bindMenu(popupState)} />
    </CascadingContext.Provider>
  )
}

const CascadingHoverMenus = () => {
  const popupState = usePopupState({
    popupId: 'demoMenu',
    variant: 'popover',
  })
  return (
    <div style={{ height: 600 }}>
      <Button
        variant="contained"
        {...bindHover(popupState)}
        {...bindFocus(popupState)}
      >
        Hover to open Menu
      </Button>
      <CascadingMenu
        popupState={popupState}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <CascadingMenuItem>Tea</CascadingMenuItem>
        <CascadingMenuItem>Cake</CascadingMenuItem>
        <CascadingMenuItem>Death</CascadingMenuItem>
        <CascadingSubmenu
          popupId="moreChoicesCascadingMenu"
          title="More Choices"
        >
          <CascadingMenuItem>Cheesecake</CascadingMenuItem>
          <CascadingMenuItem>Cheesedeath</CascadingMenuItem>
          <CascadingSubmenu
            popupId="evenMoreChoicesCascadingMenu"
            title="Even More Choices"
          >
            <CascadingMenuItem>Cake (the band)</CascadingMenuItem>
            <CascadingMenuItem>Death Metal</CascadingMenuItem>
          </CascadingSubmenu>
          <CascadingSubmenu
            popupId="moreBenignChoices"
            title="More Benign Choices"
          >
            <CascadingMenuItem>Salad</CascadingMenuItem>
            <CascadingMenuItem>Lobotomy</CascadingMenuItem>
          </CascadingSubmenu>
        </CascadingSubmenu>
      </CascadingMenu>
    </div>
  )
}

export default CascadingHoverMenus
