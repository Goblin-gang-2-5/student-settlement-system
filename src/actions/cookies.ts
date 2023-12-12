"use server";
import {cookies} from "next/headers"
import {ResponseCookie} from "next/dist/compiled/@edge-runtime/cookies";

export async function createCookie(data:ResponseCookie) {
    cookies().set(data)
}

export async function deleteCookie(name:string) {
    cookies().delete(name)
}