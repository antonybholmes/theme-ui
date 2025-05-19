import { nanoid } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface IMessage {
  id: string
  time: number
  source: string
  target: string
  text: string
}

interface IGlobalState {
  messages: IMessage[]
  listeners: Array<(messages: IMessage[]) => void>
}

const globalState: IGlobalState = {
  messages: [],
  listeners: [],
}

export function messageDispatch(message: Omit<IMessage, 'id' | 'time'>) {
  const m: IMessage = { id: nanoid(), time: Date.now(), ...message }
  // we need to change the ref each time with a new array to get react
  // to notice the difference and trigger re-render
  globalState.messages = [...globalState.messages, m]

  globalState.listeners.forEach(listener => {
    listener(globalState.messages)
  })
}

export function addListener(listener: (messages: IMessage[]) => void) {
  globalState.listeners.push(listener)
  // Return a function to remove the listener
  return () => {
    globalState.listeners = globalState.listeners.filter(l => l !== listener)
  }
}

export function removeMessage(id: string) {
  globalState.messages = globalState.messages.filter(m => m.id !== id)

  globalState.listeners.forEach(listener => {
    listener(globalState.messages)
  })
}

export function useMessages(): {
  messageState: IMessage[]
  messageDispatch: (message: Omit<IMessage, 'id' | 'time'>) => void
  removeMessage: (id: string) => void
} {
  const [messages, setMessages] = useState<IMessage[]>([])

  useEffect(() => {
    // Add this component as a listener to the global state
    const removeListener = addListener((messages: IMessage[]) => {
      //console.log(id, messages)

      // By using the spread operator ([...]), you're ensuring that you're not mutating
      // the original array (newMessages). Instead, you're creating a new array. This
      // new array has a new reference, and React can detect that the state has changed.
      setMessages(messages)
    })

    // Clean up the listener when the component is unmounted
    return () => {
      removeListener()
    }
  }, [])

  return {
    messageState: messages,
    messageDispatch,
    removeMessage,
  }
}
