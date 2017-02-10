import React from 'react'
import { createDevTools } from 'redux-devtools'
import DockMonitor from 'redux-devtools-dock-monitor'
import LogMonitor from 'redux-devtools-log-monitor'

export default createDevTools(
  <DockMonitor
    defaultIsVisible={false}
    defaultSize={0.30}
    toggleVisibilityKey="ctrl-q"
    changePositionKey="ctrl-s"
  >
    <LogMonitor
      theme="tomorrow"
      preserveScrollTop={false}
      expandActionRoot={false}
      expandStateRoot={false}
    />
  </DockMonitor>
)
