import { writable } from "svelte/store";
import { io } from "socket.io-client";
import { PUBLIC_SERVER_URL } from "$env/static/public";
import type { User } from "./types/User";

export const socket = writable(io(PUBLIC_SERVER_URL as string));
export const currentUser = writable<User | null>(null);
