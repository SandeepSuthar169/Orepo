import { create } from "zustand";
import { apiResponse } from "../services/Api"
import { type Repository } from "../types/Types";
import axios from "axios";

interface SearchResponse {
    items: Repository[]
}

//  TypeScript =================================

interface TypeScriptStore {
    typescript: Repository[]
    loading: boolean
    error: string | null

    fetchTypeScript: () => Promise<void>
}

export const useTypeScriptStore = create<TypeScriptStore>((set) => ({
    typescript: [],
    loading: false,
    error: null,

    fetchTypeScript: async () => {
        try {
            set({ loading: true, error: null })

            const response = await apiResponse.get<SearchResponse>('/repositories?q=topic:typescript&sort=stars&order=desc&per_page=100&page=1')

            set({
                typescript: response.data.items,
                loading: false
            })
        } catch (error) {
            set({
                loading: false
            })
            if (axios.isAxiosError(error)) {
                console.log(error.message)
            }
        }
    }
}))


//  Awesome ==========================

interface AwesomeStore {
    awesome: Repository[]
    loading: boolean
    error: string | null

    fetchAwesome: () => Promise<void>
}

export const useAwesomeStore = create<AwesomeStore>((set) => ({
    awesome: [],
    loading: false,
    error: null,

    fetchAwesome: async () => {
        try {
            set({ loading: true, error: null })

            const response = await apiResponse.get<SearchResponse>('/repositories?q=topic:awesome&sort=stars&order=desc&per_page=100&page=1')

            set({
                awesome: response.data.items,
                loading: false
            })
        } catch (error) {
            set({
                loading: false
            })
            if (axios.isAxiosError(error)) {
                console.log(error.message)
            }
        }
    }
}))


//  Chrome ==========================

interface ChromeStore {
    chrome: Repository[]
    loading: boolean
    error: string | null

    fetchChrome: () => Promise<void>
}

export const useChromeStore = create<ChromeStore>((set) => ({
    chrome: [],
    loading: false,
    error: null,

    fetchChrome: async () => {
        try {
            set({ loading: true, error: null })

            const response = await apiResponse.get<SearchResponse>('/repositories?q=topic:chrome&sort=stars&order=desc&per_page=100&page=1')

            set({
                chrome: response.data.items,
                loading: false
            })
        } catch (error) {
            set({
                loading: false
            })
            if (axios.isAxiosError(error)) {
                console.log(error.message)
            }
        }
    }
}))



//  code-quality ==========================

interface CodeQualityStore {
    codequality: Repository[]
    loading: boolean
    error: string | null

    fetchChrome: () => Promise<void>
}

export const useCodeQualityStore = create<CodeQualityStore>((set) => ({
    codequality: [],
    loading: false,
    error: null,

    fetchChrome: async () => {
        try {
            set({ loading: true, error: null })

            const response = await apiResponse.get<SearchResponse>('/repositories?q=topic:code-quality&sort=stars&order=desc&per_page=100&page=1')

            set({
                codequality: response.data.items,
                loading: false
            })
        } catch (error) {
            set({
                loading: false
            })
            if (axios.isAxiosError(error)) {
                console.log(error.message)
            }
        }
    }
}))



//  Compiler ==========================

interface CompilerStore {
    compiler: Repository[]
    loading: boolean
    error: string | null

    fetchChrome: () => Promise<void>
}

export const useCompilerStore = create<CompilerStore>((set) => ({
    compiler: [],
    loading: false,
    error: null,

    fetchChrome: async () => {
        try {
            set({ loading: true, error: null })

            const response = await apiResponse.get<SearchResponse>('/repositories?q=topic:compiler&sort=stars&order=desc&per_page=100&page=1')

            set({
                compiler: response.data.items,
                loading: false
            })
        } catch (error) {
            set({
                loading: false
            })
            if (axios.isAxiosError(error)) {
                console.log(error.message)
            }
        }
    }
}))

// CSS
// Database
// Front end
// JavaScript
// Node.js
// npm
// Project management
// Python
// React
// React Native
// Scala