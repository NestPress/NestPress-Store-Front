import create from 'zustand'

export const useMessage = create(set => ({
    active: false,
    title: 'Message title',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    type: 'info'
  }))

