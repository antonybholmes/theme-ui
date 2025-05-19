import { useEffect, useState } from 'react'

interface IGlobalState {
  zoom: number
  listeners: Array<(zoom: number) => void>
}

const globalState: IGlobalState = {
  zoom: 1,
  listeners: [],
}

export function zoomDispatch(zoom: number) {
  globalState.zoom = zoom
  for (const listener of globalState.listeners) {
    listener(zoom)
  }
}

export function addListener(listener: (zoom: number) => void) {
  globalState.listeners.push(listener)
  // Return a function to remove the listener
  return () => {
    globalState.listeners = globalState.listeners.filter(l => l !== listener)
  }
}

export function useZoom(): {
  zoom: number
  setZoom: (zoom: number) => void
} {
  const [zoom, setZoom] = useState(globalState.zoom)

  useEffect(() => {
    // Add this component as a listener to the global state
    const removeListener = addListener((zoom: number) => {
      //console.log(id, messages)

      // By using the spread operator ([...]), you're ensuring that you're not mutating
      // the original array (newMessages). Instead, you're creating a new array. This
      // new array has a new reference, and React can detect that the state has changed.
      setZoom(zoom)
    })

    // Clean up the listener when the component is unmounted
    return () => {
      removeListener()
    }
  }, [])

  return {
    zoom,
    setZoom: zoomDispatch,
  }
}
