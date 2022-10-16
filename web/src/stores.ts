import { writable } from 'svelte/store'
import { io } from 'socket.io-client'

export const socket = writable(io(import.meta.env.VITE_SERVER_URL))
export const currentUser = writable(null)
