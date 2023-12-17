import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'

type QueryValueType = string | number | boolean | (string | number | boolean)[] | null | undefined
type ParamInput = Record<string, QueryValueType> | URLSearchParams
type SingleInput = [string, QueryValueType]
type OptionsType = { mode?: 'default' | 'replace' | 'append' | 'delete' }

/**
 * A custom hook for working with URL query parameters.
 *
 * @returns {{
 *   mutateQueryParams: (input: ParamInput | SingleInput, options?: OptionsType) => void
 * }}
 */
export const useQueryParams = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  /**
   * Function that adds or deletes a query param.
   *
   * If value is null, undefined or empty string, the key will be deleted.
   * If append is set to true and key already exists, value will be appended to existing one only if it's unique.
   *
   * @param {URLSearchParams} params - The current search parameters.
   * @param {string} key - Key of the query param.
   * @param {QueryValueType} value - Value of the query param.
   * @param {boolean} [append=false] - Whether to append value to the existing one.
   */
  const addOrDeleteParam = useCallback(
    (params: URLSearchParams, key: string, value: QueryValueType, append: boolean = false) => {
      if (!value) {
        params.delete(key)
      } else {
        const newValues = Array.isArray(value) ? value : [String(value)]

        if (append && params.has(key)) {
          const existingValues = params.get(key)?.split(',').filter(Boolean) || []
          const values = [...new Set([...existingValues, ...newValues])]
          params.set(key, values.join(','))
        } else {
          params.set(key, newValues.join(','))
        }
      }
    },
    []
  )

  /**
   * Function that mutates query params based on mode.
   *
   * If input is an array, it will be treated as a single key-value pair.
   * If mode is 'replace', all existing params will be replaced with the new ones.
   * If mode is 'append' and key already exists, value will be appended to existing one.
   * If mode is 'delete', the specified keys will be deleted.
   *
   * @param {ParamInput | SingleInput} input - Query params to be set.
   * @param {OptionsType} [options={}] - Options for mutation.
   */
  const mutateQueryParams = useCallback(
    (input: ParamInput | SingleInput, options: OptionsType = {}) => {
      const { mode = 'default' } = options
      const params = mode === 'replace' ? new URLSearchParams() : new URLSearchParams(searchParams.toString())

      if (mode === 'delete') {
        if (Array.isArray(input)) {
          params.delete(input[0])
        } else {
          Object.keys(input).forEach((key) => params.delete(key))
        }
      } else {
        const append = mode === 'append'

        if (Array.isArray(input)) {
          const [key, value] = input
          addOrDeleteParam(params, key, value, append)
        } else if (input instanceof URLSearchParams) {
          input.forEach((value, key) => addOrDeleteParam(params, key, value, append))
        } else {
          Object.entries(input).forEach(([key, value]) => addOrDeleteParam(params, key, value, append))
        }
      }

      router.push(`${pathname}?${params.toString()}`)
    },
    [router, searchParams, pathname, addOrDeleteParam]
  )

  return { mutateQueryParams }
}
