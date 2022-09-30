export const isLongerThan = (length: number) => (value: string) => value.length >= length

export const isNotEmpty = (array: string[]) => array.length > 0

export const isEmail = (value: string) => value.match(
    // eslint-disable-next-line
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
)

export const isEqual = (toCompare: string) => (value: string) => value === toCompare