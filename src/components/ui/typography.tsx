import { createElement, type HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

/** Variant names should be kept in the format: element-fontSize-fontWeight-fontStyle */
const variants = {
  'h1-20-500': {
    defaultTag: 'h1',
    classes: 'text-xl text-main-500',
  },
  'h2-20-500': {
    defaultTag: 'h2',
    classes: 'text-xl text-main-500',
  },
  'h3-16-500': {
    defaultTag: 'h3',
    classes: 'text-base text-main-500',
  },
  'p-14-500': {
    defaultTag: 'p',
    classes: 'text-sm text-main-500',
  },
  'p-14-400': {
    defaultTag: 'p',
    classes: 'font-normal text-sm text-main-500',
  },
  'p-12-500': {
    defaultTag: 'p',
    classes: 'text-xs text-main-600',
  },
  'p-12-400': {
    defaultTag: 'p',
    classes: 'font-normal text-xs text-main-600',
  },
  'p-12-400-italic': {
    defaultTag: 'p',
    classes: 'font-normal italic text-xs text-main-600',
  },
  'p-11-500': {
    defaultTag: 'p',
    classes: 'text-[11px] text-main-400',
  },
  'p-10-500': {
    defaultTag: 'p',
    classes: 'text-[10px] text-main-600',
  },
  'p-10-400': {
    defaultTag: 'p',
    classes: 'font-normal text-[10px] text-main-400',
  },
}

export type TypographyVariant = keyof typeof variants

type TypographyProps = {
  variant?: TypographyVariant
  tag?: string
  className?: string
} & HTMLAttributes<HTMLElement>

export const Typography = ({ variant: Component = 'p-12-400', tag, className, ...props }: TypographyProps) => {
  const defaultClass = variants[Component].classes
  const defaultTag = variants[Component].defaultTag
  const mergedClass = twMerge(defaultClass, className)

  return createElement(tag ? tag : defaultTag, { className: mergedClass, ...props })
}
