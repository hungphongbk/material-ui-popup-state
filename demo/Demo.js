import * as React from 'react'
import Code from '@mui/icons-material/Code'
import Collapse from '@mui/material/Collapse'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'

const { useState, useCallback } = React

const Demo = ({ headerId, title, code, example, hooksCode, hooksExample }) => {
  const [showSource, setShowSource] = useState(false)
  const [api, setApi] = useState('hooks')
  const setRenderProps = useCallback(() => setApi('render-props'), [])
  const setHooks = useCallback(() => setApi('hooks'), [])
  return (
    <div>
      <Typography variant="h4" id={headerId}>
        {title}
        {headerId && <a href={`#${headerId}`}>#</a>}
      </Typography>
      <div>
        {code != null && hooksCode != null && (
          <React.Fragment>
            <Button
              variant={api === 'render-props' ? 'outlined' : 'text'}
              onClick={setRenderProps}
            >
              Render Props
            </Button>
            <Button
              variant={api === 'hooks' ? 'outlined' : 'text'}
              onClick={setHooks}
            >
              Hooks
            </Button>
          </React.Fragment>
        )}
        <div />
        <Tooltip title="Show Source" placement="top">
          <IconButton onClick={() => setShowSource(!showSource)} size="large">
            <Code />
          </IconButton>
        </Tooltip>
      </div>
      <Collapse in={showSource}>
        <pre>{api === 'hooks' ? hooksCode || code : code || hooksCode}</pre>
      </Collapse>
      <div>
        {api === 'hooks' ? hooksExample || example : example || hooksExample}
      </div>
    </div>
  )
}

export default Demo
