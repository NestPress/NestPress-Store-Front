import create from 'zustand'

export const useMenu = create(set => ({
    layout: "Layout",
    isOpen: false,
}))
